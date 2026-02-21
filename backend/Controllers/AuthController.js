const bcrypt = require('bcrypt');
const UserModel = require("../Models/Users");
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/emailService');



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User already exists, you can login", success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed email or password wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found with this email',
                success: false
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        await sendOtpEmail(email, otp);

        res.status(200).json({
            message: 'OTP sent successfully',
            success: true
        });

    } catch (err) {
        console.error('Forgot password Error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                message: 'Invalid otp',
                success: false
            });
        }
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: 'Requrested otp expired , reqyuest a new one',
                success: false
            });
        }
        res.status(200).json({
            message: 'otp verified successfully',
            success: true
        });
    } catch (err) {
        console.error("Verify otp error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: 'Invalid otp',
                success: false
            })

        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({
            message: 'Password reset successfully',
            success: true
        });
    } catch (err) {
        console.error('reset password error: ', err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

module.exports = {
    signup,
    login,
    forgotPassword,
    verifyOtp,
    resetPassword
}