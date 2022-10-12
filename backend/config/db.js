const mongoose = require('mongoose');
require('colors');

const connectDb = async() =>
{
  try 
  {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb Connection: ${mongoose.connection.host}`.underline.cyan);
  } 
  catch (error) 
  {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;
