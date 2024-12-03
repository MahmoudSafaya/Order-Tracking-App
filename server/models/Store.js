const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  _id: String, // Custom ID for the store
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: {
    phone1: { type: String, required: true },
    phone2: { type: String },
  },
});

module.exports = mongoose.model("Store", storeSchema);
