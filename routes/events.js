const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validateJWT');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const isDate = require('../helpers/isDate');

const router = express.Router();

router.use(validateJWT);

router.get('/', async (req, res) => {
  getEvents(req, res);
});

router.get('/:id', async (req, res) => {
  getEvent(req, res)
});

router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'end Date is required').custom(isDate),
    validateFields,
  ],
  (req, res) => {
    createEvent(req, res);
  }
);

router.put('/:id', (req, res) => {
  updateEvent(req, res);
});

router.delete('/:id', (req, res) => {
  deleteEvent(req, res);
});

module.exports = router;
