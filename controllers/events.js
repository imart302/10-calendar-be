const EventCalendar = require('../models/Event');

const getEvents = async (req, res) => {
  const { start, end, page = 0, limit = 10 } = req.query;

  try {
    let events = null;
    const count = await EventCalendar.count({ userId: req.uid });
    if (start && end) {
      events = await EventCalendar.find({
        userId: req.uid,
        $and: [
          {
            start: {
              $gte: start,
            },
          },
          {
            end: {
              $lte: end,
            },
          },
        ],
      })
        .skip(limit * page)
        .limit(limit);
    } else if (start) {
      events = await EventCalendar.find({
        userId: req.uid,
        start: { $gte: start },
      })
        .skip(limit * page)
        .limit(limit);
    } else if (end) {
      events = await EventCalendar.find({
        userId: req.uid,
        end: { $lte: end },
      })
        .skip(limit * page)
        .limit(limit);
    } else {
      events = await EventCalendar.find({ userId: req.uid })
        .skip(limit * page)
        .limit(limit);
    }

    const nevents = events.map((event) => {
      return {
        _id: event._id,
        title: event.title,
        notes: event.notes,
        start: event.start,
        end: event.end,
        bgColor: event.bgColor,
        user: {
          _id: req.uid,
          name: req.name,
        },
      };
    });

    const pagination = {
      page,
      offset: limit,
      count,
      remaining: count - limit * page - events.length,
      data: nevents,
    };

    return res.json({
      ok: true,
      pagination,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const event = await EventCalendar.findById(id);
    console.log(`${event.userId}`);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    if(req.uid !== event.userId.toString()){
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    return res.json({
      ok: true,
      event: {
        _id: event._id,
        title: event.title,
        notes: event.notes,
        start: event.start,
        end: event.end,
        bgColor: event.bgColor,
        user: {
          _id: req.uid,
          name: req.name,
        }
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const createEvent = async (req, res) => {
  const { title, notes = '', start, end, bgColor = '#fafafa' } = req.body;

  try {
    const event = new EventCalendar({
      title,
      notes,
      start,
      end,
      bgColor,
      userId: req.uid,
    });

    event.save();

    return res.json({
      ok: true,
      event: {
        title: event.title,
        notes: event.notes,
        start: event.start,
        end: event.end,
        bgColor: event.bgColor,
        _id: event._id,
        user: {
          _id: req.uid,
          name: req.name,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventCalendar.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    if (event.userId.toString() !== req.uid) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const result = await EventCalendar.deleteOne({
      _id: id,
    });
    return res.json({
      ok: true,
      deleted: result.deletedCount,
    });
  } catch {
    return res.status(500).json({
      error,
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventCalendar.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    if (event.userId.toString() !== req.uid) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { title, notes, start, end, bgColor } = req.body;

    if (title) event.title = title;
    if (notes) event.notes = notes;
    if (start) event.start = start;
    if (end) event.end = end;
    if (bgColor) event.bgColor = bgColor;

    const result = await event.save();

    return res.json({
      ok: true,
      event: {
        _id: result._id,
        title: result.title,
        notes: result.notes,
        start: result.start,
        end: result.end,
        bgColor: result.bgColor,
        user: {
          _id: req.uid,
          name: req.name,
        }
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
