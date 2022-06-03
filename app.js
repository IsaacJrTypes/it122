//import data.js
import * as data from './data.js';
//import express
import express from 'express';
//import mongoose employees
import { Employees } from './Employees/Employees.js';
//import cors
import cors from 'cors';

const app = express(); //set port
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); //sets ejs as view engine
app.use(express.static('./public')); // send static files
app.use(express.json()); //parses json bodies
app.use(express.urlencoded()); //send Parse URL-encoded bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

///////////////////////////////////////////////////////////////////////////////////////
/* API routing */
// getAll()
app.get('/api/employees', (req, res) => {
	Employees.find({})
		.lean()
		.then((employees) => {
			if (employees) {
				res.status(200);
				return res.json({ success: true, msg: 'getAll()', employees: employees });
			} else {
				res.status(500);
				return res.json({ success: false, msg: 'getAll() fail' });
			}
		})
		.catch((err) => next(err));
});

// getItem()
app.get('/api/employee/:name', (req, res) => {
	const search = req.params.name;
	Employees.findOne({ name: search })
		.lean()
		.then((employee) => {
			if (employee) {
				res.status(200);
				return res.json({ success: true, msg:'getItem()', employee: employee });
			} else {
				res.status(500);
				return res.json({ success: false, msg:'getItem() fail' });
			}
		})
		.catch((err) => console.log(err));
});

app.get('/api/delete/:name', (req, res) => {
	const search = req.params.name;
	Employees.findOneAndDelete({ name: search })
		.then((result) => {
			if (result) {
				res.status(200);
				return res.json({ success: true, msg:`Found and Deleted: ${result}` });
			} else {
				res.status(500);
				return res.json({ success: false, msg:`Failed to find and delete: ${search}` });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

//add new entry
app.post('/api/add', (req, res) => {
	const newObj = {
		name: req.body.name,
		position: req.body.position,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
	};

	if (!newObj.name) {
		res.status(500);
		return res.json({ success: false, msg: 'Need to include a name or duplicate name' });
	} else {
		Employees.updateOne({ name: newObj.name }, newObj, { upsert: true }, (err, result) => {
			if (err) return console.log(err);

			if (result.upsertedCount == 0) {
				res.status(409);
				return res.json({ success: false, msg: `${newObj.name} name entry already exists` });
			} else {
				res.status(200);
				return res.json({ success: true, msg:`${newObj.name} was added to database` });
			}
		}); //end mongodb
	} //end else
});

///////////////////////////////////////////////////////////////////////////////////////

/* http Routing */

//React homepage
// send static file as response
app.get('/react', (req, res) => {
	res.type('text/html');
	Employees.find({})
		.lean()
		.then((employees) => {
			res.render('react', { employees: JSON.stringify(employees) });
		})
		.catch((err) => next(err));
});

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
