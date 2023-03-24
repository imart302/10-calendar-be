const JWT = require('jsonwebtoken');


const validateJWT = (req, res, next) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      message: 'Token lost',
    });
  }

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.uid = payload.uid;
    req.name = payload.username;
    next();
  } 
  catch(error) {
    return res.status(401).json({
      message: "Wrong token",
    });
  }

}


module.exports = {
  validateJWT,
}
