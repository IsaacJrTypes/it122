import mongoose from 'mongoose';
import { connectionString } from '../credentials.js';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
console.log(connectionString)

mongoose.connect(connectionString, {
    dbName: 'Project',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const employeesSchema = new Schema({
 name: { type: String, required: true },
 position: String,
 startTime: String,
 endTime: String
});


export const Employees = mongoose.model('Employees', employeesSchema);