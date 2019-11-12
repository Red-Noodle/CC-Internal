const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');
const mongoose = require('mongoose');


//Admin Model
const Admin = require('../models/Admin');

//Get all Admins
router.get('/', (req, res) => {
    Admin.find()
    .exec()
    .then(admins => {
        res.status(200).json(admins);
    })
    .catch(err => {
        console.log(err);
        return res.status(500);
    });
});

//Get admin by id
router.get('/:adminId', (req, res) => {
    var id = req.params.adminId;
    Admin.findById(id)
    .exec()
    .then(admin => {
        if(admin) {
            console.log(admin);
            res.status(200).json(admin);
        } else {
            req.flash('error', 'admin not found');
            res.status(404).send();
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500);
    });
});

router.get('/login', (req, res) => {
    
});

//Swoop Login
router.get('/swoop', (req, res) => {
    //receive an id from swoop
    const key = req.query.id;

    //validating id and getting email address
    axios.get(process.env.SWOOP_LOGIN_LINK + key)
    .then(response => {
        //Receive email from swoop
        var email = response.data;
        Admin.findOne({email: email})
        .exec()
        .then(admin => {
            //Email auth and setting key
            if(admin) {
                admin.loginKey = key;
                req.headers['key'] = key;
                res.status(200).json({success: true, email: email, key: key});
            } else {
                req.flash('error', 'admin not found');
                res.status(500);
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(404);
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(404);
    });
});

//Register Page
router.get('/register', (req, res) => {

});

//Handle Register
router.post('/register', (req, res) => {
    //Define variables from request body
    var { firstName, lastName, email } = req.body;
    console.log(req.body);
    //Check required fields
    if (!firstName || !lastName || !email) {
        req.flash("error", "fill in name and email fields");
        res.status(500);
    } else {
        // checking if admin already exists
       Admin.findOne({email: email})
       .then(admin => {
           if(admin) {
               // sending a message if admin does exist
               req.flash('error', 'admin already exists');
               return res.status(500).send();
           } else {
               //create new admin if one wasn't found
               newAdmin = new Admin({
                   name: {
                       firstName: firstName,
                       lastName: lastName
                   },
                   email: email,
                   //save new admin
               }).save()
                    .then(admin => {
                        console.log(admin);
                        req.flash('success', 'admin registered');
                        res.status(200).send();
                    })
                    .catch(err => {
                       console.log(err);
                       return res.status(500).send();
                   });
           }
       })
       .catch(err => {
           console.log(err);
           return res.status(500).send();
      });
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
    //destroy the current session and redirect to the login page
    req.session.destroy();
});

// //Handle updating an admin
router.patch('/:adminId', (req, res) => {
    var id = req.params.adminId;
    //Finding one to update
    Admin.updateOne(
      { _id: id },
      {
        $set: {
            name: { //Receiving update data from the request body
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
            },
          email: req.body.email
        }
      },
      { upsert: true, multi: true }
    )
      .exec()
      .then(updatedAdmin => {
        if (!updatedAdmin) {
            req.flash('error', 'admin not found')
          res.status(404).send();
        } else {
          console.log(updatedAdmin);
          req.flash("success", 'admin updated');
          res.status(200).send();
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send();
      });
});

// //Handle deleting an admin
router.delete('/:adminId', (req, res) => {
    var id = req.params.adminId;
    //Using id provided to find one to delete
    Admin.deleteOne({_id: id})
    .exec()
    .then(admin => {
        if(!admin) {
            req.flash('error', 'admin not found');
            res.status(404).send();
        } else {
            req.flash('success', 'admin was deleted');
            res.status(200).send();
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).send();
    });
});

module.exports = router;