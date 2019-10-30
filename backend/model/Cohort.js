const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Students = require('./Student');
const Instructors = require('./Instructor');

const cohortSchema = new Schema({
    name: { type: String, trim: true, required: true},
    dateStart: { type: String, trim: true, required: true},
    dateEnd: { type: String, trim: true, required: true},
    students: [Student.model],
    instructors: [Instructor.model]
});

const Cohort = mongoose.model("Cohort", cohortSchema);

var findCohortsByName = function (cohorttName, done) {
    Person.find({ name: cohortName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findCohortById = function (cohorttId, done) {
    Person.findById(cohortId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

module.exports.CohortModel = Cohort;
module.exports.findCohortsByName = findCohortsByName;
module.exports.findCohortById = findCohortById;