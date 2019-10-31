const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cohort = require('./Cohort')

const instructorSchema = new Schema({
    name: {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true }
    },
    email: { type: String, trim: true, required: true },
    password: {type: String, trim: true, required: true},
    address: { type: String, trim: true, default: ""},
    phone: { type: String, trim: true, default: ""},
    cohortName: String
});

var Instructor = mongoose.model("Instructor", instructorSchema);

var findInstructorsByName = function (instructorName, done) {
    Person.find({ name: instructorName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentsByEmail = function (instructorEmail, done) {
    Person.find({ email: instructorEmail }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findInstructorsById = function (instructorId, done) {
    Person.findById(instructorId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

module.exports = Instructor;
module.exports.findInstructorsByName = findInstructorsByName;
module.exports.findInstructorsById = findInstructorsById;