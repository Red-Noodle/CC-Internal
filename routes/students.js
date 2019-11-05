const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
    res.send(Student.find());
});

//Login Page
router.get('/login', (req, res) => {
    res.send("student login");
});

//Handle Login
router.post('/login', (err, res) => {
    
});

//Register Page
router.get('/register', (req, res) => {
    res.render('../views/register.html');
});

//Handle Register
router.post('/register', (req, res) => {
    const {firstname, lastname, email, address, phone, cohortName} = req.body;

    //Check required fields
    if(!firstname || !lastname || !email) {
        
    }

    //Create new Student
    const newStudent = new Student({
        name: {
            firstName: firstname,
            lastName: lastname
        },
        email: email,
        address: address,
        phone: phone
    });

    //Save new Student
    newStudent.save().then(student => res.status(200)).catch(err => {
        console.log(err);
        res.sendStatus(500);
        return;
    });
});

module.exports = router;