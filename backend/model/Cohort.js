const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Students = require('./Student.js');
const Instructors = require('./Instructor.js');

const cohortSchema = new Schema({
    name: String,
    dateStart: String,
    dateEnd: String,
    students: [Student],
    instructors: [Instructors]
});

const Cohort = mongoose.model("Cohort", cohortSchema);

var findCohortsByName = function (cohorttName, done) {
    Person.find({ name: cohortName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentById = function (cohorttId, done) {
    Person.findById(cohortId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};