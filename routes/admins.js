const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

//Admin Model
const Admin = require('../models/Admin');

//Get all Admins
router.get('/', (req, res) => {
    Admin.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.json(data);
    });
});

router.get('/login', (req, res) => {
    res.render('../views/index.html');
    req.flash();
});

//Swoop Login
router.get('/swoop', (req, res) => {
    //receive an id from swoop
    var id = req.query.id;

    //validating id and getting email address
    axios.get(process.env.SWOOP_LOGIN_LINK + id)
    .then(response => {
        var email = response.data;
        //basic email auth
        Admin.findOne({email: email})
        .then(admin => {
            if(admin) {
                //admin auth
                if(admin.pass == process.env.SWOOP_ENDPOINT_PASSWORD) {
                    //logged in with session
                    return res.redirect('/', 200);
                } else {
                    return res.status(500).send('something went wrong');
                }
            } else {
                return res.status(500).send('user doesn\t exist');
            }
        })
        .catch(err => {
            return res.status(500);
        })
    })
    .catch(err => {
        return res.status(500);
    });
});

//Register Page
router.get('/register', (req, res) => {
    res.render('../views/register.html');
    const message = req.flash();
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
                   pass: process.env.SWOOP_ENDPOINT_PASSWORD
                   //save new admin
               }).save()
                   .then(admin => res.status(200).send({ flash: 'Account created' }))
                   .catch(err => {
                       console.log(err);
                       res.sendStatus(500);
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
    res.redirect('admins/login');
});

module.exports = router;