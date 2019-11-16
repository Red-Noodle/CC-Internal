const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Student and Instructor models
const Student = require('./Student');
const Instructor = require('./Instructor');

const cohortSchema = new Schema({
    name: { type: String, required: true},
    dateStart: { type: String, trim: true},
    dateEnd: { type: String, trim: true},
    location: {
        city: {type: String, default:""},
        state: {type: String, default:""}
    },
    students: [{type: mongoose.Types.ObjectId, ref: 'Student'}],
    instructors: [{type: mongoose.Types.ObjectId, ref: 'Instructor'}]
});

const Cohort = mongoose.model("Cohort", cohortSchema);


module.exports = Cohort;
