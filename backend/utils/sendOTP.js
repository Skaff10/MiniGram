const { Resend } = require("resend");
const asyncHandler = require("express-async-handler");
const resend = new Resend(process.env.RESEND_API);

const sendOTP = asyncHandler(async (email, otp) => {
  try {
    const data = await resend.emails.send({
      from: "MINIGRAM <onboarding@resend.dev>",
      to: email,
      subject: "Your MINIGRAM OTP",
      html: `
        <h2>Welcome to MINIGRAM 🎉</h2>
        <p>Your OTP code is:</p>
        <h1 style="color: #4F46E5;">${otp}</h1>
        <p>This OTP will expire in <strong>5 minutes</strong>.</p>
      `,
    });

    console.log("OTP email sent successfully:", data);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
});

module.exports = sendOTP;