const path = require('path');
// =========================
const mongoose = require('mongoose');
// ===============================
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = require(configPath)[env];

/* mongoose.connect(
  `mongodb://${ config.host }:${ config.port }/${ config.database }`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

  }); */

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`)
  .then(() => console.log(`Connection to DB <<< ${config.database} >>> is Ok`))
  .catch(err => console.log(err));

mongoose.set('debug', env === 'development');

module.exports = mongoose;
