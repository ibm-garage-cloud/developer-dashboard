var express = require('express');
const _ = require('lodash');
const kubernetesClient = require('./kubernetes-client');
const tools = require("../config/tools.json");

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {

            function respondUrls(res,env) {
                var urls = {
                    jenkins: env.JENKINS_URL,
                    pipeline: env.PIPELINE_URL,
                    argocd: env.ARGOCD_URL,
                    artifactory: env.ARTIFACTORY_URL,
                    sonarqube: env.SONARQUBE_URL,
                    pact: env.PACTBROKER_URL,
                    tekton: env.TEKTON_URL,
                    ta: env.TA_URL,
                    apieditor: env.APIEDITOR_URL,
                    codeready:env.CODEREADY_URL,
                    integration:env.INTEGRATION_URL,
                    mcm: env.MCM_URL,
                    data: env.DATA_URL,
                    automation: env.AUTOMATION_URL,
                    grafana: env.GRAFANA_URL,
                    prometheus: env.PROMETHEUS_URL,
                    logdna: env.LOGDNA_URL,
                    sysdig: env.SYSDIG_URL,
                    ir: env.IR_URL,
                    jaeger: env.JAEGER_URL,
                };

                if (env.SOURCECONTROL_TYPE == 'github') {
                    urls.github = env.SOURCECONTROL_URL;
                } else if (env.SOURCECONTROL_TYPE == 'gitlab') {
                    urls.gitlab = env.SOURCECONTROL_URL;
                }

                return res.json(urls);
            }

            if (process.env.NODE_ENV === "development") {
                respondUrls(res,process.env);
            } else {
                try {

                    const client = kubernetesClient();
                    const qs = {labelSelector: 'group=catalyst-tools'};
                    client.api.v1.namespace(process.env.NAMESPACE || 'tools').configmaps.get({qs})
                        .then(result => {
                            return _.assign({}, process.env, ...(_.get(result, 'body.items', []).map(configmap => configmap.data)));
                        }, error => {
                            console.error('Error reading config maps: ', error);
                            return process.env;
                        })
                        .then(env => {
                            respondUrls(res,env);
                        });
                } catch (err) {
                    console.error('Error configuring kubeClient: ', err);
                    res.json({});
                }
            }
        }
    );

    app.use("/urls", router);
};
