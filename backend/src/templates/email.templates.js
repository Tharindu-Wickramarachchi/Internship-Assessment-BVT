export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to bottom right, #0000ff, #4d4dff); padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #1a1a1a; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="color: #e6e6e6;">Hello,</p>
    <p style="color: #e6e6e6;">Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #3296ff;">{verificationCode}</span>
    </div>
    <p style="color: #e6e6e6;">Enter this code on the verification page to complete your registration.</p>
    <p style="color: #e6e6e6;">This code will expire in 15 minutes for security reasons.</p>
    <p style="color: #e6e6e6;">If you didn't create an account with us, please ignore this email.</p>
    <p style="color: #e6e6e6;">Best regards,<br>TODO team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #333333; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
  <title>Welcome to TODO</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to bottom right, #0000ff, #4d4dff); padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to TODO!</h1>
  </div>
  <div style="background-color: #1a1a1a; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="color: #e6e6e6;">Hello {name},</p>
    <p style="color: #e6e6e6;">We’re thrilled to have you on board! Thank you for joining TODO platform.</p>
    
      <div style="margin-top: 20px; text-align: center;">
      <a href="http://localhost:5173/" 
         style="display: inline-block; padding: 12px 24px; background: linear-gradient(to bottom right, #0000ff, #4d4dff); color: white; 
         text-decoration: none; font-weight: bold; border-radius: 5px; text-align: center;">
        Visit the Site
      </a>
    </div>
  
    <p style="color: #e6e6e6;">Get started by exploring our platform and discovering all the amazing features we offer.</p>    
    <p style="color: #e6e6e6;">If you have any questions, feel free to reach out to our support team.</p>
    <p style="color: #e6e6e6;">Best regards,<br>TODO Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #333333; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
