const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.send("instructor login");
});

//Register Page
router.get('/register', (req, res) => {
    res.send("instructor register");
});

//Handle Register
router.post('/register', (req, res) => {
    const { name, email, password, address, phone, cohortName } = req.body;
    const errors = [];

    //Check required fields
    if (!name || !email || !password || !cohortName) {
        errors.push({ msg: "Please fill in all of the required fields" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password must be 6 characters long" });
    }
});

module.exports = router;