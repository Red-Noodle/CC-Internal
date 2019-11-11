const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('./Student');
const Instructor = require('./Instructor');

const cohortSchema = new Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    dateStart: { type: String, trim: true},
    dateEnd: { type: String, trim: true},
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    instructors: [{type: Schema.Types.ObjectId, ref: 'Instructor'}]
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