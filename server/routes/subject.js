const express = require('express');
const router = express.Router();

const Subject = require('../models/Subject');

// @route GET api/subject/getAll
// @desc get all subjects
// @access Public
router.get('/getAll', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json({success: true, subjects});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

router.get('/', (req,res) => res.send('SUBJECT ROUTE'));

module.exports = router