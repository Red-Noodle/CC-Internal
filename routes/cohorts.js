const express = require('express');
const router = express.Router();

const Cohort = require('../models/Cohort');

router.get('/', (req, res) => {
    Cohort.find({}, (err, data) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.json(data);
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
        return req.flash({error: 'user already exists'});
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
    .then(cohort => req.flash({success: 'cohort created'}))
    .catch(err => {
    return req.flash({error: err})
    });
});

module.exports = router;