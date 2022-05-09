const nodemailer = require('nodemailer');

/*
const url = `${req.protocol}://${req.get(
    'host',
)}/api/v1/password/reset/${forgotToken}`;
const message = `Paste The link in your browser to change your password ${url}`;
objectEmail =  {
    toemail: email,
    subject: 'Coder Socail :- Forgot Password Request',
    message,
} 
*/

//node miler send mails
const emailSender = async (objectEmail) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // message from argument
    let message = {
        from: process.env.SENDER_MAIL,
        to: objectEmail.toemail,
        subject: objectEmail.subject,
        text: objectEmail.message,
    };

    // send mail with defined transport object
    await transporter.sendMail(message);
};

module.exports = emailSender;
