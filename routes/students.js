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
    res.render('../views/register.html');
});

//Handle Register
router.post('/register', (req, res) => {
    const {firstname, lastname, email, password, address, phone, cohortName} = req.body;

    //Check required fields
    if(!firstname || !lastname || !email || !password) {
        //alert("Please fill in all of the fields");
    }

    if(password.length < 6) {
        //alert("Password must be at least 6 characters in length");
    }

    //Create new Student
    const newStudent = new Student({
        name: {
            firstName: firstname,
            lastName: lastname
        },
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
            console.log(newStudent);
        });
    });
    res.send("hello");
});

module.exports = router;