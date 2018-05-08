# upwire-node

A Node.js package to consume Upwire Restful services

## Usage

Install the package using npm:

    npm install upwire --save

Then, require the package with your Upwire usenrame and passcode:
	
	const Upwire = require('upwire')({username: '[username]', passcode: '[passcode]'});

Services from the Upwire API https://upwire.docs.apiary.io/  can be executed by calling a method with options. 

For example to sned an SMS:

	options = {
        	"callerid": "[callerid]",
        	"destinations": "[destination]",
        	"message": "Test message from Upwire"
	}

	Upwire.Master.create(options)
        	.then(function(value) {
                	console.log(value);
        	})
        	.catch(function(err) {
                	console.log(err);
        	})

Note: 'callerid' must be an SMS enabled number purchased from Upwire and 'destination' must be in international number format.

