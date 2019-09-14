const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.header('x-auth-token');

  if (authToken) {
    try {
      req.user = jwt.verify(authToken, process.env.JWT_KEY);

      if (!req.user) {
        throw new Error(global.resources.invalidAuthToken);
      } else {
        next();
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    res.status(401).send(global.resources.noAuthToken);
  }
};
