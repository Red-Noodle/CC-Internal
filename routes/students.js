const express = require('express');
const router = express.Router();

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
  var key = req.headers.key;
    Student.find()
      .populate("cohort")
      .exec()
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
      });
});

// Get a student by id
router.get('/:studentId', (req, res) => {
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
        return res.status(500).json({error: err});
      });
});

//Handle Register
router.post('/student/register', (req, res) => {
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
        res.status(500).json({success: false, message: 'fill name and email fields'});
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
                        street2: street2,
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
                           .json({success: true, message: 'student registered'});
                     })
                    .catch(err => {
                        console.log(err);
                        return res
                          .status(500)
                          .json({error: err});
                    });

            }
        })
            .catch(err => {
                console.log(err)
                return res
                  .status(500)
                  .json({error: err});
            })
    }
});

//Handle Update
router.patch('/:studentId', (req, res) => {
    var id = req.params.studentId;
        //Receiving data from the request body
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
    .then(updatedStudent => {
        if(!updatedStudent) {
            res.status(404).json({success: false, message: 'student not found'});
        } else {
            console.log(updatedStudent);
            res.status(200).json({success: true, message: 'student registered'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
});

//Handle Delete
router.delete('/:studentEmail', (req, res) => {
    var email = req.params.studentEmail;
     //Using id provided to find one to delete
     Student.deleteOne({ email: email })
       .exec()
       .then(student => {
           if(!student) {
               res.status(404).json({success: false, message: 'student not found'});
           } else {
             return res.status(200).json({success: true, message: 'student was deleted'});
           }
       })
       .catch(err => {
         console.log(err);
         return res
           .status(500)
           .json({error: err});
       });
});

module.exports = router;