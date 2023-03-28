const { Schema, model } = require('mongoose');

const EventSchema = Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  bgColor: {
    type: String,
    default: '#fafafa',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const EventCalendar = model('Event', EventSchema);

module.exports = EventCalendar;
