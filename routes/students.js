const express = require('express');
const router = express.Router();

//Student Model
const Student = require('../models/Student');

//Get all studentss
router.get('/', (req, res) => {
    Student.find({}, (err, data) => {
        if(err) {
            return res.sendStatus(500);
        }
        res.json(data);
    });
});

//Login Page
router.get('/login', (req, res) => {
    
});

//Handle Login
router.post('/login', (err, res) => {
    res.send('no such thing');
});

//Register Page
router.get('/register', (req, res) => {
    res.render('../views/register.html');
});

//Handle Register
router.post('/register', (req, res) => {
    const {firstName, lastName, email, address, phone, cohort} = req.body;
    console.log(req.body);
    //Check required fields
    if (!firstName || !lastName || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    } else {
        Student.findOne({email: email})
        .then(student => {
            if(student) {
                res.status(500).send('student already exists');
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
                newStudent.save().then(student => res.sendStatus(200))
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    });

            }
        })
            .catch(err => {
                return res.status(500).send('there was an error');
            })
    }
});

//Handle Logout
router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('students/login');
});

module.exports = router;