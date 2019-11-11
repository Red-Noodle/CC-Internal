const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {type: String, trim: true, required: true},
        lastName: {type: String, trim: true, required: true}
    },
    email: {type: String, trim: true, required: true},
    loginKey: String
});

const Admin = mongoose.model('Admin', adminSchema);

var findAdminsByEmail = function (adminEmail, done) {
    Admin.findOne({ email: adminEmail }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

module.exports = Admin;
module.exports.findAdminsByEmail = findAdminsByEmail;