const express = require('express');
const router = express.Router();

const Parents = require('../models/Parents');

// @route POST api/parents/register
// @desc Register parents
// @access Public
router.post('/register', async (req, res) => {
    const {parentsName, parentsEmail, parentsPassword} = req.body;

    // Simple validation
    if(!parentsName || !parentsEmail || !parentsPassword) 
        return res
            .status(400)
            .json({ success: false, message: 'Missing parentsName and/or parentsEmail and/or parentsPassword'})

    try {
        // Check for existing parents
        const parents = await Parents.findOne({parentsEmail})

        if(parents) 
            return res.status(400).json({success: false, message: 'parentsEmail already valid'})

        // All good
        const parentsCount = await Parents.countDocuments({});
        const parentsId = `PH${String(parentsCount + 1).padStart(4, '0')}`;
        const newParents = new Parents({parentsId, parentsName, parentsEmail, parentsPassword});
        
        await newParents.save()
        return res.status(200).json({success: true, message: 'parents account created sucessfully'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route POST api/parents/login
// @desc Login parents
// @access Public
router.post('/login', async (req, res) => {
    const {parentsEmail, parentsPassword} = req.body;

    // Simple validation
    if(!parentsEmail || !parentsPassword) 
        return res
            .status(400)
            .json({ success: false, message: 'Missing email and/or password'})
    try {
        const parents = await Parents.findOne({parentsEmail})

        if(!parents) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        if(parentsPassword !== parents.parentsPassword) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        // all check
        return res
                .status(200)
                .json({
                    success: true, 
                    message: 'Login sucessfully', 
                    parentsCurr: parents
                });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})


// @route POST api/parents/getAll
// @desc getAll parents
// @access Public
router.get('/getAll', async (req, res) => {
    try {
        const parentsList = await Parents.find({});
        res.json({success: true, parentsList})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

// @route GET api/tutor/getTutor
// @desc get all subjects
// @access Public
router.post('/deleteParents/:parentsId', async (req, res) => {
    const parentsId = req.params.parentsId
    try {
        const deletedTutor1 = await Parents.findOneAndDelete({ parentsId: parentsId });
      
        res.json({success: true});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Interval server error"})
    }
})

router.get('/', (req,res) => res.send('PARENTS ROUTE'));

module.exports = router