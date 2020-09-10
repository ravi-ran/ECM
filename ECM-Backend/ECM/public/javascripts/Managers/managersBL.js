const managerDAL = require('./managersDAL');
const managerBL = {};

managerBL.checkManager = (req) => {
    const managerJSON = {
        'email': req.body.email,
        'password': req.body.password
    };
    return managerDAL.checkManager(managerJSON);
}

managerBL.addManager = (req) => {
    const managerJSON = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'email': req.body.email,
        'password': req.body.password,
        'address': req.body.address,
        'dob': req.body.dob,
        'company': req.body.company
    };
    return managerDAL.addManager(managerJSON);
}


module.exports = managerBL;