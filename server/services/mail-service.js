const nodemailer = require('nodemailer');
const { mail_config } = require('../config');
const { bad_request } = require('../libs/error.js');
;

const transporter = nodemailer.createTransport(mail_config);
exports.mail_reset_link = async function ({ to, subject, url, name }) {
    // eslint-disable-next-line snakecasejs/snakecasejs
    if (!to) throw new bad_request("Receiver email must be present");
    if (!subject) throw new bad_request("Email subject must be present");
    if (!url) throw new bad_request("url must be present");

    const html = `
    <div>
        <p>Hi ${name},</p>
        <p>Your reset password link is here: <a href="${url}"> click here </a></p>
        <p>Thanks</p>
    </div>
    `
    return await send_mail({ to, subject, html });
};

const send_mail = async ({ to, subject, html }) => {
    try {
        await transporter.verify();
        await transporter.sendMail({ from: process.env.MAILING_EMAIL, to, subject, html });
        console.log('Email sent successfully');
    } catch (error) {
        console.log("Unable to Send Email", error.message)
        throw error;
    }

}