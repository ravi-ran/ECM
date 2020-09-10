const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const manager = require('./manager');
const employee = require('./employee');

const initialiseDB = require('./dbScript');

const url = "mongodb://localhost:27017/ECM_DB";

const connectDB = () => {
    return mongoose.connect(url , {useNewUrlParser: true});
};


const models = { manager, employee };


module.exports = { connectDB, models, initialiseDB };