const employeeDAL = require('./employeesDAL');

const employeeBL = {};

employeeBL.fetchAllEmployee = () => {
    return employeeDAL.fetchAllEmployee();
}

employeeBL.addEmployee = (req) => {
    const employeeJson = {
        'empFirstName': req.body.empFirstName,
        'empLastName': req.body.empLastName,
        'empAddress': req.body.empAddress,
        'empDob': req.body.empDob,
        'empMobile': req.body.empMobile,
        'empCity': req.body.empCity
    };
    return employeeDAL.addEmployee(employeeJson);
}

employeeBL.updateEmploye = (req) => {
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

module.exports = employeeBL;