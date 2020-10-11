//Middleware that checks if the provided authToken is valid, if it is will grant acess, else deny
//JWT needs to be installed if going to use this

const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
	const authToken = req.header('x-auth-token'); //x-auth-token need to be in the header of the request and set to a valid JWT for it to give acess
	if (!authToken) return res.status(401).send('Access denied. No authToken provided.');

	// try to verify.. if token is not valid will throw an error that will be cathed
	// if valid save the decoded token in the req.decoded and pass controll
	try {
		const decoded = jwt.verify(authToken, config.get('auth.jwtKey'));
		req.decoded = decoded;
		next();
	} catch (err) {
		return res.status(401).send('Access denied!');
	}
}
module.exports = auth;
