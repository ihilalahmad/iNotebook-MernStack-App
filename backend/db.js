const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/";

const connectToMongo = () => {
  mongoose.connect(mongoUri, () => {
    console.log("Connected to mongo succesfully");
  });
};

module.exports = connectToMongo;
