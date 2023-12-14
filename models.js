const mongoose = require('./db');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

const Department = mongoose.model('Department', departmentSchema);
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Department, Employee };
