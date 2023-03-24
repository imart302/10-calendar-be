const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('./../middlewares/validateFields');
const { createUser, login, renewToken } = require('./../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', [
  check('email').isEmail(),
  check('password').isLength({min: 6}),
  validateFields,
], (req, res) => {
  login(req, res);
});

router.post('/new', [
  check('username', 'Username required').not().isEmpty(),
  check('email').isEmail(),
  check('password', 'Password should contain 6 characters').isLength({min: 6}),
  validateFields,
], (req, res) => {
  createUser(req, res);
});

router.get('/renew', [
  validateJWT,
], (req, res) => {
  renewToken(req, res);
});

module.exports = router;
