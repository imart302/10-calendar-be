const { Schema, model } = require('mongoose');



const EventSchema = Schema({

  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,

  },
  notes: {
    type: String,
  },
  bgColor: {
    type: String,
    default: "#fafafa",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }

});


const EventCalendar = model('Event', EventSchema);

module.exports = EventCalendar;
