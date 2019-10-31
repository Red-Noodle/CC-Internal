const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('./Student');
const Instructor = require('./Instructor');

const cohortSchema = new Schema({
    name: { type: String, trim: true, required: true},
    dateStart: { type: String, trim: true, required: true},
    dateEnd: { type: String, trim: true, required: true},
    students: String,
    instructors: String
});

const Cohort = mongoose.model("Cohort", cohortSchema);

var findCohortsByName = function (cohortName, done) {
    Person.find({ name: cohortName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findCohortById = function (cohortId, done) {
    Person.findById(cohortId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

module.exports = Cohort;
module.exports.findCohortsByName = findCohortsByName;
module.exports.findCohortById = findCohortById;