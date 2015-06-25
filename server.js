//Require Modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//Creating Array of available mimeTypes (https://en.wikipedia.org/wiki/Internet_media_type)
var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"
};
