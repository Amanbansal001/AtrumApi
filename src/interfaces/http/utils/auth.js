
const jwt = require("jsonwebtoken");
const response = require('./response');
const sqlExplorer = require('./sqlExplorer');
const Status = require('http-status');
const constants = require("./constants");
const sanitizer = require('sanitizer');

module.exports = async function (req, res, next) {

    //  check if cors
    if (req.method == "OPTIONS") {
        response(res, Status.OK, null, "CORS Passed", "");
        return;
    }

    const htmlData = (req.body && req.body._content) ? req.body._content : '';

    if (!Array.isArray(req.body)) {
        for (let [key, value] of Object.entries(req.body)) {
            if (req.body.hasOwnProperty(key)) {

                if (!htmlData) {
                    req.body[key] = sanitizer.escape(value);
                }
            }
        }
    }

    for (let [key, value] of Object.entries(req.query)) {
        if (req.query.hasOwnProperty(key)) {
            if (!htmlData) {
                req.query[key] = sanitizer.escape(value);
            }
        }
    }

    req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    req.query.page = (!req.query.page) || isNaN(req.query.page) ? constants.ACTIVE : Number(req.query.page);
    req.query.pageSize = (!req.query.pageSize || req.query.pageSize > 100) ? 10 : req.query.pageSize;
    req.sqlExplorer = sqlExplorer(req);

    if (req.url.indexOf("/upload") == -1) {
        if (req.headers['x-api-key'] != process.env.API_KEY || req.headers['x-app-name'] != process.env.APP_NAME) {
            response(res, Status.UNAUTHORIZED, null, "", 'Session Expired to use resource');
            return;
        }

        if (req.headers['x-app-type'] == "android") {
            const android_app = process.env.APP_VERSION_CODE_ANDROID.split(",");
            if (!req.headers['x-app-version'] || !android_app.find(e => e == req.headers['x-app-version'])) {
                response(res, Status.UNAUTHORIZED, null, "", 'Invalid Request');
                return;
            }
        } else if (req.headers['x-app-type'] == "ios") {
            const ios_app = process.env.APP_VERSION_CODE_IOS.split(",");
            if (!req.headers['x-app-version'] || !ios_app.find(e => e == req.headers['x-app-version'])) {
                response(res, Status.UNAUTHORIZED, null, "", 'Invalid Request');
                return;
            }
        } else if (req.headers['x-app-type'] == "web") {
            const web_app = process.env.APP_VERSION_CODE_WEB.split(",");
            if (!req.headers['x-app-version'] || !web_app.find(e => e == req.headers['x-app-version'])) {
                response(res, Status.UNAUTHORIZED, null, "", 'Invalid Request');
                return;
            }
        } else {
            response(res, Status.UNAUTHORIZED, null, "", 'Invalid Request');
            return;
        }
    }

    if (req.headers['authorization']) {
        req.jwt = req.headers['authorization'].replace(/^Bearer\s/, '');
        req.auth = jwt.decode(req.jwt);

        const now = Date.now().valueOf() / 1000;
        if (!req.auth) {
            response(res, Status.UNAUTHORIZED, null, "", 'User not found');
            return;
        }


        if (req.url != "/auth/logout") {
            if (typeof req.auth.exp !== 'undefined' && req.auth.exp < now) {
                response(res, Status.UNAUTHORIZED, null, "", 'Session Expired');
                return;
            }
            if (typeof req.auth.nbf !== 'undefined' && req.auth.nbf > now) {
                response(res, Status.UNAUTHORIZED, null, "", 'Session Expired');
                return;
            }
        }
    }

    return req;
};