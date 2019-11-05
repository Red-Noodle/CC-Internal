const express = require('express');
const router = express.Router();

const Instructor = require('../models/Admin');

//Get all instructors
router.get('/', (req, res) => {
    res.send(Admin.find());
});

//Login Page
router.get('/login', (req, res) => {
    res.send("admin login");
});

//Register Page
router.get('/register', (req, res) => {
    res.send("admin register");
});

//Handle Register
router.post('/register', (req, res) => {
    const { firstname, lastname, email } = req.body;

    //Check required fields
    if (!firstname || !lastname || !email) {
    }

    //Create new Instructor
    const newAdmin = new Admin({
        name: {
            firstName: firstname,
            lastName: lastname
        },
        email: email,
    });

    //Saving Instructor
    newAdmin.save()
    .then(admin => res.status(200))
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
        return;
    });
});

module.exports = router;