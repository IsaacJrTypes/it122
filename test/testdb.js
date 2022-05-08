import { Employees } from '../Employees/Employees.js';

// return all records
// Employees.find({})
// 	.lean()
// 	.then((employee) => {
// 		console.log(employee);
// 	})
// 	.catch((err) => next(err));

// // return specific record
// Employees.findOne({ name: 'lauren' })
// 	.lean()
// 	.then((employee) => {
// 		console.log(employee);
// 	})
// 	.catch((err) => next(err));

//add new data entry
// const newEntry = new Employees({
// 	name: 'isaac',
// 	position: 'server',
// 	startTime: '16:00',
// 	endTime: '10:00',
// });

// newEntry
// 	.save()
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

//delete a record
// Employees.findOneAndDelete({ name: 'isaac' })
// 	.then((result) => {
// 		console.log(`Deleted: ${result}`);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
