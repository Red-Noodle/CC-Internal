const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cohort = require('./Cohort');

const studentSchema = new Schema({
    name: { firstName: {type: String, trim: true, required: true},
            lastName: {type: String, trim: true, required: true},
    },
    email: {type: String, trim: true, required: true},
    address: {
            street: {type: String, trim: true, default: ""},
            street2: {type: String, trim: true, default: ""},
            city: {type: String, trim: true, default: ""},
            state: {type: String, default:""},
            zip: {type: String, trim: true, default: ""}
    },
    phone: {type: String, trim: true, default: ""},
    cohort: { type: Schema.Types.ObjectId, ref: 'Cohort' },
    loginKey: String
});

const Student = mongoose.model("Student", studentSchema); 

var findStudentsByName = function (studentName, done) {
    Student.find({ name: studentName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentsByEmail = function (studentEmail, done) {
    Student.find({ email: studentEmail }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findStudentById = function (studentId, done) {
    Student.findById(studentId, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

var findAllStudents = function (students, dont) {
    Student.find({}, (err, data) => {
        if (err) return console.log(err);
        dont(null, data);
    });
}

module.exports = Student;
module.exports.findStudentById = findStudentById;
module.exports.findStudentsByName = findStudentsByName;
module.exports.findStudentsByEmail = findStudentsByEmail;
module.exports.findAllStudents = findAllStudents;