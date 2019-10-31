const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Student Model
const Student = require('../models/Student');

//Login Page
router.get('/login', (req, res) => {
    res.send("student login");
});

//Register Page
router.get('/register', (req, res) => {
    res.send("student register");
});

//Handle Register
router.post('/register', (req, res) => {
    const {name, email, password, address, phone, cohortName} = req.body;

    //Check required fields
    if(!name || !email || !password) {
        alert("Please fill in all of the fields");
    }

    if(password.length < 6) {
        alert("Password must be at least 6 characters in length");
    }

    //Create new Student
    const newStudent = new Student({
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone,
        cohortName: cohortName
    });

    //Hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if(err) throw err;
            newStudent.password = hash;

            //Save new Student
            newStudent.save().then(student => res.send('success')).catch(err => console.log(err));
        });
    });
});

module.exports = router;