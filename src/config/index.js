module.exports = options => {
  const dbConfig = require('./db');
  const resources = require('./resources');

  dbConfig(options.connStr);
  global.resources = resources;
};
