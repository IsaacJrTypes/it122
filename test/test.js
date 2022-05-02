import { expect } from 'chai';
import * as data from '../data.js';

//test employee obj
const testJoe = { name: 'joe', position: 'bartender', startTime: '16:00', endTime: '02:00' };
const testJaime = { name: 'jaime', position: 'bartender', startTime: '16:00', endTime: '02:00' };
const testDavid = { name: 'david', position: 'server', startTime: '12:00', endTime: '21:00' };

//batch of test employees to compare
const testEmployees = [
	{ name: 'pj', position: 'bartender', startTime: '16:00', endTime: '02:00' },
	{ name: 'joe', position: 'bartender', startTime: '16:00', endTime: '02:00' },
	{ name: 'lauren', position: 'server', startTime: '16:00', endTime: '00:00' },
	{ name: 'racheal', position: 'server', startTime: '16:00', endTime: '11:00' },
	{ name: 'fran', position: 'server', startTime: '16:00', endTime: '10:00' },
    { name: 'david', position: 'server', startTime: '12:00', endTime: '21:00' }
];
const testEmployees2 = [
	{ name: 'pj', position: 'bartender', startTime: '16:00', endTime: '02:00' },
	{ name: 'lauren', position: 'server', startTime: '16:00', endTime: '00:00' },
	{ name: 'racheal', position: 'server', startTime: '16:00', endTime: '11:00' },
	{ name: 'fran', position: 'server', startTime: '16:00', endTime: '10:00' },
    { name: 'david', position: 'server', startTime: '12:00', endTime: '21:00' }
];

//error msg obj
const testErrObj = { error: 'item unsuccesfully added/duplicate' }
const testErrObj2 = { error: 'item not found/deleted' }


//describe purpose
describe('Employees module', () => {
	//describe test with it, then function
	it('Tests requested employee info w/.getItem()', () => {
		const result = data.getItem('joe');
		expect(result).to.deep.equal(testJoe);
	}); //end it

	it('Tests undefined error return w/.getItem()', () => {
		const result = data.getItem('daniel');
		expect(result).to.be.undefined;
	}); //end it

    it('Tests successful employee entry w/.addItem()', () => {
        const result = data.addItem(testDavid)
        expect(result).to.deep.equal(testEmployees.length)
    }) //end it
    
    it('Tests unsuccessful employee entry w/.addItem()', () => {
        const result = data.addItem(testDavid)
        expect(result).to.deep.equal(testErrObj)
    }) //end it
    
    it('Tests successful employee deletion w/.deleteItem()', () => {
        const result = data.deleteItem(testJoe)
        expect(result).to.deep.equal(testEmployees2)//
    }) //end it
    
    it('Tests unsuccessful employee deletion w/.deleteItem()', () => {
        const result = data.deleteItem(testJaime)
        expect(result).to.deep.equal(testErrObj2)//
    }) //end it
}); //end describe
