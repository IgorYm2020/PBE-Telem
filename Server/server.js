const http = require('http');
const url = require('url');
const querystring = require('querystring');
const parser = require('./parser');

http.createServer(function (req, res) {
	// Parse the url
	map=parser.parseUrl(req.url);
	console.log(map)
	table=parser.getTableName(req.url);
	
	// Check if the db has the selected table
	console.log("Checking table: "+table)

	// Write and send the response
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end();
}).listen(8080); 
