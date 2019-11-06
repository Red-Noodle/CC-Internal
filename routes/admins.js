const express = require('express');
const router = express.Router();

const Instructor = require('../models/Admin');

//Get all Admins
router.get('/', (req, res) => {

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
    const { firstName, lastName, email } = req.body;

    //Check required fields
    if (!firstname || !lastname || !email) {
        return res.status(500).send({
            status: 500,
            data: 'Please make sure name and email are filled out'
        });
    }

    //Create new Admin
    const newAdmin = new Admin({
        name: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
    });

    //Saving Admin
    newAdmin.save()
    .then(admin => res.sendStatus(200))
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
        return;
    });
});

module.exports = router;