const { isValidObjectId } = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: 'Not a valid id',
    });
  }

  return next();
};

module.exports = { validateObjectId };
