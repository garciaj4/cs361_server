// Required modules
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var cors = require('cors');

// Setup
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('port', process.argv[2]);
app.set('mysql', mysql);

// Table routes
app.use('/user', require('./user.js'));
app.use('/reminders', require('./reminders.js'));
app.use('/log', require('./log.js'));


// Port 
app.listen(app.get('port'), function(){
  console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
