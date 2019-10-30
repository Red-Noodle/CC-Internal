const express = require('express');
const router = express.Router();

//Create Page
router.get('/log', (req, res) => {
    res.send("cohort creation page");
});

module.exports = router;