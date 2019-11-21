const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Student and Instructor models
const Student = require('./Student');
const Instructor = require('./Instructor');

//Cohort schema defined
const cohortSchema = new Schema({
    name: { type: String, required: true},
    startDate: { type: String, trim: true},
    endDate: { type: String, trim: true},
    location: {
        city: {type: String, default:""},
        state: {type: String, default:""}
    },
    students: [{type: mongoose.Types.ObjectId, ref: "Student"}],
    instructors: [{type: mongoose.Types.ObjectId, ref: "Instructor"}]
});
//Cohort schema set to a model
const Cohort = mongoose.model("Cohort", cohortSchema);


module.exports = Cohort;
