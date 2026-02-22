const sendOtpEmail = async (toEmail, otp) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: {
                name: 'MERN Auth',
                email: process.env.BREVO_EMAIL
            },
            to: [{ email: toEmail }],
            subject: 'Password Reset OTP',
            htmlContent: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #667eea; text-align: center;">Password Reset</h2>
                    <p style="color: #333;">Your OTP for password reset is:</p>
                    <h1 style="text-align: center; color: #764ba2; letter-spacing: 8px; font-size: 36px;">${otp}</h1>
                    <p style="color: #888; font-size: 12px; text-align: center;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
                </div>
            `
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Email send failed: ${error}`);
    }

    console.log('OTP email sent to:', toEmail);
};

module.exports = { sendOtpEmail };