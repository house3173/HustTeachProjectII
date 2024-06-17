const express = require('express');
const router = express.Router();

const Classes = require('../models/Classes')

// @route GET api/classes/getAll
// @desc get all subjects
// @access Public
router.get('/getAll', async (req, res) => {
    try {
        const classes = await Classes.find();
        res.json({success: true, classes});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})


// @route GET api/classes/getAll
// @desc get all subjects
// @access Public
router.get('/getAll/:parentsId', async (req, res) => {
    const parentsId = req.params.parentsId
    try {
        const parentsClasses = await Classes.find({ parentsId: parentsId });
        res.json({success: true, parentsId, parentsClasses});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route GET api/classes/getAllByTutor/tutorId
// @desc get all subjects
// @access Public
router.get('/getAllByTutor/:tutorId', async (req, res) => {
    const tutorId = req.params.tutorId
    try {
        const tutorClasses = await Classes.find({ tutorId: tutorId });
        res.json({success: true, tutorId, tutorClasses});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route POST api/classes/addClass
// @desc Add new class
// @access Public
router.post('/addClass', async (req, res) => {
    const formData = req.body

    try {
        const classCount = await Classes.countDocuments({});
        const classId = `L${String(classCount + 1).padStart(4, '0')}`;

        const classData = {
            ...formData,
            classId,
            classStatus: 'Đang xử lý'
        };

        const newClass = new Classes(classData);
        await newClass.save()
        return res.status(200).json({success: true, message: 'New class created sucessfully', newClass});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }

})

router.get('/', (req,res) => res.send('CLASSES ROUTE'));

module.exports = router