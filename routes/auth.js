const express = require('express');
const router = express.Router();
const UserService = require('../services/User.service');

// Send Otp
router.post('/send-otp', async (req, res) => {
    UserService.sendOtp(req, res)
});

// Verify Otp
router.post('/verify-otp', async (req, res) => {
    UserService.verifyOtp(req, res)
});

module.exports = router;
