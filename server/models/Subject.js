const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    SubjectId: {
        type: Number,
        required: true,
        unique: true
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectFee: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('subjects', SubjectSchema);