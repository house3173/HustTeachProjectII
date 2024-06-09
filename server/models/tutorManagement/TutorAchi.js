const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorAchiSchema = new Schema({
  tutorId: { type: String, required: true, unique: true },
  tutorAchi1: {type: String},
  tutorAchi2: {type: String},
  tutorAchi3: {type: String},
  tutorAchi4: {type: String},
  tutorAchi5: {type: String},
  tutorAchi6: {type: String},
  tutorAchi7: {type: String},
  tutorAchi8: {type: String},
});

const TutorAchi = mongoose.model('tutorachis', TutorAchiSchema);

module.exports = TutorAchi;
