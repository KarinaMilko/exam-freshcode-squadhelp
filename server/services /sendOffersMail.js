const nodemailer = require('nodemailer');
const CONSTANTS = require('./../src/constants');

module.exports.sendOffersMail = async (email, status) => {
  const { OFFER_STATUS_APPROVED, OFFER_STATUS_REJECTED } = CONSTANTS;

  const NODE_ENV = process.env.NODE_ENV ?? 'development';

  try {
    const transporter = nodemailer.createTransport(
      await getTransporterOptions()
    );

    let subject = '';
    let text = '';
    let html = '';

    if (status === OFFER_STATUS_APPROVED) {
      subject = 'Your offer has been approved';
      text = 'Congratulations! Your offer has been approved by the moderator.';
      html =
        '<p>Congratulations! Your offer has been <strong>approved</strong> by the moderator.</p>';
    } else if (status === OFFER_STATUS_REJECTED) {
      subject = 'Your offer has been rejected';
      text = 'Unfortunately, your offer has been rejected by the moderator.';
      html =
        '<p>Unfortunately, your offer has been <strong>rejected</strong> by the moderator.</p>';
    }

    const message = {
      from: 'Moderator <moderator@offers.gmail.com>',
      to: email,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);

    if (NODE_ENV === 'development')
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

async function getTransporterOptions() {
  const NODE_ENV = process.env.NODE_ENV ?? 'development';

  if (NODE_ENV === 'development') {
    const account = await nodemailer.createTestAccount();

    return {
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    };
  }
  if (NODE_ENV === 'test') {
    return {};
  }
  if (NODE_ENV === 'production') {
    return {
      service: 'gmail',
      auth: {
        user: process.env.MAILING_EMAIL,
        pass: process.env.MAILING_PASS,
      },
    };
  }
}
