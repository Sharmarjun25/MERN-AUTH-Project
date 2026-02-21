const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login, forgotPassword, verifyOtp, resetPassword } = require('../Controllers/AuthController');

const router = require('express').Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;