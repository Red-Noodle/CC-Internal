const express = require('express');
const router = express.Router();

//Cohort Model
const Cohort = require('../models/Cohort');

//Get all cohorts
router.get('/', (req, res) => {
    Cohort.find()
    .populate('students')
    .populate('instructors')
    .exec()
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
});

//Get a cohort by id
router.get('/:cohortId', (req, res) => {
    var id = req.params.cohortId;
    Cohort.findById({_id: id})
    .populate('students')
    .populate('instructors')
    .exec()
    .then(cohort => {
        res.status(200).json(cohort);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
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
    } = req.body;

    //Check required fields
    if(!name) {
        res.status(500).redirect('http://localhost:3000/cohortAdd.html');
    }

    //Creating a new Cohort
    const newCohort = new Cohort({
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd,
        location: {
            city: city,
            state: state
        },
        students: students,
        instructors: instructors
    });

    //Saving new Cohort
    newCohort.save()
    .then(cohort => {
        res.status(200).redirect("http://localhost:3000/cohortAdd.html");
    })
    .catch(err => {
        console.log(err);
         return res
           .status(500)
           .redirect("http://localhost:3000/cohortAdd.html");
    });
});

//Handle updating cohort
router.post('/cohortId', (req, res) => {
    var id = req.params.cohortId;
    var {
          name,
          dateStart,
          dateEnd,
          students,
          instructors,
          city,
          state,
        } = req.body;
    Cohort.updateOne({_id: id}, 
        {
            $set: {
                name: name,
                dateStart: dateStart,
                dateEnd: dateEnd,
                location: {
                    city: city,
                    state: state
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
            res.status(404).redirect("http://localhost:3000/cohortAdd.html");
        } else {
            res.status(200).redirect("http://localhost:3000/cohortAdd.html");
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
});

//Handle deleting cohort
router.delete('/:cohortId', (req, res) => {
    var id = req.params.cohortId;
    Cohort.deleteOne({_id: id})
    .exec()
    .then(cohort => {
        if(!cohort) {
            res.status(404).json({success: false, message: 'cohort not found'});
        } else {
            res.status(200).json({success: true, message: 'cohort create'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
});

module.exports = router;