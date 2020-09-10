
const employee = require('./employee');
const manager = require('./manager');

const initialiseEmployee =  async () => {
    const emp1 = new employee({
        firstName: 'Tony',
        lastName: 'Stark',
        address: 'Malibu',
        dob: null,
        mobile: null,
        city: null
    });
    const emp2 = new employee({
        firstName: 'Bruce',
        lastName: 'Wayne',
        address:  'Wayne Manor',
        dob: null,
        mobile: null,
        city: null
    });
    const emp3 = new employee({
        firstName: 'Peter',
        lastName: 'Parker',
        address:  'Forest Hills, Queens',
        dob: null,
        mobile: null,
        city: null
    });
    const emp4 = new employee({
        firstName: 'Sherlock',
        lastName: 'Holmes',
        address: '221B Baker Street',
        dob: null,
        mobile: null,
        city: null
    });
    const emp5 = new employee({
        firstName: 'Wade',
        lastName: 'Wilson',
        address: 'New York',
        dob: null,
        mobile: null,
        city: null
    });
    
    await emp1.save();
    await emp2.save();
    await emp3.save();
    await emp4.save();
    await emp5.save();
}

const initialiseManager = async () => {
    const manager1 = new manager({
        email: 'fiction_manager@multiverse.com',
        firstName: 'Fiction',
        lastName: 'Manager',
        password: 'liftIsWorthy@thor',
        address: null,
        dob: null,
        company: null
    });

    await manager1.save();
}

module.exports = { initialiseEmployee, initialiseManager };