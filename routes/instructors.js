const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Instructor = require('../models/Instructor');

//Login Page
router.get('/login', (req, res) => {
    res.send("instructor login");
});

//Register Page
router.get('/register', (req, res) => {
    res.send("instructor register");
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstName, lastName, email, password, address, phone, cohortName } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email || !password) {
        alert("Please fill in all of the fields")
    }

    //Check for password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters in length");
    }

    //Create new Instructor
    const newInstructor = new Instructor({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        password: password,
        address: address,
        phone: phone, 
        cohortName: cohortName
    });

    //Hashing password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(salt, (err, hash) => {
            if(err) throw err;
            newInstructor.password = hash;

            //Saving new Instructor
            newInstructor.save().then(instructor => res.send('success')).catch(console.log(err));
        });
    });

});

module.exports = router;