var express = require('express');
const _ = require('lodash');
const kubernetesClient = require('./kubernetes-client');
const fs = require("fs");
const clusterInfo = require("../config/ibmcloud-config.json");

module.exports = function (app) {

    var router = express.Router();

    router.get('/', function (req, res, next) {

        // Check if we are running locally
        if (process.env.NODE_ENV === "development") {
            res.json(clusterInfo);
        } else {
            try {
                const client = kubernetesClient();
                client.api.v1.namespace(process.env.NAMESPACE || 'tools').configmaps('ibmcloud-config').get()
                    .then(result => {
                        console.log('Got result: ', result.body.data);
                        return result.body.data;
                    }, error => {
                        console.error('Error reading config maps: ', error);
                        return {};
                    })
                    .then(data => {
                        return Object.assign(data, {DASHBOARD_HEADING: process.env.DASHBOARD_HEADING || data.DASHBOARD_HEADING || 'Developer Dashboard' })
                    })
                    .then(data => {
                        res.json(data);
                    });
            } catch (err) {
                console.error('Error getting kubernetes client: ', err);
                res.json({DASHBOARD_HEADING: process.env.DASHBOARD_HEADING || 'Developer Dashboard' });
            }
        }

    });

    // Define API to retrieve Cluster information
    app.use("/cluster", router);
}
