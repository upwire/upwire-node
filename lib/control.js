'use strict';

const https = require('https');

function Control(credentials) {

    this._post = function (opts) {

        return new Promise(function (resolve, reject) {

		opts['username'] = credentials['username'];
		opts['password'] = credentials['passcode'];

		var postData = JSON.stringify(opts);

		var params = {
			host: 'a.upwire.com',
			port: 443,
                	method: 'POST',
			path: '/webuiapi/masterJobHandler.json',
                	headers: { "Content-Type": "application/json", "Content-Length": postData.length },
		}
		const req = https.request(params, (res) => {

			if (res.statusCode < 200 || res.statusCode > 299) {
        		 	reject('Request failed, status code: ' + res.statusCode);
       			}

			const body = [];

			res.on('data', (chunk) => body.push(chunk));
			res.on('end', () => resolve(body.join('')));
		});

		req.on('error', (err) => reject(err))

		req.write(postData);
		req.end();
        });
    };
}

Control.prototype.pauseMaster = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

	if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }

        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an number");
        }

        this.opts['action'] = 'pauseMaster';

        return this._post(this.opts);
};

Control.prototype.cancelMaster = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }

        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an number");
        }

        this.opts['action'] = 'cancelMaster';

        return this._post(this.opts);
};

Control.prototype.restartMaster = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }

        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an number");
        }

        this.opts['action'] = 'restartMaster';

        return this._post(this.opts);
};


module.exports = Control;
