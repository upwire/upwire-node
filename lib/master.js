'use strict';

const https = require('https');

function Master(credentials) {

    this._post = function (opts) {

        return new Promise(function (resolve, reject) {

		opts['username'] = credentials['username'];
		opts['passtoken'] = credentials['passcode'];

		var postData = JSON.stringify(opts);

		var params = {
			host: 'a.upwire.com',
			port: 443,
                	method: 'POST',
			path: '/masterapi/job',
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

Master.prototype.create = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('templateId')) {
                return Promise.reject("templateId missing from options");
        }
        if (typeof this.opts['templateId'] !== 'string') {
                return Promise.reject("templateId must be an string");
        }

	if (!this.opts.hasOwnProperty('data')) {
              	return Promise.reject("data missing from options");
    	}

	if(this.opts.hasOwnProperty('csvData')) {
		if (this.opts['csvData'] = 'False') {
			// check data for valid json
		}
	} else {
        	if (typeof this.opts['data'] !== 'string') {
                	return Promise.reject("data must be an string");
        	}
	}

        this.opts['action'] = 'create';

        return this._post(this.opts);
};

Master.prototype.startOutbound = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('templateId')) {
                return Promise.reject("templateId missing from options");
        }
        if (typeof this.opts['templateId'] !== 'string') {
                return Promise.reject("templateId must be an string");
        }

        this.opts['action'] = 'startOutbound';

        return this._post(this.opts);
};

Master.prototype.append = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('templateId')) {
                return Promise.reject("templateId missing from options");
        }
        if (typeof this.opts['templateId'] !== 'string') {
                return Promise.reject("templateId must be an string");
        }

	if (!this.opts.hasOwnProperty('data')) {
                return Promise.reject("data missing from options");
        }

        if(this.opts.hasOwnProperty('csvData')) {
                if (this.opts['csvData'] = 'False') {
                        // check data for valid json
                }
        } else {
                if (typeof this.opts['data'] !== 'string') {
                        return Promise.reject("data must be an string");
                }
        }

        this.opts['action'] = 'append';

        return this._post(this.opts);
};



module.exports = Master;
