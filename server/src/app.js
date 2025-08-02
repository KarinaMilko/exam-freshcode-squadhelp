require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./router');
const handlerError = require('./handlerError/handler');

const app = express();

const fileUploadPath =
  process.env.FILE_UPLOAD_PATH ||
  path.resolve(__dirname, '..', 'public/images');

app.use(cors());
app.use(express.json());

app.use('/public/images', express.static(path.resolve(fileUploadPath)));

app.use(router);
app.use(handlerError);

module.exports = app;
