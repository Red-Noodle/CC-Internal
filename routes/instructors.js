const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Instructor = require('../models/Instructor');

//Get all instructors
router.get('/', (req, res) => {
    Instructor.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.render(data);
    });
});

//Login Page
router.get('/login', (req, res) => {
    
});

//Register Page
router.get('/register', (req, res) => {
    res.send("instructor register");
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstName, lastName, email, address, phone, cohort } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    }

    //Create new Instructor
    const newInstructor = new Instructor({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        address: address,
        phone: phone,
        cohort: cohort
    });

    //Saving Instructor
    newInstructor.save()
    .then(instructor => res.sendStatus(200))
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
        return;
    });
});

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('instructors/login');
});

module.exports = router;