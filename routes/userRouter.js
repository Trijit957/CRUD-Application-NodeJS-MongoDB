const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/empSchema');

userRouter.get('/homepage', (req,res) => {
   

    Employee.find().lean().exec((err, docs) => {
        if(!err)
        {
           
               res.render("users/homepage", {
                  list: docs
                 
                  });
               
            
        }
        else
        {
            console.log('Error in retrieving employee list : ' + err);
        }
    });

    

});

userRouter.post('/homepage', (req,res) => {
            
        var fname = req.body.fname;

        var lname = req.body.lname;
        var id_ = req.body.id_;
        var email = req.body.email;
        var phone = req.body.phone;
        var department = req.body.department; 
        var address = req.body.address;
    
        var newemp = new Employee();

        newemp.fname = fname;
        newemp.lname = lname;
        newemp.id_ = id_;
        newemp.email = email;
        newemp.phone = phone;
        newemp.department = department;
        newemp.address = address;   

        newemp.save((err, docs) => {
            if(err) throw err;
            else
            {
                res.redirect('http://localhost:3000/users/homepage');
            }
        });
            
            
       
    });




userRouter.get('/homepage/edit/:id', (req,res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id))
    {
        Employee.findById(req.params.id).lean().exec((err, docs) => {
            if(err) throw err;
            res.render('users/edit',{
                docs: docs
            });
            

        });
    }
    else {
        res.send("ERROR");
    }
});


userRouter.post('/homepage/:id', (req,res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id))
    {
        Employee.findOneAndUpdate({ _id: req.params.id }, req.body ,{ new: true, useFindAndModify: false }, (err,docs) => {
                if(err) throw err;
                Employee.find({}, (err, docs) => {
                    if(err)
                    {
                        res.redirect('users/homepage');
                    }
                else{
                        res.render('users/homepage', {
                        list: docs
                });
            }
        
    
    }).lean();
                
    


            });
    }
    else{
        res.send("ERROR");
    }
    
});



userRouter.get('/homepage/delete/:id', (req,res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id))
    {
    
        Employee.findOneAndDelete({ _id: req.params.id },{ useFindAndModify: false }, (err,docs) => {
                if(err){
                    res.redirect('users/homepage');
                }
               

                Employee.find({}, (err, docs) => {
                if(err)
                {
                    res.redirect('users/homepage');
                }
            else{
                    res.render('users/homepage', {
                    list: docs
            });
        }
    

}).lean();
            });
    }
    else{
        res.send("ERROR");
    }
    
});




module.exports = userRouter;