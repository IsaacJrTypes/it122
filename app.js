//import http module
const http = require('http');
//import file system
const fs = require('fs');
//setup port
const port = 3000;

//create pathRedirect
const pathRedirect =  function (req, res) {
    console.log(req.url);
    const path = req.url.toLowerCase();
    switch (path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Hola Mundo!');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('I like turtles');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Please try again');
            break;
    }
}

//create server funct in var
const server = http.createServer(pathRedirect);

//show err msg, else print port
const errMsg = function (err) {
    if (err) {
        console.log(`There is an error: ${err}`);
    } else {
        console.log(`Server is listening on port: ${port}`);
    }
}

server.listen(port, errMsg);
