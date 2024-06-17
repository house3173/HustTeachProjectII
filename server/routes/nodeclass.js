const express = require('express');
const router = express.Router();

const Classes = require('../models/Classes')
const NodeClass = require('../models/tutorManagement/NodeClass')


// @route GET api/nodeclass/getAllByClassId/classId
// @desc get all subjects
// @access Public
router.get('/getAllByClassId/:classId', async (req, res) => {
    const classId = req.params.classId
    try {
        const nodeClassList = await NodeClass.find({ classId: classId });
        res.json({success: true, nodeClassList});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

// @route POST api/nodeclass/addNodeClass
// @desc Add new node class
// @access Public
router.post('/addNodeClass', async (req, res) => {
    const formData = req.body

    try {
        const classCount = await NodeClass.countDocuments({classId: formData.classId});
        const nodeId = `N${String(classCount + 1).padStart(4, '0')}`;

        const nodeClass = {
            ...formData,
            nodeId,
            nodeGrade: '',
            nodeResponse: ''
        };

        const newNodeClass = new NodeClass(nodeClass);
        await newNodeClass.save()
        return res.status(200).json({success: true, message: 'New class created sucessfully', newNodeClass});

    } catch (error) {
        console.log(error);
        return res.json({success: false, message: 'Interval server error'});
    }
})


// @route PUT api/nodeclass/updateNodeClass
// @desc Add new node class
// @access Public
router.post('/updateNodeClass/:nodeId', async (req, res) => {
    const updateData = req.body;
    const nodeId = req.params.nodeId
    console.log(updateData);

    try {
        const existingNode = await NodeClass.findOne({ nodeId: nodeId });

        if (existingNode) {
            await NodeClass.updateOne({ nodeId: nodeId }, updateData);
            return res.status(200).json({ success: true, message: 'NodeClass is updated successfully' });
        } else {
            // Nếu không tìm thấy, thực hiện lưu mới
            return res.json({ success: false, message: 'NodeClass do not exist' });
        }
    } catch (error) {
        console.log('Error updating NodeClass:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/', (req,res) => res.send('NODE CLASS ROUTE'));

module.exports = router