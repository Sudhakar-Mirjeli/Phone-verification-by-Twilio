const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const logger = require('../utilities/logger');

/**
 * @method TwilioService:sendVerificationCode
 * @param {*} phone 
 * @param {*} code 
 * @returns message after successfully otp sent.
 */
const sendVerificationCode = async (phone, code) => {
    try {
        logger.info('TwilioService: sendVerificationCode method');
        if(!phone)
            throw new Error('Please provide phone number');

        const message = await client.messages.create({
            body: `Your verification code is ${code}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${phone}`
        });
        return message;
    } catch (error) {
        logger.error(`TwilioService: sendVerificationCode method, Error while sending OTP:${error.message}`);
        throw error;
    }
};

module.exports = { sendVerificationCode };
