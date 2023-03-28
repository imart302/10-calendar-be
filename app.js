const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors');

const app = express();

dbConnection();

app.use('/', express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});

module.exports = app;