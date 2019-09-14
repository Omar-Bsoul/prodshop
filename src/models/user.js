const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { genSalt, hashPassword, verifyPassword } = require('../helpers/password');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    blocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

UserSchema.statics.hashPassword = async function(password) {
  const { SALT_LEN } = process.env;
  const salt = genSalt(parseInt(SALT_LEN));
  return `${salt}.${(await hashPassword(password, salt)).toString('base64')}`;
};

UserSchema.methods.genAuthToken = function() {
  const { JWT_KEY } = process.env;
  return jwt.sign({ _id: this._id }, JWT_KEY, { expiresIn: '1d' });
};

UserSchema.methods.verifyPassword = async function(password) {
  return await verifyPassword(password, this.password);
};

UserSchema.statics.verifyAuthToken = function(authToken) {
  const { JWT_KEY } = process.env;
  return jwt.verify(authToken, JWT_KEY);
};

module.exports = mongoose.model('users', UserSchema);
