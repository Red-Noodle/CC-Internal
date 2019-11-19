const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Student and Instructor models
const Student = require('./Student');
const Instructor = require('./Instructor');

const cohortSchema = new Schema({
    name: { type: String, required: true},
    startDate: { type: String, trim: true},
    endDate: { type: String, trim: true},
    location: {
        city: {type: String, default:""},
        state: {type: String, default:""}
    }
});

const Cohort = mongoose.model("Cohort", cohortSchema);


module.exports = Cohort;
