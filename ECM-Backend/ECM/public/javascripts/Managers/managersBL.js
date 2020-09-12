const managerDAL = require('./managersDAL');
const managerBL = {};

managerBL.checkManager = (req) => {
    const managerJSON = {
        'email': req.body.email,
        'password': req.body.password
    };
    return managerDAL.checkManager(managerJSON);
}

managerBL.addManager = async (req) => {
    const managerJSON = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'email': req.body.email,
        'password': req.body.password,
        'address': req.body.address,
        'dob': req.body.dob,
        'company': req.body.company
    };

    try {
        const managerRes = await managerDAL.addManager(managerJSON);
        return managerRes;
    } catch (error) {
        console.log('error inside manager bl add');
        console.log(error);
        throw error;
    }
    

}


managerBL.getAllManager = () => {
    return managerDAL.getAllManager();
}

module.exports = managerBL;