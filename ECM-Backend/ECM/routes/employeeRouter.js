const express = require('express');
const employeeRouter = express.Router();

const employeeBL = require('../public/javascripts/Employee/employeesBL');

employeeRouter.get('/', async (req, res, next) => {
    const employeeRes = await employeeBL.fetchAllEmployee();
    res.send(employeeRes);
});


employeeRouter.get('/:empId', async (req, res, next) => {
    try {
        const employeeRes = await employeeBL.fetchEmployeeById(req.params.empId);
        res.send(employeeRes);        
    } catch (error) {
        res.send(error);
    }
});

employeeRouter.post('/', async (req, res, next) => {
    try {
        const employeeRes = await employeeBL.addEmployee(req);
        res.send(employeeRes);
    } catch (error) {
        res.send(error);
    }
});

employeeRouter.put('/', async (req,res) => {
    try {
        const employeeRes = await employeeBL.updateEmployee(req);
        res.send(employeeRes);
    } catch (error) {
        res.send(error);
    }
});

employeeRouter.delete('/:empId', async(req,res) => {
    try {
        const employeeRes = await employeeBL.deleteEmployee(req.params.empId);
        res.send(employeeRes);
    } catch (error) {
        res.send(error);
    }
})

module.exports = employeeRouter;