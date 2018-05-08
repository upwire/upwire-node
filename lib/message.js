'use strict';

const https = require('https');

function Message(credentials) {

    this._post = function (opts) {

        return new Promise(function (resolve, reject) {

		opts['username'] = credentials['username'];
		opts['password'] = credentials['passcode'];

		var postData = JSON.stringify(opts);

		var params = {
			host: 'a.upwire.com',
			port: 443,
                	method: 'POST',
			path: '/zsms/new.json',
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

Message.prototype.send = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('callerid')) {
                return Promise.reject("caller missing from options");
        }

        if (typeof this.opts['callerid'] !== 'string') {
                return Promise.reject("callerid must be an string");
        }

	if (!this.opts.hasOwnProperty('destinations')) {
                return Promise.reject("destinations missing from options");
        }

        if (typeof this.opts['destinations'] !== 'string') {
                return Promise.reject("destinations must be an string");
        }

	if (!this.opts.hasOwnProperty('message')) {
                return Promise.reject("message missing from options");
        }

        if (typeof this.opts['message'] !== 'string') {
                return Promise.reject("message must be an string");
        }

	// set some required values if not passed
	if (!this.opts.hasOwnProperty('allowDuplicates')) {
		this.opts['allowDuplicates'] = 'True'
	}

	if (!this.opts.hasOwnProperty('billCode')) {
                this.opts['billCode'] = ''
        }

	if (!this.opts.hasOwnProperty('customReference')) {
                this.opts['customReference'] = ''
        }

	if (!this.opts.hasOwnProperty('jobReference')) {
       	        this.opts['jobReference'] = ''
       	}

	if (!this.opts.hasOwnProperty('columnPhone')) {
                this.opts['columnPhone'] = ''
        }

	if (!this.opts.hasOwnProperty('data')) {
                this.opts['data'] = ''
        }

	if (!this.opts.hasOwnProperty('features')) {
                this.opts['features'] = ''
        }

        return this._post(this.opts);
};

module.exports = Message;
