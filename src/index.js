const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');

const config = require('./config/index');
const models = require('./models/index');
const routes = require('./routes/index');

if (!process.env.NODE_ENV || process.env.NODE_ENV.startsWith('dev')) {
  const dotenv = require('dotenv');
  dotenv.config();
}

const { NODE_ENV, MONGODB_CONN_STR, PORT } = process.env;

try {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(express.static('public'));
  app.disable('x-powered-by');

  config({
    nodeEnv: NODE_ENV,
    connStr: MONGODB_CONN_STR
  });
  models();

  app.use('/api', routes());

  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
} catch (err) {
  console.log(err);
}
