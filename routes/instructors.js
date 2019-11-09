const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Instructor = require('../models/Instructor');
const findInstructorsByEmail = require('../models/Instructor').findInstructorsByEmail;

//Get all instructors
router.get('/', (req, res) => {
    Instructor.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.json(data);
    });
});

//Login Page
router.get('/login', (req, res) => {
    res.send('no such thing');
});

//Register Page
router.get('/register', (req, res) => {
    res.render("../views/register.html");
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstName, lastName, email, street, street2, city, state, zip, phone, cohort } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        return res.status(500).send({
            flash: 'please fill in all of the required fields'
        });
    } else {
        Instructor.findOne({email: email})
        .then(instructor => {
            if(instructor) {
                res.status(500).send('instructor already exists');
            } else {
                //Create new Instructor
                const newInstructor = new Instructor({
                    name: {
                        firstName: firstName,
                        lastName: lastName
                    },
                    email: email,
                    address: {
                        street: street,
                        street2: street2,
                        city: city,
                        state: state,
                        zip: zip
                    },
                    phone: phone,
                    cohort: cohort
                });


                //Saving Instructor
                newInstructor.save()
                    .then(instructor => {
                        return res.status(200).send({ flash: 'Account created' })
                    })
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
    res.redirect('instructors/login');
});

module.exports = router;