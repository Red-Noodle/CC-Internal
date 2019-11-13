const express = require('express');
const router = express.Router();

//Instructor Model
const Instructor = require('../models/Instructor');

//Get all instructors
router.get('/', (req, res) => {
    Instructor.find()
    .populate('cohort', 'name')
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
    .populate('cohort')
    .exec()
    .then(instructor => {
        if(!instructor) {
            req.flash('error', 'instructor not found');
            res.status(400);
        }else {
            res.status(200).json(instructor);
        }
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
router.post('/instructor/register', (req, res) => {
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
        req.flash('error', 'fill in name and email fields');
        res.status(500).redirect('localhost:3000/instructorAdd.html');
    } else {
        Instructor.findOne({email: email})
        .then(instructor => {
            if(instructor) {
                //Instructor exists
                req.flash('error', 'instructor already exists');
                res.status(500).redirect("localhost:3000/instructorAdd.html");
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
                        res
                          .status(200)
                          .redirect("localhost:3000/instructorAdd.html");
                    })
                    .catch(err => {
                        console.log(err);
                        return res
                          .status(500)
                          .redirect("localhost:3000/instructorAdd.html");
                    });
            }
        })
            .catch(err => {
                console.log(err);
                res.status(500).redirect("localhost:3000/instructorAdd.html");
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
            res.status(404).redirect("localhost:3000/instructorAdd.html");
        } else {
            req.flash('success', 'instructor deleted');
            res.status(200).redirect("localhost:3000/instructorAdd.html");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).redirect("localhost:3000/instructorAdd.html");
    });
});

//Handle deleting instructor
router.delete('/:instructorId', (req, res) => {
    var id = req.params.instructorId;
    Instructor.deleteOne({_id: id})
    .exec()
    .then(instructor => {
        if(!instructor) {
            req.flash('error', 'instructor not found');
            res.status(404).redirect("localhost:3000/instructorAdd.html");
        } else {
            req.flash('success', 'instructor deleted');
            res.status(200).redirect("localhost:3000/instructorAdd.html");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).redirect("localhost:3000/instructorAdd.html");
    });
});

module.exports = router;