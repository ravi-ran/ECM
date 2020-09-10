const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const employeeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        dob: {
            type: String
        },
        mobile: {
            type: String
        },
        city: {
            type: String
        }
    },
    {
        timestamps: true
    }
);



autoIncrement.initialize(mongoose.connection);
try {
    employeeSchema.plugin(autoIncrement.plugin, {model:'Employee', field: 'empId', startAt: 1, incrementBy: 1});
} catch (error) {
    console.log(error);    
}


const employee = mongoose.model('Employee', employeeSchema);
//resetting id counteron start of server
const newEmp = new employee();
newEmp.save(function(err) {
    newEmp.nextCount(function(err,count) {
        newEmp.resetCount(function(err, nextCount){});
    });
});

module.exports = employee;
