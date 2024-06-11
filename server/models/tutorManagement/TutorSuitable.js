const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSuitableSchema = new Schema({
    tutorId: {
        type: String,
        required: true,
        unique: true
    },
    tutorListSubject: {
        type: String,
        required: true
    },
    tutorListGrade: {
        type: String,
        required: true,
    }, 
    tutorListDistrict: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('tutorsuitables', TutorSuitableSchema);