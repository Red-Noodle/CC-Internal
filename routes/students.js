const express = require('express');
const router = express.Router();

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
    Student.find()
      .populate("cohort")
      .exec()
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.log(err);
        return res.status(500);
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
          req.flash("error", "student not found");
          res.status(404).redirect('http://localhost:3000/studentAdd.html');
        } else {
          res.status(200).json(student);
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500);
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
        req.flash('error', 'fill name and email fields');
        res.status(500).redirect("http://localhost:3000/studentAdd.html");
    } else {
        //Check to see if student exists
        Student.findOne({email: email})
        .then(student => {
            if(student) {
                req.flash('error', 'student already exists');
                res
                  .status(500)
                  .redirect("http://localhost:3000/studentAdd.html");
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
                         res
                           .status(200)
                           .redirect("http://localhost:3000/studentAdd.html");
                     })
                    .catch(err => {
                        console.log(err);
                        return res
                          .status(500)
                          .redirect("http://localhost:3000/studentAdd.html");
                    });

            }
        })
            .catch(err => {
                console.log(err)
                return res
                  .status(500)
                  .redirect("http://localhost:3000/studentAdd.html");
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
        console.log(req.body);
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
            req.flash('error', 'admin not found');
            res.status(404).redirect("http://localhost:3000/studentAdd.html");
        } else {
            console.log(updatedStudent);
            req.flash('success', 'student updated');
            res.status(200).redirect("http://localhost:3000/studentAdd.html");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).redirect("http://localhost:3000/studentAdd.html");
    });
});

//Handle Delete
router.delete('/:studentId', (req, res) => {
    var id = req.params.studentId;
     //Using id provided to find one to delete
     Student.deleteOne({ _id: id })
       .exec()
       .then(student => {
           if(!student) {
               req.flash('error', 'student not found');
               res.status(404).redirect("http://localhost:3000/studentAdd.html");
           } else {
             req.flash("success", "student was deleted");
             return res.status(200).redirect("http://localhost:3000/studentAdd.html");
           }
       })
       .catch(err => {
         console.log(err);
         return res
           .status(500)
           .redirect("http://localhost:3000/studentAdd.html");
       });
});

module.exports = router;