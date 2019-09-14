const express = require('express');
const mongoose = require('mongoose');

const auth = require('../middlewares/authentication');

module.exports = options => {
  const router = express.Router();
  const User = mongoose.model('users');

  const { validateNewUser } = require('../validators/index');

  router.get('/', auth, async (req, res) => {
    res.send(await User.findById(req.user._id));
  });

  router.get('/:id', auth, async (req, res) => {
    res.send(await User.findById(req.params.id));
  });

  router.post('/', async (req, res) => {
    try {
      const dummyUser = await validateNewUser(req.body);
      if (!(await User.findOne({ email: dummyUser.email }).countDocuments())) {
        dummyUser.password = await User.hashPassword(dummyUser.password);

        const user = new User(dummyUser);
        const authToken = await user.genAuthToken();

        res.header('x-auth-token', authToken);
        res.status(201).send(
          (({ _id, fullName, email, createdAt, updatedAt }) => ({
            _id,
            fullName,
            email,
            createdAt,
            updatedAt,
            authToken
          }))(await user.save())
        );
      } else {
        res.status(400).send(global.resources.userTaken);
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
