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
        res.status(500);
    });
});

// Get a student by id
router.get('/:studentId', (req, res) => {
    var id = req.params.studentId;
    Student.findById({_id: id})
    .exec()
    .then(student => {
        if(!student) {
            req.flash('error', 'student doesn\' exist');
            res.status(404);
        } else {
            res.status(200).json(student);
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500);
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
    const {firstName, lastName, email, address, phone, cohort} = req.body;

    //Check required fields
    if (!firstName || !lastName || !email) {
        req.flash({ error: "please fill in all of the name and email fields" });
        res.status(500);
    } else {
        Student.findOne({email: email})
        .then(student => {
            if(student) {
                req.flash({error: 'student already exists'});
            } else {
                //Create new Student
                const newStudent = new Student({
                    name: {
                        firstName: firstName,
                        lastName: lastName
                    },
                    email: email,
                    address: address,
                    phone: phone,
                    cohort: cohort
                });


                //Save new Student
                newStudent.save()
                     .then(student => req.flash({success: 'student registered'}))
                    .catch(err => {
                        console.log(err);
                        return res.status(500);
                    });

            }
        })
            .catch(err => {
                console.log(err)
                return res.status(500);
            })
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
});

module.exports = router;