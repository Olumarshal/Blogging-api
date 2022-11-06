const mongoose = require('mongoose');
require("dotenv").config();

const CONNECTION_STRING = process.env.CONNECTION_STRING


function connectToDB() {
    mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    
    mongoose.connection.on("connected", () => {
        console.log("Successfully connected to Database");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occured");
        console.log(err);
    });
}

module.exports = {
    connectToDB
};