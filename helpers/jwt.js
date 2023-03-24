const JWT = require('jsonwebtoken');

const generateJWT = (uid, username) => {
  const jwt = JWT.sign(
    {
      uid,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return jwt;
};

const verifyJWT = (jwt) => {
  const jwt2 = JWT.decode(jwt, process.env.JWT_SECRET);
  return jwt2;
};

module.exports = {
  generateJWT,
  verifyJWT,
};
