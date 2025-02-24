import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "../templates/email.templates.js";
import transporter from "../config/nodemailer.config.js";

const sender = `"TODO" <${process.env.EMAIL_USER}>`;

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: sender,
      to: email,
      subject: "Welcome to Evolt",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};
