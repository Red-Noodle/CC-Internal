const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cohort = require('./Cohort')

const studentSchema = new Schema({
    name: { firstName: {type: String, trim: true},
            lastName: {type: String, trim: true}
    },
    email: {type: String, trim: true},
    password: {type: String, trim: true},
    address: {type: String, trim: true, default: ""},
    phone: {type: String,trim: true, default: ""},
    cohortName: String
});

const Student = mongoose.model("Student", studentSchema); 

var findStudentsByName = function (studentName, done) {
    Person.find({ name: studentName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentsByEmail = function (studentEmail, done) {
    Person.find({ email: studentEmail }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentById = function (studentId, done) {
    Person.findById(studentId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

module.exports = Student;
module.exports.findStudentById = findStudentById;
module.exports.findStudentsByName = findStudentsByName;
module.exports.findStudentsByEmail = findStudentsByEmail;