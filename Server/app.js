const http = require('http');
const url = require('url');
const querystring = require('querystring');
const mongo = require('mongodb');
const parser = require('./parser');
const db = require('./mongo');

http.createServer(async function (req, res) {
	// Parse the url
	map=parser.parseUrl(req.url);
	console.log(map)
	table=parser.getTableName(req.url);
	
	// Check if the db has the selected table
	console.log("Checking table: "+table);

	const response= { 
		"table": table,
		"contents": await db.getFromDB(table,map)
	};

	console.log(response)
	res.end(JSON.stringify(response));
	// Write and send the response
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end();
}).listen(8080); 
