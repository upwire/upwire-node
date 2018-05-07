'use strict';

const https = require('https');

function Reporting(credentials) {

    this._post = function (opts, path) {

        return new Promise(function (resolve, reject) {

		opts['username'] = credentials['username'];
		opts['password'] = credentials['passcode'];

		var postData = JSON.stringify(opts);

		var params = {
			host: 'a.upwire.com',
			port: 443,
                	method: 'POST',
			path: path,
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

Reporting.prototype.getMasterJob = function (opts) {
	this.opts = opts;

	if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

	if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
	if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
        }

    	this.opts['action'] = 'getMasterJob';
    	return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.listMasterJobs = function (opts) {

	this.opts = opts;

	if (typeof this.opts !== 'object' ) {
		return Promise.reject("options not parsed");
	}
 
	if (!this.opts.hasOwnProperty('limit')) {
		return Promise.reject("limit missing from options");
	}

	if (typeof this.opts['limit'] !== 'number') {
		return Promise.reject("limit must be an number");
	}

	this.opts['action'] = 'listmasterjobs';

	return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getMasterData = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
	}

        this.opts['action'] = 'getjobdata';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getMasterStats = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
	}

        this.opts['action'] = 'getmasterstats';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getSmsJobStats = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
	}

        this.opts['action'] = 'getsmsjobstats';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getVoiceJobStats = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
	}

	this.opts['action'] = 'getvoicejobstats';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getVoiceJobResponses = function (opts) {
	this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
	}

        this.opts['action'] = 'getvoiceresponses';
	this.opts['resultType'] = 'counts';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.getEmailJobStats = function (opts) {
	this.opts = opts;
        
        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobnumber')) {
                return Promise.reject("jobnumber missing from options");
        }
        if (typeof this.opts['jobnumber'] !== 'string') {
                return Promise.reject("jobnumber must be an string");
        }

        this.opts['action'] = 'getemailjobstats';

        return this._post(this.opts, '/webuiapi/masterDataHandler.json');
};

Reporting.prototype.smsReportByReference = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('reference')) {
                return Promise.reject("reference missing from options");
        }
        if (typeof this.opts['reference'] !== 'string') {
                return Promise.reject("reference must be an string");
        }
	
	if (!this.opts.hasOwnProperty('limit')) {
                return Promise.reject("limit missing from options");
        }
        if (typeof this.opts['limit'] !== 'string') {
                return Promise.reject("limit must be an string");
        }

        this.opts['action'] = 'getbyreference';

        return this._post(this.opts, '/zsms/reports.json');
};

Reporting.prototype.smsReportByJobNumber = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobNumber')) {
                return Promise.reject("jobNumber missing from options");
        }
        if (typeof this.opts['jobNumber'] !== 'string') {
                return Promise.reject("jobNumber must be an string");
        }

        if (!this.opts.hasOwnProperty('limit')) {
                return Promise.reject("limit missing from options");
        }
        if (typeof this.opts['limit'] !== 'string') {
                return Promise.reject("limit must be an string");
        }

        this.opts['action'] = 'getbyjobnumber';

        return this._post(this.opts, '/zsms/reports.json');
};

Reporting.prototype.smsReportJobStats = function (opts) {
        this.opts = opts;

        if (typeof this.opts !== 'object' ) {
                return Promise.reject("options not parsed");
        }

        if (!this.opts.hasOwnProperty('jobNumber')) {
                return Promise.reject("jobNumber missing from options");
        }
        if (typeof this.opts['jobNumber'] !== 'string') {
                return Promise.reject("jobNumber must be an string");
        }

        if (!this.opts.hasOwnProperty('limit')) {
                return Promise.reject("limit missing from options");
        }
        if (typeof this.opts['limit'] !== 'string') {
                return Promise.reject("limit must be an string");
        }

        this.opts['action'] = 'getsmsjobstats';

        return this._post(this.opts, '/zsms/reports.json');
};



module.exports = Reporting;
