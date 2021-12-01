const saltRounds = 10;

const bcrypt = require('bcrypt');

export const bcryptHash = async (text) => bcrypt.hash(text, saltRounds);

export const validateBcryptHash = async (password, hash) =>
  bcrypt.compare(password, hash);
