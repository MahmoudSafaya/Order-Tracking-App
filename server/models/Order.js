const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  
  barcodeID: { type: String, required: true },
  sender: {
    name: {type: String, required: true, default: "Knoz Store"},
    phone1: {type: String, required: true, default: "+201551448276"},
    phone2: {type: String, default: "+201097680866"},
    state: {type: String, required: true, default: "Garbia, Eg"},
    city: {type: String, required: true, default: "Kafr Elzyat"},
    area: {type: String, required: true, default: "Kafr Elzyat"},
    street: {type: String, required: true, default: "Kafr Elzyat"},
  },
  receiver: {
    name: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    street: { type: String, required: true },
  },
  product: {
    name: { type: String },
    type: { type: String },
    weight: { type: Number, required: true, default: 1 },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    deliveryFees: { type: Number },
    notes: { type: String },
  },
  // storeId: {
  //   type: String,
  //   required: true,
  //   ref: "Store", // Reference to the Store collection
  // },
  orderDate: { type: Date, default: Date.now },
  signedBy: {type: String, required: true},
  status: {type: String, required: true, default: 'Unprinted'}
});

module.exports = mongoose.model("Order", orderSchema);
