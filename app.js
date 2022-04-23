//import http module
import http from 'http';
//setup port
const port = 3000;
//import data.js
import * as data from './data.js';
//import parser
import { parse } from 'querystring';
//import express
import express from 'express';

const app = express();//set port
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // send static files
app.use(express.urlencoded()); //send Parse URL-encoded bodies
app.use(express.json()); //parses json bodies
app.set('view engine', 'ejs');//sets ejs as view engine

// send static file as response
app.get('/', (req, res) => {
	res.type('text/html');
	res.render('home', { test: {prop:'Testing...'}, employ: data.getAll() });	
});

// send plain text response
app.get('/about', (req, res) => {
	res.type('text/plain');
	res.send('I like turtles');
});

// send detail query
app.get('/detail', (req, res) => {
	console.log(req.query.name)
	let search = data.getItem(req.query.name)
	res.type('text/html');
	res.render('detail', { name: search.name, position: search.position, startTime: search.startTime, endTime: search.endTime, error: search.error })
});

// define 404 handler
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
	console.log('Express started');
   });

