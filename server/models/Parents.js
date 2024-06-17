const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentsSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
        unique: true
    },
    parentsName: {
        type: String,
        required: true
    },
    parentsEmail: {
        type: String,
        required: true,
        unique: true
    }, 
    parentsPassword: {
        type: String,
        required: true
    },
    parentsPhone: {
        type: String
    }
})

module.exports = mongoose.model('parentsses', ParentsSchema);