const facade = require('../../models/facade');

const managerDAL = {};

managerDAL.addManager = async (managerObj) => {
    try {
        const isManagerPresent = await facade.models.manager.findOne({email: managerObj.email})
        if(isManagerPresent) {
            throw new Error('Email Already Exist');
        }
        return facade.models.manager.create({
            firstName: managerObj.firstName,
            lastName: managerObj.lastName,
            email: managerObj.email,
            password: managerObj.password,
            address: managerObj.address,
            dob: managerObj.dob,
            company: managerObj.company
        }).then((managerRes) => {
            console.log(managerRes);
            return managerRes;
        })
            .catch((error) => {
                console.log('******Error while adding manager in DAL *****');
                console.log(error);
                return error;
            });
    } catch (error) {
        console.log('inside error of add manager DAL');
        console.log(error);
        throw error;
    }
}

managerDAL.checkManager = async (managerObj) => {
    try {
        const managerLoggingIn = await facade.models.manager.findOne({ email: managerObj.email });
        if (managerLoggingIn) {
            if (managerLoggingIn.password === managerObj.password) {
                return true;
            }
        }
        return false;
    } catch (error) {
        throw error;
    }
}

managerDAL.getAllManager = async() => {
    try {
        const managerList = await facade.models.manager.find();
        return managerList;
    } catch (error) {
        throw error;
    }
}

module.exports = managerDAL;