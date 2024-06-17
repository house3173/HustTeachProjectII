const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeClassSchema = new Schema({
    nodeId: {
        type: String,
        required: true,
    },
    classId: {
        type: String,
        required: true,
    },
    nodeDate: {
        type: Date,
        required: true
    },
    nodeTime: {
        type: String,
        required: true,
    }, 
    nodeTopic: {
        type: String,
        required: true
    },
    nodeComment: {
        type: String,
        required: true
    },
    nodeGrade: {
        type: String,
    },
    nodeResponse: {
        type: String
    }
})

module.exports = mongoose.model('nodeclasses', NodeClassSchema);