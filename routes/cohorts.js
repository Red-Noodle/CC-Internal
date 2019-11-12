const express = require('express');
const router = express.Router();

const Cohort = require('../models/Cohort');

//Get all cohorts
router.get('/', (req, res) => {
    Cohort.find()
    .exec()
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    });
});

//Get a cohort by id
router.get('/:cohortId', (req, res) => {
    var id = req.params.cohortId;
    Cohort.findById({_id: id})
    .exec()
    .then(cohort => {
        res.status(200).json(cohort);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    });
})

//Create Page
router.get('/create', (req, res) => {
    
});

//Handle Cohort Creation
router.post('/create', (req, res) => {
    var {
      name,
      dateStart,
      dateEnd,
      students,
      instructors,
      city,
      state,
      country
    } = req.body;

    //Check required fields
    if(!name) {
        req.flash('error', 'please fill in the name field');
        res.status(500).send();
    }

    //Creating a new Cohort
    const newCohort = new Cohort({
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd,
        address: {
            city: city,
            state: state,
            country: country
        },
        students: students,
        instructors: instructors
    });

    //Saving new Cohort
    newCohort.save()
    .then(cohort => {
        req.flash('success', 'cohort created');
        res.status(200).send();
    })
    .catch(err => {
        console.log(err);
         return res.status(500).send();
    });
});

//Handle updating cohort
router.patch('/cohortId', (req, res) => {
    var id = req.params.cohortId;
    var {
          name,
          dateStart,
          dateEnd,
          students,
          instructors,
          city,
          state,
          country
        } = req.body;
    Cohort.updateOne({_id: id}, 
        {
            $set: {
                name: name,
                dateStart: dateStart,
                dateEnd: dateEnd,
                address: {
                    city: city,
                    state: state,
                    country: country
                },
                students: students,
                instructors: instructors
            }
        },
      { upsert: true, multi: true }
    )
    .exec()
    .then(updatedCohort => {
        if(!updatedCohort) {
            req.flash('error', 'cohort not found')
            res.status(400).send();
        } else {
            req.flash('success', 'cohort updated');
            res.status(200).send();
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).send();
    });
});

//Handle deleting cohort
router.delete('/:cohortId', (req, res) => {
    var id = req.params.cohortId;
    Cohort.deleteOne({_id: id})
    .exec()
    .then(cohort => {
        if(!cohort) {
            req.flash('error', 'cohort not found');
            res.status(404).send();
        } else {
            req.flash('success', 'cohort was deleted');
            res.status(200).send();
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send()
    });
});

module.exports = router;