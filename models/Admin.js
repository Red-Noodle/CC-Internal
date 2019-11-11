const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {type: String, trim: true, required: true},
        lastName: {type: String, trim: true, required: true}
    },
    email: {type: String, trim: true, required: true},
    loginKey: String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;