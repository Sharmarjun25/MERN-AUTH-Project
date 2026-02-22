import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess, API_URL } from '../utils';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            handleError('Email is required');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setStep(2);
            } else {
                handleError(result.message);
            }

        } catch (err) {
            handleError(err);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            return handleError('Otp is required');
        }
        try {
            const response = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })


            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setStep(3);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err);
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            return handleError('New Password is wrong');
        }
        if (newPassword.length < 6) {
            return handleError('Password length must be atleast 6 characters long');;
        }
        if (newPassword !== confirmPassword) {
            return handleError('Passwords do not match');
        }
        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                handleError(result.message);
            }

        } catch (err) {
            handleError(err);

        }
    };

    return (
        <div className='auth-page'>
            <div className='container'>
                {step === 1 && (
                    <>
                        <h1> Forgot Password</h1>
                        <form onSubmit={handleSendOtp}>
                            <div>
                                <label>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    placeholder='Enter your registered email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>

                                </input>

                            </div>
                            <button type='submit'>Sent OTP</button>

                            <span>
                                Remember Your Password ? <Link to="/login">Login</Link>
                            </span>
                        </form>

                    </>
                )}
                {step === 2 && (
                    <>
                        <h1>Enter OTP</h1>
                        <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginBottom: '16px' }}>
                            OTP sent to <strong>{email}</strong>
                        </p>
                        <form onSubmit={handleVerifyOtp}>
                            <div>
                                <label>OTP</label>
                                <input
                                    type='text'
                                    placeholder='Enter 6 digit OTP'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}>

                                </input>
                            </div>
                            <button type='submit'>Verify OTP</button>
                            <span>
                                Didn't receive ?
                                <span style={{ color: '#667eea', cursor: 'pointer', fontWeight: 600, marginLeft: 5 }} onClick={() => setStep(1)}>Resend OTP</span>
                            </span>
                        </form>

                    </>
                )}
                {step === 3 && (
                    <>
                        <h1>Reset Password</h1>
                        <form onSubmit={handleResetPassword}>
                            <div>
                                <label>New Password</label>
                                <input
                                    type='password'
                                    placeholder='Enter new Password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}>

                                </input>
                            </div>
                            <div>
                                <label>Confirm Password</label>
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}>
                                </input>
                            </div>
                            <button type='submit'>Reset Password</button>
                        </form>
                    </>
                )}
                <ToastContainer />
            </div>

        </div>
    )

}
export default ForgotPassword;