var express = require('express');
const settings = require("../config/settings.json");

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        var _settings = settings;
        _settings.DASHBOARD_PREFIX = process.env.DASHBOARD_PREFIX || settings.DASHBOARD_PREFIX;
        _settings.DASHBOARD_TITLE = process.env.DASHBOARD_TITLE || settings.DASHBOARD_TITLE;
        _settings.CLOUD_TITLE = process.env.CLOUD_TITLE || settings.CLOUD_TITLE;
        _settings.CLOUD_URL = process.env.CLOUD_URL || settings.CLOUD_URL;
        _settings.DASHBOARD_IMAGE = process.env.DASHBOARD_IMAGE || settings.DASHBOARD_IMAGE;
        _settings.TOOLKIT_LOGO = process.env.TOOLKIT_LOGO || settings.TOOLKIT_LOGO;
        res.json(_settings);
    });

    app.use("/settings", router);
};


