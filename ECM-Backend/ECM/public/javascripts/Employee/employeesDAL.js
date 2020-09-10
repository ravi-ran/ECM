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

module.exports = employeeDAL;