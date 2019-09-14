const mongoose = require('mongoose');

module.exports = connStr => {
  const { NODE_ENV, DEV_MONGODB_CONN_STR } = process.env;
  if (!NODE_ENV || NODE_ENV.startsWith('dev')) {
    connStr = DEV_MONGODB_CONN_STR;
  }
  mongoose
    .connect(connStr, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then()
    .catch(error => {
      throw error;
    });
};
