const Store = require("../models/Store");

// Fetch All Stors
const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    console.log("Stores:", stores);
    res.json(stores);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getStores };
