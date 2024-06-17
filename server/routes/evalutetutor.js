const express = require('express');
const router = express.Router();

const Classes = require('../models/Classes')
const Parents = require('../models/Parents')
const EvaluteTutor = require('../models/EvaluteTutor')

// @route POST api/evalutetutor/addEvalute
// @desc Add new wait register  class
// @access Public
router.post('/addEvalute', async (req, res) => {
    const evaluteData = req.body

    try {
        const existEvalute = await EvaluteTutor.findOne({ classId: evaluteData.classId });

        if (existEvalute) {
            await EvaluteTutor.updateOne({ classId: evaluteData.classId }, evaluteData);
            return res.status(200).json({ success: true, message: 'Evalute tutor is updated successfully', evaluteData});
        } else {
            const newEvaluteTutor = new EvaluteTutor(evaluteData);
            await newEvaluteTutor.save();
            return res.status(200).json({ success: true, message: 'Evalute is saved successfully', evaluteData});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route GET api/evalutetutor/getEvalute
// @desc get all waitClss by tutorid
// @access Public
router.get('/getEvalute/:classId', async (req, res) => {
    const classId = req.params.classId
    try {
        const evaluteTutorList = await EvaluteTutor.find({ classId: classId });

        if(evaluteTutorList.length === 0) {
            res.json({success: false, message: 'No have evaluteTutor', type: 'none'})
        } else {
            const evaluteTutor = evaluteTutorList[0];
            res.json({success: true, message: 'Get evalute tutor successfull', evaluteTutor})
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route GET api/evalutetutor/getEvalute
// @desc get all waitClss by tutorid
// @access Public
router.get('/getEvaluteByTutorId/:tutorId', async (req, res) => {
    const tutorId = req.params.tutorId
    try {
        const evaluteTutorList = await EvaluteTutor.find({ tutorId: tutorId });

        const evaluteTutorListWithParents = await Promise.all(evaluteTutorList.map(async (evaluteTutor) => {
            const parent = await Parents.findOne({ parentsId: evaluteTutor.parentsId });
            const evaluteTutorWithParent = {
                ...evaluteTutor.toObject(),  
                parentsName: parent ? parent.parentsName : null
            };
            return evaluteTutorWithParent;
        }));

        res.status(200).json({success: true, message: 'Get evalute of Tutor successfull', evaluteTutorListWithParents})

    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

router.get('/', (req,res) => res.send('WAIT REGISTER CLASSES ROUTE'));

module.exports = router


