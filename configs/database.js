const mongoose = require('mongoose');
const config = require('./../configs/config');


const initializeMongoose = async () => {

  try {
    const mongooseInstance = await mongoose.connect(config.MONGO_URI);
    const mongoConn = mongooseInstance.connection; 

    return { mongooseInstance, mongoConn };

  }
  catch (error) {
    // TODO: graceful handling for connection failure
    console.error(`error: ${error}`);
    throw new Error("Error connecting to mongoose");
  }

}

module.exports = { initializeMongoose, };
