**Phone Verification by Twilio (Node.js Server)**

This is a Node.js server application that integrates Twilio for Phone Number Verification via OTP (One-Time Password). 
The application allows users to receive OTP codes via SMS to verify their phone numbers.

**Features**
 Sends OTP to a user's phone number via Twilio.
 Verifies the OTP entered by the user.
 API endpoints for sending OTP and verifying the OTP.

**Technologies**
 Node.js: Backend JavaScript runtime.
 Express: Web framework for Node.js.
 Twilio: Service for sending OTP via SMS.
 Dotenv: To manage environment variables.

**Prerequisites**
  Before you begin, ensure you have the following:
 A Twilio account.
 Sign up for Twilio if you don't already have one.
 Obtain your Twilio Account SID, Auth Token, and Twilio phone number.
 Node.js installed on your system (you can check with node -v).
 npm (Node package manager).

**Installation**
 Follow these steps to set up the project locally:
1. Clone the repository: (git clone https://github.com/Sudhakar-Mirjeli/Phone-verification-by-Twilio.git)
   cd Phone-verification-by-Twilio

2. Install the dependencies:
  npm install

3. Create a .env file in the root directory of the project and add the following configuration:
  TWILIO_ACCOUNT_SID=your_twilio_account_sid
  TWILIO_AUTH_TOKEN=your_twilio_auth_token
  TWILIO_PHONE_NUMBER=your_twilio_phone_number
  PORT=5001  # The port your server will run on
  JWT_SECRET=string;

**Usage**
1. Start the Node.js server:
  npm run start

2. API Endpoints:
   * POST  /api/auth/send-otp
    
    *  Request body={
          phone:number
       }
   
   * POST  /api/auth/verify-otp

      * Request body={
          phone:number,
          code:number
       }





 






