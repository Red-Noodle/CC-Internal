const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');


//Admin Model
const Admin = require('../models/Admin');

//Get all Admins
router.get('/', (req, res) => {
    key = req.id;
    if(!key) {
        res.redirect('/admins/login');
    } else {
    Admin.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.json(data);
        });
    }   
});

router.get('/login', (req, res) => {
    res.render('../views/index.html');
});

//Swoop Login
router.get('/swoop', (req, res) => {
    //receive an id from swoop
    var key = req.query.id;

    //validating id and getting email address
    axios.get(process.env.SWOOP_LOGIN_LINK + key)
    .then(response => {
        //Receive email from swoop
        var email = response.data;
        Admin.findOne({email: email}) 
        .then(admin => {
            //Email auth and setting key
            admin.loginKey = key;
            req.flash({success: 'logged in'});
            if(!admin) {
                req.flash({error: 'admin doesn\'t exist'})
            }
        })
        .catch(err => {
            return req.flash({error: err});
        });
    })
    .catch(err => {
        req.flash({error: err});
    });
});

//Register Page
router.get('/register', (req, res) => {

});

//Handle Register
router.post('/register', (req, res) => {
    //Define variables from request body
    const { firstName, lastName, email } = req.body;
    console.log(req.body);
    //Check required fields
    if (!firstName || !lastName || !email) {
        return req.flash({error: 'please fill in name and email fields'});
    } else {
        // checking if admin already exists
       Admin.findOne({email: email})
       .then(admin => {
           if(admin) {
               // sending a message if admin does exist
               return req.flash({error: 'admin already exists'})
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
                   .then(admin => req.flash({success: 'admin registered'}))
                   .catch(err => {
                       console.log(err);
                       return req.flash({error: err});
                   });
           }
       })
       .catch(err => {
           return req.flash({error: err});
       });
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
    //destroy the current session and redirect to the login page
    req.session.destroy();
});

module.exports = router;