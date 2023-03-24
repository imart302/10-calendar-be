const mongoose = require('mongoose');

const dbConnection = async () => {
  try{
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected');
  } 
  catch(error) {
    console.log(error);
    throw error;
  }
}


module.exports = {
  dbConnection,
}