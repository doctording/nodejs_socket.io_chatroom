var PORT = 8888;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var Tools=require('./Tools');
//var tools = new Tools();

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var curDir = __dirname +'/web-client';
    var guessPage = Tools.guessPage(fs, path, curDir, pathname);
    var realPath = guessPage.realPath;
    var ext = guessPage.ext;
        
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + realPath + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    console.log("contentType: " + contentType);
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
