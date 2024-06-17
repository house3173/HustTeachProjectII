const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaitRegisterClassSchema = new Schema({
    tutorId: {
        type: String,
        required: true,
    },
    classId: {
        type: String,
        required: true
    },
    parentsId: {
        type: String,
        required: true,
    }, 
    timeFree: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
    }, 
    reason: {
        type: String,
    }, 
})

module.exports = mongoose.model('waitregisterclasses', WaitRegisterClassSchema);