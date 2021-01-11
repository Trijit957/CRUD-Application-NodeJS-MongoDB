const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/EmployeeDB", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err)
    {
        console.log('MongoDB Connection Established...');
    }
    else
    {
        console.log('MongoDB Connection Failed');
    }
});


require('./empSchema');
