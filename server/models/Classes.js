const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    classId: {
        type: String,
        required: true,
        unique: true
    },
    classStatus: {
        type: String,
        required: true,
    },
    classSubject: {
        type: String,
        required: true,
    },
    classGrade: {
        type: String,
        required: true,
    },
    classAddress: {
        addressDistrict: {
            type: String,
            required: true,
        },
        addressDetail: {
            type: String,
            required: true,
        },
    },
    classFee: {
        type: Array,
    },
    classFeeBonus: {
        type: String
    },
    classHour: {
        type: String,
        required: true,
    },
    classSession: {
        type: String,
        required: true,
    },
    classRequireDetail: {
        classRequireTypeTutor: {
            type: String,
            required: true,
        },
        classRequireGender: {
            type: String,
            required: true,
        },
        classRequireExper: {
            type: String,
            required: true,
        },
    },
    tutorId: {
        type: String,
    },
    staffId: {
        type: String,
    },
    parentsId: {
        type: String,
        required: true
    },
    classPercentFee: {
        type: String,
    },
    classTime: {
        timeMoring: {
            type: String,
        },
        timeAfternoon: {
            type: String,
        },
        timeEvening: {
            type: String,
        },
        timeDay: {
            type: String,
        },
    },
    classStudent: {
        studentGender: {
            type: String,
            required: true,
        },
        studentLevel: {
            type: String,
            required: true,
        },
        studentSchool: {
            type: String,
        },
        studentGoal: {
            type: String,
        },
        studentAddInfo: {
            type: String,
        },
    },
});

module.exports = mongoose.model('classes', ClassSchema);