'use strict';

const nodeMailer = require('nodemailer');
const handlebars = require('handlebars');
const config = require('config');
const path = require('path');
const fs = require('fs');
const util = require('util');

const sendMail = async function (mailOptions) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodeMailer.createTransport({
    host: config.mailing.host,
    port: config.mailing.port,
    secure: config.mailing.secure, // true for 465, false for other ports
    auth: {
      user: config.mailing.auth.user, // generated ethereal user
      pass: config.mailing.auth.pass // generated ethereal password
    }
  });
  // send mail with defined transport object

  return transporter.sendMail(mailOptions);
};

module.exports.sendUserActivationMail = async function (emailTo, activationToken) {
  const userActivationMailTemplate = await util.promisify(fs.readFile)(path.join(__dirname, '../templates/userActivationMailTemplate.html'), 'utf8');
  const template = handlebars.compile(userActivationMailTemplate);
  const htmlToSend = template({
    emailTo: emailTo,
    activationLink: activationToken,
    frontEndUrl: `<a target="_blank" href="${ config.frontEnd.host }" style="color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none">Ucx.com</a>`,
    frontEndLoginUrL: `<a target="_blank" href="${ config.frontEnd.host }/authentication/login" style="color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none">Log in</a>`,
    getHelpUrl: '<a target="_blank" href="" style="color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none">Get help</a>',
    howItWorksUrl: '<a target="_blank" href="" style="color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none">How it works</a>'
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `support 👻 <${config.mailing.from}>`, // sender address
    to: emailTo, // list of receivers
    subject: config.mailing.subjects.activationMail, // Subject line
    html: htmlToSend // html body
  };

  return sendMail(mailOptions);
};

module.exports.sendUserforgetPasswordMail = async function (emailTo, token) {
  const userForgetPasswordMailTemplate = await util.promisify(fs.readFile)(path.join(__dirname, '../templates/userForgetPasswordMailTemplate.html'), 'utf8');
  const template = handlebars.compile(userForgetPasswordMailTemplate);
  const htmlToSend = template({
    emailTo: emailTo,
    activationLink: `<a href="${ config.frontEnd.host }/authentication/resetpassword?token=${token}" style="border: 0 solid #4e78f1; border-radius: 6px; color: #FFFFFF; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0; padding: 13px 0; text-align: center; text-decoration: none; width: 100%" target="_blank"><b class="text-center" style="color: white; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 1px; line-height: 1.3; margin: 0; padding: 0; text-align: center" align="center"> Change Password</b> </a>`
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `support 👻 <${config.mailing.from}>`, // sender address
    to: emailTo, // list of receivers
    subject: 'forget password email ✔', // Subject line
    text: 'Hello world?\n'+'Use those credentials for login\n'+'Email: '+emailTo, // plain text body
    html: htmlToSend // html body
  };

  return sendMail(mailOptions);
};

module.exports.sendPasswordChangedMail = async function (emailTo) {
  const userPasswordChangedMailTemplate = await util.promisify(fs.readFile)(path.join(__dirname, '../templates/userPasswordChangedMailTemplate.html'), 'utf8');
  const template = handlebars.compile(userPasswordChangedMailTemplate);
  const htmlToSend = template({ emailTo: emailTo });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `support 👻 <${config.mailing.from}>`, // sender address
    to: emailTo, // list of receivers
    subject: 'Password Changed ✔', // Subject line
    html: htmlToSend // html body
  };

  return sendMail(mailOptions);
};

module.exports.sendTwoFactorAuthenticationMail = async function (emailTo, code) {
  const userPasswordChangedMailTemplate = await util.promisify(fs.readFile)(path.join(__dirname, '../templates/twoFactorAuthenticationMailTemplate.html'), 'utf8');
  const template = handlebars.compile(userPasswordChangedMailTemplate);
  const htmlToSend = template({ code: code });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `support 👻 <${config.mailing.from}>`, // sender address
    to: emailTo, // list of receivers
    subject: '2fa Code ✔', // Subject line
    html: htmlToSend // html body
  };

  return sendMail(mailOptions);
};

module.exports.sendInvitationMailToUser = async function (emailTo, username, companyName, signature) {
  const userPasswordChangedMailTemplate = await util.promisify(fs.readFile)(path.join(__dirname, '../templates/invitationMail.html'), 'utf8');
  const template = handlebars.compile(userPasswordChangedMailTemplate);
  const invitationLink = `<a href="${ config.frontEnd.host }/authentication/resetpassword?token=${signature}" style="border: 0 solid #4e78f1; border-radius: 6px; color: #FFFFFF; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0; padding: 13px 0; text-align: center; text-decoration: none; width: 100%" target="_blank"><b class="text-center" style="color: white; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 1px; line-height: 1.3; margin: 0; padding: 0; text-align: center" align="center"> Join Them</b> </a>`;
  const htmlToSend = template({ username: username, companyName: companyName, emailTo: emailTo, invitationLink: invitationLink });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `support 👻 <${config.mailing.from}>`, // sender address
    to: emailTo, // list of receivers
    subject: `${companyName} has invited you to UCX ZONE`, // Subject line
    html: htmlToSend // html body
  };

  return sendMail(mailOptions);
};
