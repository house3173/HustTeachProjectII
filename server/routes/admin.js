const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// @route POST api/admin/login
// @desc Login tutor
// @access Public
router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const admin = await Admin.findOne({adminId: loginData.adminId})

        if(!admin) 
            return res.status(400).json({success: false, message: 'Incorrect information!'});

        if(loginData.adminAuthen1 === admin.adminAuthen1 && loginData.adminAuthen2 === admin.adminAuthen2 
            && loginData.adminAuthen3 === admin.adminAuthen3) {
                return res.status(200).json({success: true, message: 'Loggin successfully', admin})
            }
        else {
            return res.json({success: false, message: 'Incorrect authentization'})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Interval server error'});
    }
})

router.get('/', (req,res) => res.send('ADMIN ROUTE'));

module.exports = router