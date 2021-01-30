var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Security = require('./source/routes/securityController');
var Combat = require('./source/routes/combatController');
var Shared = require('./source/routes/sharedController');
var app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
  
app.use(cors(corsOptions))

// Default
app.get('/', function(req, res) {
    res.send("API listening for requests.");
});

// Routes
app.use('/visualiser/security/', Security);
app.use('/visualiser/combat/', Combat);
app.use('/visualiser/shared/', Shared);

module.exports = app;

