const express = require('express');
const router = express.Router();

//Cohort Model
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
        return res.status(500).json({success: false, message: err});
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
        return res.status(500).json({success: false, message: err});
    });
})

//Create Page
router.get('/create', (req, res) => {
    
});

//Handle Cohort Creation
router.post('/create', (req, res) => {
    var {
      name,
      startDate,
      endDate,
      city,
      state,
    } = req.body;

    //Check required fields
    if(!name) {
        res.status(500).json({success: false, message: 'please enter a name'});
    }

    //Creating a new Cohort
    const newCohort = new Cohort({
        name: name,
        startDate: startDate,
        endDate: endDate,
        location: {
            city: city,
            state: state
        }
    });

    //Saving new Cohort
    newCohort.save()
    .then(cohort => {
        res.status(200).json({success: true, message: 'cohort created'});
    })
    .catch(err => {
        console.log(err);
         return res
           .status(500)
           .json({success: false, message: err});
    });
});

//Handle updating cohort
router.put('/:cohortId', (req, res) => {
    var id = req.params.cohortId;
    var {
          name,
          startDate,
          endDate,
          city,
          state,
        } = req.body;
    Cohort.updateOne({_id: id}, 
        {
            $set: {
                name: name,
                startDate: startDate,
                endDate: endDate,
                location: {
                    city: city,
                    state: state
                }
            }
        },
      { upsert: true }
    )
    .exec()
    .then(updatedCohort => {
        if(!updatedCohort) {
            res.status(404).json({success: false, message: 'cohort not found'});
        } else {
            res.status(200).json({success: true, message: 'cohort updated'});
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
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
            res.status(200).json({success: true, message: 'cohort deleted'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({success: false, message: err});
    });
});

module.exports = router;