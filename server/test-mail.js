const {
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_REJECTED,
} = require('./src/constants');
const { sendOffersMail } = require('./services/sendOffersMail');

async function test() {
  await sendOffersMail('test@example.com', OFFER_STATUS_APPROVED);
  await sendOffersMail('test@example.com', OFFER_STATUS_REJECTED);
}

test();
