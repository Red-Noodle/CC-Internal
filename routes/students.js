const express = require('express');
const router = express.Router();

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
  if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    Student.find()
      .populate("cohort")
      .exec()
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
      });
    }
});

// Get a student by id
router.get('/:studentId', (req, res) => {
  if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.studentId;
    Student.findById({ _id: id })
      .populate("cohort")
      .exec()
      .then(student => {
        if (!student) {
          res.status(404).json({success: false, message: 'student not found'});
        } else {
          res.status(200).json(student);
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
      });
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
        res.status(500).json({success: false, message: 'please fill in the name and email fields'});
    } else {
        //Check to see if student exists
        Student.findOne({email: email})
        .then(student => {
            if(student) {
                res
                  .status(500)
                  .json({success: false, message: 'student already exists'});
            } else {
                //Create new Student
                const newStudent = new Student({
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


                //Save new Student
                newStudent.save()
                     .then(student => {
                         res
                           .status(200)
                           .json({success: true, message: 'student successfully registered'});
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
                console.log(err)
                return res
                  .status(500)
                  .json({success: false, message: err});
            });
    }
  }
});

//Handle Update
router.put('/:studentId', (req, res) => {
  if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.studentId;
        //Receiving data from the request body
       var {
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
    Student.updateOne({_id: id}, 
        {
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
    .then(updatedStudent => {
        if(!updatedStudent) {
            res.status(404).json({success: false, message: 'student not found'});
        } else {
            res.status(200).json({success: true, message: 'student updated'});
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

//Handle Delete
router.delete('/:studentId', (req, res) => {
  if(process.env.SWOOP_KEY == "" || !process.env.SWOOP_KEY) {
        res.sendStatus(404);
    } else {
    var id = req.params.studentId;
     //Using id provided to find one to delete
     Student.deleteOne({_id: id })
       .exec()
       .then(student => {
           if(!student) {
               res.status(404).json({success: false, message: 'student not found'});
           } else {
             return res.status(200).json({success: true, message: 'student deleted'});
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