const moment = require('moment');

const isDate = (value, {req, location, path }) => {
  if(!value) {
    return false;
  }

  const dt = moment( value );
  if(dt.isValid()){
    return true;
  }

  return false;
}

module.exports = isDate;