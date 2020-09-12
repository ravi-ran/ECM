const employeeDAL = require('./employeesDAL');

const employeeBL = {};

employeeBL.fetchAllEmployee = () => {
    return employeeDAL.fetchAllEmployee();
}

employeeBL.fetchEmployeeById = (empId) => {
    return employeeDAL.fetchEmployeeById(empId);
}

employeeBL.addEmployee = (req) => {
    const employeeJson = {
        'empFirstName': req.body.firstName,
        'empLastName': req.body.lastName,
        'empAddress': req.body.address,
        'empDob': req.body.dob,
        'empMobile': req.body.mobile,
        'empCity': req.body.city
    };
    return employeeDAL.addEmployee(employeeJson);
}

employeeBL.updateEmployee = (req) => {
    const employeeJson = {
        'empId': req.body.empId,
        'empFirstName': req.body.empFirstName,
        'empLastName': req.body.empLastName,
        'empAddress': req.body.empAddress,
        'empDob': req.body.empDob,
        'empMobile': req.body.empMobile,
        'empCity': req.body.empCity
    };
    return employeeDAL.updateEmploye(employeeJson);
}

employeeBL.deleteEmployee = (id) => {
    return employeeDAL.deleteEmployee(id);
}

module.exports = employeeBL;