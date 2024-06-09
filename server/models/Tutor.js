const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    tutorId: {
        type: String,
        required: true,
        unique: true
    },
    tutorName: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true,
        unique: true
    }, 
    tutorPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('tutors', TutorSchema);