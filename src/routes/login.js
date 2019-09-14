const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = options => {
  const router = express.Router();
  const User = mongoose.model('users');

  const { validateLoginUser } = require('../validators/index');

  router.post('/', async (req, res) => {
    try {
      const credentials = await validateLoginUser(req.body);
      const user = await User.findOne({ email: credentials.email });

      if (user) {
        if (await user.verifyPassword(credentials.password)) {
          const authToken = await user.genAuthToken();

          res.header('x-auth-token', authToken);
          res.send(
            (({ _id, fullName, email, createdAt, updatedAt }) => ({
              _id,
              fullName,
              email,
              createdAt,
              updatedAt,
              authToken
            }))(user)
          );
        } else {
          res.status(400).send(global.resources.incorrectPassword);
        }
      } else {
        res.status(400).send(global.resources.userDoesnotExist);
      }
    } catch (error) {
      if (error.isJoi) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(global.resources.internalServerError);
      }
    }
  });

  return router;
};
