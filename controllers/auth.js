const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res) => {
  const { email } = req.body;

  try {
    let userpre = await User.findOne({
      email,
    });

    if (userpre) {
      return res.status(400).json({
        message: 'email already in use',
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const user = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, salt),
    });

    await user.save();

    res.status(201).json({
      ok: true,
      message: 'User created',
      user: {
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userpre = await User.findOne({ email });

    if (!userpre) {
      return res.status(404).json({
        message: 'Email or password wrong',
      });
    }

    const validPassword = bcrypt.compareSync(password, userpre.password);

    if (!validPassword) {
      return res.status(400).json({
        message: 'Email or password wrong',
      });
    }

    const token = generateJWT(userpre.id, userpre.username);

    return res.json({
      ok: true,
      token,
      user: {
        name: userpre.username,
        _id: userpre._id,
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};

const renewToken = (req, res) => {

  const { uid, name } = req;

  const newToken = generateJWT(uid, name);

  res.status(201).json({
    ok: true,
    token: newToken,
    user: {
      _id: uid,
      name: name,
    }
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
