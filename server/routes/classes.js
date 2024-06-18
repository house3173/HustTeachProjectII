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

// @route GET api/classes/getAllByStaff/staffId
// @desc get all subjects
// @access Public
router.get('/getAllByStaff/:staffId', async (req, res) => {
    const staffId = req.params.staffId
    try {
        const staffClasses = await Classes.find({ staffId: staffId });
        res.json({success: true, staffId, staffClasses});
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
        const classes = await Classes.find({}, 'classId').exec();
    
        let maxId = 0;
        classes.forEach(classObj => {
            const num = parseInt(classObj.classId.slice(1), 10); // Lấy phần số phía sau
            if (num > maxId) {
                maxId = num;
            }
        });

        const newIdNumber = maxId + 1;
        const classId = `L${String(newIdNumber).padStart(4, '0')}`;;

        let classData
        if(formData.staffId !== '') {
            classData = {
                ...formData,
                classId,
                classStatus: 'Đang tìm gia sư'
            }
        } else {
            classData = {
                ...formData,
                classId,
                classStatus: 'Đang xử lý'
            }
        }
        

        const newClass = new Classes(classData);
        await newClass.save()
        return res.status(200).json({success: true, message: 'New class created sucessfully', newClass});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})


// @route POST api/classes/updateClass
// @desc Add new wait register  class
// @access Public
router.post('/updateClass', async (req, res) => {
    const updateData = req.body;

    try {
        const updatedClass = await Classes.findOneAndUpdate(
            { classId: updateData.classId }, updateData, { new: true } 
        );

        if (updatedClass) {
            return res.status(200).json({ success: true, message: 'Class tutor is updated successfully', updatedClass });
        } else {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.get('/test', async (req, res) => {
    try {
        const classes = await Classes.find({}, 'classId').exec();
    
        // Trích xuất và tìm giá trị lớn nhất của phần số phía sau
        let maxId = 0;
        classes.forEach(classObj => {
            const num = parseInt(classObj.classId.slice(1), 10); // Lấy phần số phía sau
            if (num > maxId) {
                maxId = num;
            }
        });

        // Tạo classId mới
        const newIdNumber = maxId + 1;
        const newClassId = `L${String(newIdNumber).padStart(4, '0')}`;
        res.json({newClassId})
    } catch (error) { 
    }
}) 

router.get('/', (req,res) => res.send('CLASSES ROUTE'));

module.exports = router