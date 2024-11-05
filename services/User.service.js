

const express = require('express');
const User = require('../models/UserModel');
const { sendVerificationCode, verifyCode } = require('./Twilio.service');
const jwt = require('jsonwebtoken');
const logger = require('../utilities/logger')

// Send verification code/Otp
/**
 * @method UserService:SendOtp
 * @param {*} req 
 * @param {*} res 
 * @returns Otp after
 */
async function sendOtp(req, res) {
    try {
        logger.info('Inside UserService: sendOtp method')
        const { phone } = req.body;
        // Generating a 6-digit code.
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Setting expiry for OTP after 2 minutes
        const expires = Date.now() + 2 * 60 * 1000;
        logger.debug(`Generated OTP: ${code}, expires at: ${expires}`);  // Debug log

        // Sending Otp by using Twilio service
        const msg = await sendVerificationCode(phone, code);
        
        // Updating user data
        await User.findOneAndUpdate(
            { phone },
            { verificationCode: code, verificationExpires: expires },
            { upsert: true, new: true }
        );
        res.status(200).json({
            status: true,
            message: 'OTP Sent Successfully...'
        });

    } catch (err) {
        logger.error(`Error while sending OTP: ${err.message}`);
        res.status(500).json({
            message: 'Error while sending verification code....',
            error: err
        })
    }
}

/**
 * @method UserService:VerifyOtp 
 * @param {*} req
 * @param {*} res 
 * @returns JWT token after successfull validation.
 */
async function verifyOtp(req, res) {
    try {
        logger.info('Inside UserService: verifyOtp method')
        const { phone, code } = req.body;
        const user = await User.findOne({ phone });
        if (user) {
            console.log("345678943w5er6t7y", Date.now() > user.verificationExpires, Date.now(), user.verificationExpires)
            if (!user || user.verificationCode !== code || Date.now() > user.verificationExpires) {
                return res.status(400).json({
                    status: true,
                    message: 'Invalid or expired verification code.',
                    token
                });
            };
            user.isVerified = true;
            await user.save();

            const token = jwt.sign({ phone: user.phone, isVerified: user.isVerified }, process.env.JWT_SECRET);

            res.status(200).json({
                status: true,
                message: 'OTP verified successfully...',
                token
            });
        } else {
            return res.status(404).json({
                status: false,
                message: 'User not found!...'
            })
        }
    } catch (err) {
        logger.error(`Error while verifying Phone Number: ${err.message}`);
        res.status(500).json({
            message: 'Errorn while verifying phone number'
        })
    }


}

module.exports = {
    sendOtp, verifyOtp
}