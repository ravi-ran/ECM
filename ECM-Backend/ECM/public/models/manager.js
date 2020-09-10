const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const managerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        dob: {
            type: String
        },
        company: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

autoIncrement.initialize(mongoose.connection);
try {
    managerSchema.plugin(autoIncrement.plugin, {model:'Manager', field: 'mId', startAt: 1, incrementBy: 1});
} catch (error) {
    console.log(error);    
}

const manager = mongoose.model('Manager', managerSchema);

const newManager = new manager();
newManager.save(function(err) {
    newManager.nextCount(function(err,count) {
        newManager.resetCount(function(err, nextCount){});
    });
});

module.exports = manager;