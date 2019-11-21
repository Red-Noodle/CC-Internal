const express = require('express');
const router = express.Router();

//Instructor Model
const Instructor = require('../models/Instructor');

//Get all instructors
router.get('/', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    Instructor.find()
    .populate('cohort')
    .exec()
    .then(instructors => {
        res.status(200).json(instructors);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({succes: false, message: err});
    });
}
});

//Get instructor by id
router.get('/:instructorId', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.instructorId;
    Instructor.findById({_id: id})
    .populate('cohort')
    .exec()
    .then(instructor => {
        if(!instructor) {
            res.status(400).json({success: false, message: 'instrutor not found'});
        }else {
            res.status(200).json(instructor);
        }
    })
    .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({success: false, message: err});
    });
}
});

//Login Page
router.get('/login', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
        //do stuff
    }
   
});

//Register Page
router.get('/register', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
        //do stuff
    }
});

//Handle Register
router.post('/register', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
        const {
          firstName,
          lastName,
          email,
          street,
          city,
          state,
          zip,
          phone,
          cohort
        } = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        res.status(500).json({success: false, message: 'please fill in name and email fields'});
    } else {
        Instructor.findOne({email: email})
        .then(instructor => {
            if(instructor) {
                //Instructor exists
                res
                  .status(500)
                  .json({sucess: false, message: 'instructor already exists'});
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
                        res
                          .status(200)
                          .json({success: true, message: 'instructor registered'});
                    })
                    .catch(err => {
                        console.log(err);
                        return res
                          .status(500)
                          .json({success: false, message: err});
                    });
            }
        })
            .catch(err => {
                console.log(err);
                res
                  .status(500)
                  .json({success: false, message: err});
            });
    }
}
});

//Handle updating instructor
router.put('/:instructorId', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.instructorId;
    //Receivingn data from the request body
        const {
          firstName,
          lastName,
          email,
          street,
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
            res
              .status(404)
              .json({success: false, message: 'instructor not found'});
        } else {
            res
              .status(200)
              .json({success: true, message: 'instructor updated'});
        }
    })
    .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({success: false, message: 'something went wrong'});
    });
}
});

//Handle deleting instructor
router.delete('/:instructorId', (req, res) => {
    if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.instructorId;
    Instructor.deleteOne({_id: id})
    .exec()
    .then(instructor => {
        if(!instructor) {
            res
              .status(404)
              .json({success: false, message: 'instructor not found'});
        } else {
            res
              .status(200)
              .json({success: true, message: 'instructor deleted'});
        }
    })
    .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({success: false, message: err});
    });
}
});

module.exports = router;