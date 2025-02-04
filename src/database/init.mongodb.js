"use strict";

const mongoose = require("mongoose");
const { countConnect, checkOverload } = require("../helpers/checkConnect");
const {
  db: { username, password, host, port, dbname },
} = require("../configs/config.mongodb");
const connectString = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`;

mongoose
  .connect(connectString)
  .then(() => console.log("Connect successful"))
  .catch((err) => console.log("Error connecting", err));

class Database {
  constructor() {
    this.connect();
  }
  // connect to database
  connect(type = "mongodb") {
    if (process.env.NODE_ENV == "dev") {
      console.log("app env: dev");

      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to connect for 5 seconds
      })
      .then(() => {
        console.log("✅ MongoDB Connected!");
        if (process.env.NODE_ENV == "dev") {
          countConnect();
          checkOverload();
        }
      })
      .catch((error) => console.error("❌ MongoDB Connection Error:", error));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
