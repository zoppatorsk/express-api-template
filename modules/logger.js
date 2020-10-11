//super simple logging module

const fs = require('fs');

//log uncaught exception errrors and unhandled promise rejections
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled promise rejection ', p);
		logError(reason);
	})
	.on('uncaughtException', (err) => {
		console.error('Uncaught Exception', err);
		logError(err);
		process.exit(1); //Something is probably really broken so kill the whole app
	});

function logError(content) {
	const logContent = '\r\n\r\n' + new Date() + '\r\n' + content; //add date n time
	try {
		//need to use sync method cuz can't use async when exiting on unhandled exceptions
		fs.appendFileSync('error.log', logContent);
	} catch (err) {
		console.error('Could not write to logfile! ', err);
	}
}
module.exports = logError;
