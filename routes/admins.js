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
        var email = response.data;
        Admin.findOne({email: email}) 
        .then(admin => {
            admin.loginKey = key;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/admins/login');
        });
    })
    .catch(err => {
        res.json({success: false, error: error});
    });
});

//Register Page
router.get('/register', (req, res) => {
    res.render('../views/register.html');
});

//Handle Register
router.post('/register', (req, res) => {
    //Define variables from request body
    const { firstName, lastName, email } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    } else {
        // checking if admin already exists
       Admin.findOne({email: email})
       .then(admin => {
           if(admin) {
               // sending a message if admin does exist
               return res.status(500).send('user already exists');
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
                   .then(admin => res.status(200).redirect('/admins/register'))
                   .catch(err => {
                       console.log(err);
                       res.status(500).redirect('/admins/register');
                       return;
                   });
           }
       })
       .catch(err => {
           return res.status(500).send('there was an error');
       });
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
    //destroy the current session and redirect to the login page
    req.session.destroy();
    res.redirect('/admins/login');
});

module.exports = router;