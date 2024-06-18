const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    staffId: {
        type: String,
        required: true,
        unique: true
    },
    staffName: {
        type: String,
        required: true
    },
    staffPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('staffs', StaffSchema);