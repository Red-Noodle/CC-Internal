const express = require('express');
const router = express.Router();

const Cohort = require('../models/Cohort');

//Create Page
router.get('/log', (req, res) => {
    res.send("cohort creation page");
});

module.exports = router;