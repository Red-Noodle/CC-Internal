const express = require('express');
const router = express.Router();

const Cohort = require('../models/Cohort');

router.get('/', (req, res) => {
    Cohort.find({}, (err, data) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.json(...data);
    });
});

//Create Page
router.get('/create', (req, res) => {
    
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
    newCohort.save()
    .then(cohort => res.sendStatus(200))
    .catch(console.log(err));
    res.sendStatus(500);
    return;
});

module.exports = router;