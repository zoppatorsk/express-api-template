const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	//route code goes here
	res.status(200).send('Hello World!');
}); //End router.get

module.exports = router;
