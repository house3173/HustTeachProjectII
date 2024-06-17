const express = require('express');
const router = express.Router();

const WaitRegisterClass = require('../models/tutorManagement/WaitRegisterClass')
const Classes = require('../models/Classes')
const TutorInfo = require('../models/tutorManagement/TutorInfo')
const TutorAchi = require('../models/tutorManagement/TutorAchi')


// @route POST api/waitclass/registerClass
// @desc Add new wait register  class
// @access Public
router.post('/registerClass', async (req, res) => {
    const formData = req.body
    console.log(1)

    try {
        console.log(2)
        const checkWaitClass = await WaitRegisterClass.find({ tutorId: formData.tutorId, classId: formData.classId });
        console.log(checkWaitClass)
        if(checkWaitClass.length !== 0) {
            return res.json({success: false, errorType: 1,  message: 'Gia sư đã đăng ký lớp này trứoc đó'});
        } 

        const newWaitClass = new WaitRegisterClass(formData);
        await newWaitClass.save()
        return res.status(200).json({success: true, message: 'New class created sucessfully', newWaitClass});
        
    } catch (error) {
        console.log(3)
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }

})

// @route GET api/waitclass/getAll/tutorId
// @desc get all waitClss by tutorid
// @access Public
router.get('/getAll/:tutorId', async (req, res) => {
    const tutorId = req.params.tutorId
    try {
        const tutorWaitClasses = await WaitRegisterClass.find({ tutorId: tutorId, status: { $ne: "Xác nhận" } });
        
        let listWaitClasses = [];

        if (tutorWaitClasses.length !== 0) {
            const classIds = tutorWaitClasses.map(tutorWaitClass => tutorWaitClass.classId);

            listWaitClasses = await Classes.find({ classId: { $in: classIds } });
        }

        res.json({success: true, tutorId, listWaitClasses, tutorWaitClasses});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route GET api/waitclass/getAllByClassId/:classId
// @desc get all waitClss by tutorid
// @access Public
router.get('/getAllByClassId/:classId', async (req, res) => {
    const classId = req.params.classId
    try {
        const tutorWaitClasses = await WaitRegisterClass.find({ classId: classId, status: "Đang chờ" });
        
        let tutorWaitInfo = [];
        let tutorWaitAchi = [];

        if (tutorWaitClasses.length !== 0) {
            const tutorIds = tutorWaitClasses.map(tutorWaitClass => tutorWaitClass.tutorId);

            tutorWaitInfo = await TutorInfo.find({ tutorId: { $in: tutorIds } });
            tutorWaitAchi = await TutorAchi.find({ tutorId: { $in: tutorIds } });
        }

        res.json({success: true, classId, tutorWaitClasses, tutorWaitInfo, tutorWaitAchi});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route POST api/waitclass/updateWaitClass
// @desc Add new wait register  class
// @access Public
router.post('/updateWaitClass', async (req, res) => {
    const formData = req.body

    try {
        const checkWaitClass = await WaitRegisterClass.findOne({ tutorId: formData.tutorId, classId: formData.classId });

        if(checkWaitClass) {
            await WaitRegisterClass.updateOne({ tutorId: formData.tutorId, classId: formData.classId  }, formData);
            return res.status(200).json({ success: true, message: 'Tutor achievement is updated successfully' });
        } 
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route POST api/waitclass/confirmTutor
// @desc Add new wait register  class
// @access Public
router.post('/confirmTutor', async (req, res) => {
    const {tutorId, classId} = req.body

    try {
        const listWaitClass = await WaitRegisterClass.find({ classId: classId, status: 'Đang chờ' });

        if(listWaitClass.length !== 0) {
            for (let waitClass of listWaitClass) {
                if (waitClass.tutorId === tutorId) {
                    await Classes.updateOne({classId: classId}, { classStatus: "Đang dạy", tutorId: tutorId });
                    await WaitRegisterClass.findByIdAndUpdate(waitClass._id, { status: "Xác nhận" });
                } else {
                    await WaitRegisterClass.findByIdAndUpdate(waitClass._id, { status: "Từ chối", reason: "Phụ huynh đã tìm được gia sư phù hợp" });
                }
            }
        }

        res.json({success: true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})


router.get('/', (req,res) => res.send('WAIT REGISTER CLASSES ROUTE'));

module.exports = router


