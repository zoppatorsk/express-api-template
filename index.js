require('express-async-errors'); //Patches async routes so don't have to put try/catch block on each.
const config = require('config'); //Module for ez configureationfiles depending on devel/prod enviroment, reads the NODE_ENV envirnoment variable
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const expressErrorHandler = require('./middleware/expressErrorHandler');
const app = express();

//Routes for the endpoints... Here just example endpoint
const example = require('./routes/example');

//Middleware that's always used -- gets in between the request and response (request -> middleware -> route handler -> response)
app.use(cors()); //adds cors support
app.use(helmet()); //Setting some headers, helps prevent attacks by not announce system is running on node and such.
app.use(compression()); //use compression to compress responses
app.use(express.json()); //for parsing req.body into a json object

//Makes so routes dont need to contain the whole uri, eg /api/something
app.use('/api/example', example); //when starts with /api/example then use the "example" route that is required from routes/exaple folder

app.use(expressErrorHandler); //Error handler middleware. Always shld be last cuz errors boubble up.

const port = config.get('app.port'); //sets listening port
app.listen(port, () => console.log(`listening on port ${port}`));
