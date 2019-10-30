const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;
const Cohort = requrie('./Cohort')

const studentSchema = new Schema({
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true},
    address: {type: String, trim: true, default: ""},
    phone: {type: String,trim: true, default: ""},
    cohortName: {type: CohortModel, required: true}
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

module.exports.StudentModel = Student;
module.exports.findStudentById = findStudentById;
module.exports.findStudentsByName = findStudentsByName;