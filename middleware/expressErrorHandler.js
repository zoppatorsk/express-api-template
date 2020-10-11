/*jshint esversion: 8 */
const logger = require('../modules/logger');
module.exports = function (err, req, res, next) {
	//thrown by bodyparser if payload is too large
	if (err.name === 'PayloadTooLargeError') return res.status(413).send('Payload too large');

	//thrown by bodyparser if json is invalid
	if (err instanceof SyntaxError) return res.status(400).send('Not valid Json');

	//If we get an error from express that is not expected then will log to "error.log" file with help of logger module and also print on console.
	console.error(err.stack);
	logger(err.stack);
	res.status(500).send('Something broke!');
	//change text later maybe.. this is for ez to see if this error handler sent it or something else
};
