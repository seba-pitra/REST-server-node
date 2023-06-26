const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Connected Database')

  } catch (error) {
    console.log(error)
    throw new Error('Error connecting database')
  }
};


export default dbConnection