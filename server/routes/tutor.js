const express = require('express');
const router = express.Router();

const Tutor = require('../models/Tutor');
const TutorInfo = require('../models/tutorManagement/TutorInfo');
const TutorAchi = require('../models/tutorManagement/TutorAchi');

// @route POST api/tutor/register
// @desc Register tutor
// @access Public
router.post('/register', async (req, res) => {
    const {tutorName, tutorEmail, tutorPassword} = req.body;

    // Simple validation
    if(!tutorName || !tutorEmail || !tutorPassword) 
        return res
            .status(400)
            .json({ success: false, message: 'Missing tutorName and/or tutorEmail and/or tutorPassword'})

    try {
        // Check for existing tutor
        const tutor = await Tutor.findOne({tutorEmail})

        if(tutor) 
            return res.status(400).json({success: false, message: 'TutorEmail already valid'})

        // All good
        const tutorCount = await Tutor.countDocuments({});
        const tutorId = `GS${String(tutorCount + 1).padStart(4, '0')}`;
        const newTutor = new Tutor({tutorId, tutorName, tutorEmail, tutorPassword});
        
        await newTutor.save()
        return res.status(200).json({success: true, message: 'Tutor account created sucessfully'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route POST api/tutor/login
// @desc Login tutor
// @access Public
router.post('/login', async (req, res) => {
    const {tutorEmail, tutorPassword} = req.body;

    // Simple validation
    if(!tutorEmail || !tutorPassword) 
        return res
            .status(400)
            .json({ success: false, message: 'Missing email and/or password'})
    try {
        const tutor = await Tutor.findOne({tutorEmail})

        if(!tutor) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        if(tutorPassword !== tutor.tutorPassword) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        // all check
        return res
                .status(200)
                .json({
                    success: true, 
                    message: 'Loggin sucessfully', 
                    tutorCurr: {
                        "tutorId": tutor.tutorId,
                        "tutorName": tutor.tutorName,
                        "tutorEmail": tutor.tutorEmail,
                        "tutorPassword": tutor.tutorPassword                        
                    }
                });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route POST api/tutor/saveInfo
// @desc Tutor save info
// @access Public
router.post('/saveInfo', async (req, res) => {
    const tutorInfo = req.body;

    try {
        const existingTutorInfo = await TutorInfo.findOne({ tutorId: tutorInfo.tutorId });

        if (existingTutorInfo) {
            // Nếu tìm thấy, thực hiện cập nhật
            await TutorInfo.updateOne({ tutorId: tutorInfo.tutorId }, tutorInfo);
            return res.status(200).json({ success: true, message: 'Tutor basic info is updated successfully' });
        } else {
            // Nếu không tìm thấy, thực hiện lưu mới
            const newTutorInfo = new TutorInfo(tutorInfo);
            await newTutorInfo.save();
            return res.status(200).json({ success: true, message: 'Tutor basic info is saved successfully' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// @route POST api/tutor/getInfo
// @desc Tutor get info
// @access Public
router.post('/getInfo', async (req, res) => {
    const tutor = req.body
    try {
        const existingTutorInfo = await TutorInfo.findOne({ tutorId: tutor.tutorId });
        if(existingTutorInfo) {
            res.json({success: true, message: "Get info suceesfull", existingTutorInfo})
        } else {
            res.json({success: false, message: "Not exist info"})
        }
    } catch (error) {
        res.json({success: false, message: "Interval server error"})
    }
})

// @route POST api/tutor/saveAchievement
// @desc Tutor save info
// @access Public
router.post('/saveAchievement', async (req, res) => {
    const tutorAchi = req.body;

    try {
        const existingTutorAchi = await TutorAchi.findOne({ tutorId: tutorAchi.tutorId });

        if (existingTutorAchi) {
            // Nếu tìm thấy, thực hiện cập nhật
            await TutorAchi.updateOne({ tutorId: tutorAchi.tutorId }, tutorAchi);
            return res.status(200).json({ success: true, message: 'Tutor achievement is updated successfully' });
        } else {
            // Nếu không tìm thấy, thực hiện lưu mới
            const newTutorAchi = new TutorAchi(tutorAchi);
            await newTutorAchi.save();
            return res.status(200).json({ success: true, message: 'Tutor achievement is saved successfully' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// @route POST api/tutor/getAchievement
// @desc Tutor get info
// @access Public
router.post('/getAchievement', async (req, res) => {
    const tutor = req.body
    try {
        const existingTutorAchi = await TutorAchi.findOne({ tutorId: tutor.tutorId });
        if(existingTutorAchi) {
            res.json({success: true, message: "Get Achievement suceesfull", existingTutorAchi})
        } else {
            res.json({success: false, message: "Not exist Achievement"})
        }
    } catch (error) {
        res.json({success: false, message: "Interval server error"})
    }
})

router.get('/', (req,res) => res.send('TUTOR ROUTE'));

module.exports = router