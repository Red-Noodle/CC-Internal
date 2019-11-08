const express = require('express');
const router = express.Router();
const axios = require('axios');

//Admin Model
const Admin = require('../models/Admin');
const findAdminsByEmail = Admin.findAdminsByEmail;

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
});

//Swoop Login
router.get('/swoop', (req, res) => {
    var email = req.body.email;
    var admin = findAdminsByEmail(email);
    if(admin == undefined) {
        return res.render({error: 'account doesn\' exist'});
    }
    if(admin.pass == process.env.SWOOP_ENDPOINT_PASSWORD) {
        return res.render({succes: false, error: 'incorrect pass'});
    }
    if(admin != undefined) {
        var key = req.query.id;
        admin.loginKey = key;
        axios.get(process.env.SWOOP_LOGIN_LINK + key)
        .then(response => {
            res.json({success: true, key: key});
        })
        .catch(error => {
            res.json({success:false, error: error});
        });
    }
});

//Register Page
router.get('/register', (req, res) => {
    res.send("admin register");
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstName, lastName, email } = req.body;

    //Check required fields
    if (!firstname || !lastname || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    }

    //Create new Admin
    const newAdmin = new Admin({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        pass: process.env.SWOOP_ENDPOINT_PASSWORD
    });

    Admin.findOne({email: email}, (err, data) => {
        if(err) {
            return res.status(500).send({flash:"there was an error"})
        }
        if(newAdmin.email == email) {
            return res.status(500).send({flash: "account already exists"});
        }
        //Saving Admin
        newAdmin.save()
            .then(admin => res.sendStatus(200))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
                return;
            });
    });

    
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('admins/login');
});

module.exports = router;