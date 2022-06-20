const axios = require('axios');
const Status = require('http-status');
const response = require('./response');

const post = async ({ url, data, headers, debug = false }) => {
    // Send a POST request

    try {

        if (debug) {
            console.log(url);
            console.log(headers);
            console.log(JSON.stringify(data));
        }

        return await axios({
            method: 'post',
            url: url,
            data: data,
            headers: headers
        });
    } catch (error) {
        return false;
    }
}

const get = async ({ url, headers, debug = false }) => {
    // Send a Get request

    if (debug) {
        console.log(url);
        console.log(headers);
    }

    try {

        return await axios({
            method: 'get',
            url: url,
            headers: headers
        });

    } catch (error) {
        return error.response;
    }
}

module.exports = {
    post: post,
    get: get
}