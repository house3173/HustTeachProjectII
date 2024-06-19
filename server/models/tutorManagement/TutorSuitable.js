const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSuitableSchema = new Schema({
    tutorId: {
        type: String,
        required: true,
        unique: true
    },
    tutorListSubject: {
        type: Array
    },
    tutorListGrade: {
        type: Array
    }, 
    tutorListDistrict: {
        type: Array
    }
})

module.exports = mongoose.model('tutorsuitables', TutorSuitableSchema);