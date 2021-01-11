const mongoose = require('mongoose');


var empSchema = new mongoose.Schema({

    fname: {
        type: String
    },
    lname: {
        type: String
        
    },
    id_: {
        type: String
       
    },
    email: {
        type: String
        
    },
    phone: {
        type: String
        
    },
    department: {
        type: String
        
    },
    address: {
        type: String
        
    }
});


Employee = mongoose.model('employee', empSchema);

module.exports = Employee;