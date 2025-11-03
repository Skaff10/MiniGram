const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendOtpEmail = asyncHandler(async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOption = {
    from: `MiniGramm <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your MiniGram OTP Code",
    text: `Your OTP code is ${otp} It will expire in 3 minutes`.brightRed,
  };

  await transporter.sendMail(mailOption);
});

model.exports = sendOtpEmail;
