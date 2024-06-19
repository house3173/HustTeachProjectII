const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminId: {
        type: String,
        required: true,
        unique: true
    },
    adminName: {
        type: String
    },
    adminAuthen1: {
        type: String,
        required: true
    },
    adminAuthen2: {
        type: String,
        required: true
    },
    adminAuthen3: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('admins', AdminSchema);