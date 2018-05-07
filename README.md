# upwire-node

A Node.js package to consume Upwire Restful services

## Usage

Install the package using npm:

    npm install upwire --save

Then, require the package with your Upwire usenrame and passcode:
	
	const Upwire = require('upwire')({username: '[username]', passcode: '[passcode]'});

Services from the Upwire API https://upwire.docs.apiary.io/  can be executed by calling a method with options. 

For example to create a masterJob:

	options = {
        	"templateId": "[templateid]",
        	"data": "[base64 encoded CSV]"
	}

	Upwire.Master.create(options)
        	.then(function(value) {
                	console.log(value);
        	})
        	.catch(function(err) {
                	console.log(err);
        	})

