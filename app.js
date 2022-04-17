//import http module
import http from 'http';
//import file system
import fs from 'fs';
//setup port
const port = 3000;
//import data.js
import * as data from './data.js'
//import parser
import { parse } from "querystring";

//create pathRedirect
const pathRedirect =  function (req, res) {
    console.log(req.url);
    const path = req.url.toLowerCase();
    const url = path.split("?"); // url split at ? into array
    let queryObj = parse(url[1]); // turn arrayItem[1] into object
    let queryDetail = '/detail?' + url[1]; //concat query for routing

    switch (path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(JSON.stringify(data.getAll()));
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('I like turtles');
            break;
        case queryDetail:
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(JSON.stringify(data.getItem(data.employees,queryObj.name)));
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
