const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorInfoSchema = new Schema({
  tutorId: { type: String, required: true, unique: true },
  tutorImage: { type: String },
  tutorFileUni: { type: String },
  tutorName: { type: String, required: true },
  tutorPhone: { type: String, required: true },
  tutorGender: { type: String, required: true },
  tutorYear: { type: String, required: true },
  tutorType: { type: String, required: true },
  tutorUni: { type: String, required: true },
  tutorMajor: { type: String, required: true },
  tutorStart: { type: String, required: true },
  tutorEnd: { type: String, required: true },
});

const TutorInfo = mongoose.model('tutorinfos', TutorInfoSchema);

module.exports = TutorInfo;
