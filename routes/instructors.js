const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Instructor = require('../models/Instructor');

//Get all instructors
router.get('/', (req, res) => {
    res.send(Instructor.find());
});

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
    const { firstname, lastname, email, address, phone, cohortName } = req.body;

    //Check required fields
    if (!firstname || !lastname || !email) {
    }

    //Create new Instructor
    const newInstructor = new Instructor({
        name: {
            firstName: firstname,
            lastName: lastname
        },
        email: email,
        address: address,
        phone: phone
    });

    //Saving Instructor
    newInstructor.save().then(student => res.status(200)).catch(err => {
        console.log(err);
        res.sendStatus(500);
        return;
    });
});

module.exports = router;