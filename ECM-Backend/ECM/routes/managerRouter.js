const express = require('express');
const managerRouter = express.Router();

const managerBL = require('../public/javascripts/Managers/managersBL');

managerRouter.post('/login', async (req, res, next) => {
    try {
        const managerAuthenticated = await managerBL.checkManager(req);
        res.send(managerAuthenticated);
    } catch (error) {
        res.send(error);
    }
});

managerRouter.post('/add', async (req, res, next) => {
    try {
        const managerRes = await managerBL.addManager(req);
        res.send(managerRes);
    } catch (error) {
        res.send(error);
    }
});

module.exports = managerRouter;