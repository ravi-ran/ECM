const facade = require('../../models/facade');

const employeeDAL = {};

employeeDAL.fetchAllEmployee = async () => {
    try {
        const employeeList = await facade.models.employee.find();
        return employeeList;
    } catch (error) {
        return error;
    }
}

employeeDAL.fetchEmployeeById = async (empId) => {
    try {
        const employee = await facade.models.employee.findOne({empId: empId});
        return employee;
    } catch (error) {
        return error;
    }
}

employeeDAL.addEmployee = (employee) => {
    return facade.models.employee.create({
        firstName: employee.empFirstName,
        lastName: employee.empLastName,
        address: employee.empAddress,
        dob: employee.empDob,
        mobile: employee.empMobile,
        city: employee.empCity
    }).then((employeeRes) => {
        return employeeRes;
    }).catch((error) => {
        return (error);
    })
}

employeeDAL.updateEmploye = async (employeeObj) => {
    try {
        const employeeToBeUpdated = await facade.models.employee.findOne({ empId: employeeObj.empId });

        employeeToBeUpdated.firstName = employeeObj.empFirstName;
        employeeToBeUpdated.lastName = employeeObj.empLastName;
        employeeToBeUpdated.address = employeeObj.empAddress;
        employeeToBeUpdated.dob = employeeObj.empDob;
        employeeToBeUpdated.mobile = employeeObj.empMobile;
        employeeToBeUpdated.city = employeeObj.empCity;
        
        await employeeToBeUpdated.save();
        return employeeToBeUpdated;
    } catch (error) {
        return error;
    }
}

employeeDAL.deleteEmployee = async (id) => {
    try {
        const isDeleted = await facade.models.employee.deleteOne({empId: id});
        if(isDeleted) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports = employeeDAL;