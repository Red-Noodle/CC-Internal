const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
    Student.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.json(data);
    });
});

//Login Page
router.get('/login', (req, res) => {
    
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
    const {firstName, lastName, email, address, phone, cohort} = req.body;
    console.log(req.body);
    //Check required fields
    if (!firstName || !lastName || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    }

    //Create new Student
    const newStudent = new Student({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        address: address,
        phone: phone,
        cohort: cohort
    });

    Student.findOne({email: email}, (err, data) => {
        if(err) {
            return res.status(500).send({flash: 'there was an error'});
        }
        if(newStudent.email == data.email) {
            return res.status(500).send({ flash: 'this email already exists' });
        }
        //Save new Student
        newStudent.save().then(student => res.sendStatus(200))
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
    res.redirect('students/login');
});

module.exports = router;