//create 5 objects
let employees = [
	{ name: 'pj', position: 'bartender', startTime: '16:00', endTime: '02:00' },
	{ name: 'joe', position: 'bartender', startTime: '16:00', endTime: '02:00' },
	{ name: 'lauren', position: 'server', startTime: '16:00', endTime: '00:00' },
	{ name: 'racheal', position: 'server', startTime: '16:00', endTime: '11:00' },
	{ name: 'fran', position: 'server', startTime: '16:00', endTime: '10:00' },
];

//create getAll method that returns all array items
const getAll = () => employees;

//create a getItem method that returns a single item
const getItem = (search) => {
	const index = employees.findIndex((employee) => employee.name === search.toLowerCase());
	if (index === -1) {
		return { error: 'No employee with that name' };
	} else {
		return employees[index];
	} //close else
}; //close getItem

//export object and methods
export { employees, getAll, getItem };
