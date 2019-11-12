const express = require('express');
const router = express.Router();

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
    Student.find()
    .exec()
    .then(students => {
        res.status(200).json(students);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    });
});

// Get a student by id
router.get('/:studentId', (req, res) => {
    var id = req.params.studentId;
    Student.findById({_id: id})
    .exec()
    .then(student => {
        if(!student) {
            req.flash('error', 'student not found');
            res.status(404).send();
        } else {
            res.status(200).json(student);
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).send();
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
        req.flash('error', 'fill name and email fields');
        res.status(500).send();
    } else {
        //Check to see if student exists
        Student.findOne({email: email})
        .then(student => {
            if(student) {
                req.flash('error', 'student already exists');
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
                         req.flash('success', 'student registered');
                         res.status(200).send();
                     })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).send();
                    });

            }
        })
            .catch(err => {
                console.log(err)
                return res.status(500).send();
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
        req.flash('success', 'student updated');
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send()
    });
});

//Handle Delete
router.delete('/:studentId', (req, res) => {
     const id = req.params.adminId;
     //Using id provided to find one to delete
     Student.deleteOne({ _id: id })
       .exec()
       .then(student => {
           if(!student) {
               req.flash('error', 'student not found');
               res.status(404).send();
           } else {
             req.flash("success", "student was deleted");
             res.status(200).send();
           }
       })
       .catch(err => {
         console.log(err);
         return res.status(500);
       });
});

module.exports = router;