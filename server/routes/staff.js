const express = require('express');
const router = express.Router();

const Staff = require('../models/Staff')

// @route POST api/staff/login
// @desc Login staff
// @access Public
router.post('/login', async (req, res) => {
    const {staffId, staffPassword} = req.body;

    try {
        const staff = await Staff.findOne({staffId: staffId})

        if(!staff) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        if(staffPassword !== staff.staffPassword) 
            return res.status(400).json({success: false, message: 'Incorrect email or password!'});

        // all check
        return res
                .status(200)
                .json({
                    success: true, 
                    message: 'Loggin sucessfully', 
                    staffCurr: staff
                });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

router.get('/', (req,res) => res.send('STAFF ROUTE'));

module.exports = router