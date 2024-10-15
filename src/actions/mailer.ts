'use server'

import nodemailer from 'nodemailer';
import { EmailData } from '../lib/def';

export async function sendEmail({ to, subject, text, html }: EmailData) {

  // Create a transporter using Gmail SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      // Note: When using a Google App Password, remove any spaces.
      // The actual password should be 16 characters without spaces.
    },
  });

  try {
    // Send email
    let info = await transporter.sendMail({
      from: `"Dumavena Corp" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text, // Plain text body
      html: html, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}