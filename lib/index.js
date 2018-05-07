'use strict';

const Message = require('./message');
const Master = require('./master');
const Reporting = require('./reporting');
const Admin = require('./admin.js');
const Control = require('./control.js');

function Upwire(credentials) {
	if (typeof credentials !== 'object' || !credentials.hasOwnProperty('username') || !credentials.hasOwnProperty('passcode')) {
    		throw "username or passcode cannot be empty";
  	}

	this.credentials = credentials;

    	this.Message = new Message(this.credentials);
	this.Master = new Master(this.credentials);
	this.Reporting = new Reporting(this.credentials);
	this.Admin = new Admin(this.credentials);
	this.Control = new Control(this.credentials);
}

module.exports = function (credentials) {
    return new Upwire(credentials);
};
