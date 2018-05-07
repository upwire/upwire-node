'use strict';

const https = require('https');

function Admin(credentials) {

    this._post = function (opts) {

        return new Promise(function (resolve, reject) {

		opts['username'] = credentials['username'];
		opts['password'] = credentials['passcode'];

		var postData = JSON.stringify(opts);

		console.log(postData);

		var params = {
			host: 'a.upwire.com',
			port: 443,
                	method: 'POST',
			path: '/zsms/admin.json',
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

Admin.prototype.listCountries = function (opts = {}) {
	this.opts = opts;

    	this.opts['action'] = 'listCountries';
    	return this._post(this.opts);
};

Admin.prototype.getCountry = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('country')) {
                return Promise.reject("country missing from options");
        }
        if (typeof this.opts['country'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
        }

        this.opts['action'] = 'getCountry';

        return this._post(this.opts);
};

Admin.prototype.searchNumbers = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('country')) {
                return Promise.reject("country missing from options");
        }

        if (typeof this.opts['country'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
        }

	if (!this.opts.hasOwnProperty('numberType')) {
                return Promise.reject("numberType missing from options");
        }

        if (typeof this.opts['numberType'] !== 'string') {
                return Promise.reject("numberType must be an string");
        }

	if (!this.opts.hasOwnProperty('countryCode')) {
                return Promise.reject("countryCode missing from options");
        }

        if (typeof this.opts['countryCode'] !== 'string') {
                return Promise.reject("countryCode must be an string");
        }

	if (!this.opts.hasOwnProperty('searchString')) {
                return Promise.reject("searchString missing from options");
        }

        if (typeof this.opts['searchString'] !== 'string') {
                return Promise.reject("searchString must be an string");
        }


        this.opts['action'] = 'search';

        return this._post(this.opts);
};


module.exports = Admin;
