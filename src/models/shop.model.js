"use strict";

//!dmbg
const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Shops";
const DOCUMENT_NAME = "Shop";
// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    verifify: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
