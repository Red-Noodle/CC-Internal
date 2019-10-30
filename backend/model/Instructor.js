const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;
const Cohort = require('./Cohort')

const instructorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {type: String, default: ""},
    phone: {type: String, default: ""},
    cohortName: {type: CohortModel, required: true}
});

var Instructor = mongoose.model("Instructor", instructorSchema);

var findInstructorsByName = function (instructorName, done) {
    Person.find({ name: instructorName }, (err, data) => {
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

module.exports.InstructorModel = Instructor;
module.exports.findInstructorsByName = findInstructorsByName;
module.exports.findInstructorsById = findInstructorsById;