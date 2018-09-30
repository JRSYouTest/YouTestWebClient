// requires
var serverPort = 8888;

var bodyParser = require('body-parser');

var express = require('express');
var app = express();

//express logic
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Link: static HTML/angular pages 
app.use(express.static("client"));

// web server 
app.listen(serverPort, function(){
	console.log("Client application started. Listenting on port: " + serverPort )
}); 

