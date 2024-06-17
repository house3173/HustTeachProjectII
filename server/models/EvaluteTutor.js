const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluteTutorSchema = new Schema({
    tutorId: {
        type: String,
        required: true
    },
    parentsId: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true,
        unique: true
    },
    tutorGrade: {
        type: String,
        required: true
    },
    feedBack: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('evalutetutors', EvaluteTutorSchema);