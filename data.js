
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
	return employees.find((employee) => employee.name === search.toLowerCase());
};

//create a method that adds object to employee list
const addItem = (obj) => {
	//trigger if/else name found
	const find = getItem(obj.name)
	//if not found, add obj to employees list
	if (find === undefined) {
		console.log('New item added')
		return employees.push(obj); //returns pushed obj to end of list
	} else { //if found, return error
		console.log('Item has duplicate name')
		return { error: 'item unsuccesfully added/duplicate' }//returns error message
	}
}

// create a delete item method taking object
const deleteItem = (obj) => {
	//trigger if/else name exists
	const find = getItem(obj.name)
	//if not found, return error
	if (find === undefined) {
		console.log('Item was not found with that name')
		return { error: 'item not found/deleted' }
	} else { //found, remove found person from list
		let removedPerson = employees.filter((employee) => employee.name !== obj.name);
		console.log('Item was removed from list')
		return removedPerson;
	}
};




//export object and methods
export { employees, getAll, getItem, deleteItem, addItem };
