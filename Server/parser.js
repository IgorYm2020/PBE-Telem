// Importing the models
const querystring = require('node:querystring');
const url = require('node:url');

exports.parseUrl = function(inputURL){
	parsed=url.parse(inputURL); // Parses original url
	stringified=querystring.parse(parsed.query); // Defines a object prototipe with the query values
	// console.log(stringified); 
	return new Map(Object.entries(stringified)); // Converts the prototype into map
}

exports.getTableName = function(inputURL){
	pathname=url.parse(inputURL).pathname; // Returns something in the format /timetables
	return pathname.substring(1); // Returns the previous value without the /
}
