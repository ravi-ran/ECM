const facade = require('../../models/facade');

const managerDAL = {};

managerDAL.addManager = (managerObj) => {
    return facade.models.manager.create({
        firstName: managerObj.firstName,
        lastName: managerObj.lastName,
        email: managerObj.email,
        password: managerObj.password,
        address: managerObj.address,
        dob: managerObj.dob,
        company: managerObj.company
    }).then((managerRes) => managerRes)
        .catch((error) => error);
}

managerDAL.checkManager = async (managerObj) => {
    try {
        const managerLoggingIn = await facade.models.manager.findOne({email: managerObj.email});
        if(managerLoggingIn.password === managerObj.password) {
            return true;
        }
        return false;
    } catch (error) {
        return error;
    }
}

module.exports = managerDAL;