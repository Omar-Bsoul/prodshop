const crypto = require('crypto');
const { promisify } = require('util');

const pbkdf2Async = promisify(crypto.pbkdf2);

function genSalt(numBytes) {
  return crypto.randomBytes(numBytes).toString('base64');
}

async function hashPassword(password, salt) {
  return pbkdf2Async(password, salt, 10000, 512, 'sha512');
}

async function verifyPassword(password, hash) {
  const salt = hash.substring(0, hash.indexOf('.'));

  const hashedPass = (await hashPassword(password, salt)).toString('base64');
  if (`${salt}.${hashedPass}` === hash) {
    return true;
  } else {
    return false;
  }
}

module.exports = { genSalt, hashPassword, verifyPassword };
