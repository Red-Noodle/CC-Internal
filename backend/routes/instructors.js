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

module.exports = router;