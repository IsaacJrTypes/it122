//import express
import express from 'express';
//import mongoose employees
import { Employees } from './Employees/Employees.js';
//router
let router = express.Router()

/* API routing */
// getAll()
router.get('/api/employees', (req, res) => {
	Employees.find({})
		.lean()
		.then((employees) => {
			if (employees) {
				res.status(200);
				return res.json({ success: 'getAll()', employees: employees });
			} else {
				res.status(500);
				return res.json({ success: 'getAll() fail' });
			}
		})
		.catch((err) => next(err));
});

// getItem()
router.get('/api/employee/:name', (req, res) => {
	const search = req.params.name;
	Employees.findOne({ name: search })
		.lean()
		.then((employee) => {
			if (employee) {
				res.status(200);
				return res.json({ success: 'getItem()', employee: employee });
			} else {
				res.status(500);
				return res.json({ success: 'getItem() fail'})
			}
		})
		.catch((err) => console.log(err));
});

//insert new item
// router.post('/api/new', (req,res) => {
// 	if (!body.req) {
// 		return res.status(400).send('Request body missint')
// 	} else {
// 		return res.status(200).send('We have a body!')
// 	}
// })

//export router

