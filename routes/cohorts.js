const express = require('express');
const router = express.Router();

const Cohort = require('../models/Cohort');

router.get('/', (req, res) => {
    res.send(Cohort.find());
});

//Create Page
router.get('/create', (req, res) => {
    res.send("cohort creation page");
});

//Handle Cohort Creation
router.post('/create', (req, res) => {
    const {name, dateStart, dateEnd, students, instructors} = req.body;

    //Check required fields
    if(!name) {
        //alert("Please fill in the required fields")
    }

    //Creating a new Cohort
    const newCohort = new Cohort({
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd,
        students: students,
        instructors: instructors
    });

    //Saving new Cohort
    newCohort.save().then(cohort => res.send("success")).catch(console.log(err));
});

module.exports = router;