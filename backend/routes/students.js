const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.send("student login");
});

//Login Page
router.get('/register', (req, res) => {
    res.send("student registerS");
});

module.exports = router;