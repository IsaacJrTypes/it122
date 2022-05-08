//import data.js
import * as data from './data.js';
//import express
import express from 'express';
//import mongoose employees
import { Employees } from './Employees/Employees.js';

const app = express(); //set port
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // send static files
app.use(express.urlencoded()); //send Parse URL-encoded bodies
app.use(express.json()); //parses json bodies
app.set('view engine', 'ejs'); //sets ejs as view engine

// send static file as response
app.get('/', (req, res) => {
	res.type('text/html');
	Employees.find({})
		.lean()
		.then((employees) => {
			res.render('home', { employees });
		})
		.catch((err) => next(err));
});

// send plain text response
app.get('/about', (req, res) => {
	res.type('text/plain');
	res.send('I like turtles');
});

// send detail query
app.get('/detail', (req, res) => {
	console.log(req.query.name);
	let search = req.query.name;
	res.type('text/html');
	Employees.findOne({ name: search })
		.lean()
		.then((employee) => {
			res.render('detail', { employee: employee });
		})
		.catch((err) => next(err));
});

//delete route
app.get('/delete', (req, res) => {
	console.log(req.query.name);
	let search = req.query.name;
	res.type('text/html');
	Employees.findOneAndDelete({ name: search })
		.then((result) => {
			console.log(`Deleted: ${result}`);
		})
		.catch((err) => {
			next(err);
		});
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
