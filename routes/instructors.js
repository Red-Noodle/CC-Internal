const express = require('express');
const router = express.Router();

const Instructor = require('../models/Instructor');

//Get all instructors
router.get('/', (req, res) => {
    Instructor.find()
    .exec()
    .then(instructors => {
        res.status(200).json(instructors);
    })
    .catch(err => {
        console.log(err);
        return res.status(500);
    });
});

//Get instructor by id
router.get('/:instructorId', (req, res) => {
    var id = req.params.instructorId;
    Instructor.findById({_id: id})
    .exec()
    .then(instructor => {
        res.status(200).json(instructor);
    })
    .catch(err => {
        console.log(err);
        return res.status(500);
    });
});

//Login Page
router.get('/login', (req, res) => {
   
});

//Register Page
router.get('/register', (req, res) => {
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstName, lastName, email, street, street2, city, state, zip, phone, cohort } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        return req.flash({error: 'please fill in name and email fields'});
    } else {
        Instructor.findOne({email: email})
        .then(instructor => {
            if(instructor) {
                //Instructor exists
                return req.flash({error: 'instructor already exists'});
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
                        //Success
                        req.flash({success: 'instructor registered'});
                    })
                    .catch(err => {
                        return req.flash({error: err});
                    });
            }
        })
            .catch(err => {
                return req.flash({error: err});
            });
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
});

module.exports = router;