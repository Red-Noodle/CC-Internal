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
        return res.status(500).send();
    });
});

//Get instructor by id
router.get('/:instructorId', (req, res) => {
    var id = req.params.instructorId;
    Instructor.findById({_id: id})
    .exec()
    .then(instructor => {
        if(!instructor) {
            req.flash('error', 'instructor not found');
            res.status(400).send();
        }else {
            res.status(200).json(instructor);
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
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
        const {
          firstName,
          lastName,
          email,
          street,
          street2,
          city,
          state,
          zip,
          phone,
          cohort
        } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        return req.flash('error', 'fill in name and email fields');
    } else {
        Instructor.findOne({email: email})
        .then(instructor => {
            if(instructor) {
                //Instructor exists
                return req.flash('error', 'instructor already exists');
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
                        req.flash('success', 'instructor registered');
                        res.status(200).send();
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send();
                    });
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).send();
            });
    }
});

//Handle updating instructor
router.patch('/:instructorId', (req, res) => {
    var id = req.params.instructorId;
    //Receivingn data from the request body
        const {
          firstName,
          lastName,
          email,
          street,
          street2,
          city,
          state,
          zip,
          phone,
          cohort
        } = req.body;
        //Finding one to update
    Instructor.updateOne({_id: id}, {
            $set: {
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
            }
        },
        {upsert: true, multi: true}
    )
    .exec()
    .then(updatedInstructor => {
        if(!updatedInstructor) {
            req.flash('instructor not found');
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    });
});

//Handle deleting instructor
router.delete('/:instructorId', (req, res) => {
    var id = req.params.instructorId;
    Instructor.delete({_id: id})
    .exec()
    .then(instructor => {
        if(!instructor) {
            req.flash('error', 'instructor not found');
            res.status(404).send();
        } else {
            req.flash('success', 'instructor deleted');
            res.status(200).send();
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    });
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
});

module.exports = router;