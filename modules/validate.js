//Valdiation stuff
const Joi = require('joi');

const validate = {
	login: function (credentials) {
		const schema = {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		};
		return Joi.validate(credentials, schema);
	},
};
module.exports = validate;
