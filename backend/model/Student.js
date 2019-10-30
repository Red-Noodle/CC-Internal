const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;
const Cohort = requrie('./Cohort.js')

const studentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phone: String,
    cohortName: Cohort
});

const Student = mongoose.model("Student", studentSchema); 

var findStudentsByName = function (studentName, done) {
    Person.find({ name: studentName }, (err, data) => {
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