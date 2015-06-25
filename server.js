//Require Modules
var express = require('express');
var app = express();
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.send('Hello World');
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port: ', app.get('port'));
});

//Creating Array of available mimeTypes (https://en.wikipedia.org/wiki/Internet_media_type)
var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"
};

//Create Server
http.createServer(function(req, res){
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log('Loading ' + uri);
	var stats;
	
	//Try Catch block 
	try {
		stats = fs.lstatSync(fileName);
	} catch(e) {
		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
	
	//Check if file/directory
	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {'Content-type': mimeType});
		
		//Create File Stream
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if(stats.isDirectory()){
		//Redirect if Directory
		res.writeHead(302, {
			location : "index.html"
		});
		res.end();
	} else {
		res.writeHead(500, {'Content-Type' : 'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}
	
}).listen(3000);
