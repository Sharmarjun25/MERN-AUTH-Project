const nodemailer = require('nodemailer');

let transporter = null;

// Create transporter lazily (after dotenv has loaded the env variables)
const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_EMAIL,
                pass: process.env.BREVO_SMTP_KEY
            }
        });
    }
    return transporter;
};

const sendOtpEmail = async (toEmail, otp) => {
    const mailOptions = {
        from: process.env.BREVO_EMAIL,
        to: toEmail,
        subject: 'Password Reset OTP',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #667eea; text-align: center;">Password Reset</h2>
                <p style="color: #333;">Your OTP for password reset is:</p>
                <h1 style="text-align: center; color: #764ba2; letter-spacing: 8px; font-size: 36px;">${otp}</h1>
                <p style="color: #888; font-size: 12px; text-align: center;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            </div>
        `
    };

    await getTransporter().sendMail(mailOptions);
    console.log('OTP email sent to:', toEmail);
};

module.exports = { sendOtpEmail };