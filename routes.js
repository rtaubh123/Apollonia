const express = require('express');
const { Department, Employee } = require('./models');

const router = express.Router();

// Get all departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new department
router.post('/departments', async (req, res) => {
  const { name } = req.body;

  try {
    const department = new Department({ name });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Duplicate key (unique constraint) error
      res.status(400).json({ error: 'Department with this name already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new employee
router.post('/employees', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const employee = new Employee({ firstName, lastName, department });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
