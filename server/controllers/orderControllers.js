const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");

const generateCustomId = () => {
  const uuid = uuidv4(); // Example: '3b1d3f47-d6e6-49bf-b21e-4af17e47e23b'

  // Customize by appending a prefix, removing dashes, or truncating
  const customId = `JEG000${uuid.replace(/-/g, '').slice(0, 9)}`; 
  return customId; // Example: 'SHIP-3b1d3f47d6e6'
};

// Add a New Order
const addOrder = async (req, res) => {
    try {
        const {sender, receiver, product, signedBy} = req.body;
        const customBarcodeId = generateCustomId();
        // const orderExist = Order.findOne({ customBarcodeId })
        // while(orderExist) {
        //   const newBarcodeId = generateCustomId();
        //   product._id = newBarcodeId;
        // }
        barcodeID = customBarcodeId;
        const order = Order.create({
          barcodeID,
          sender,
          receiver,
          product,
          signedBy,
          status: 'Unprinted'
        })
        // res.json('new order have beed added successfully')
        res.json(order);
    } catch (error) {
        console.log(error);
    }
};


// Fetch All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const itemId = req.params.id;
  try {
      const result = await Order.deleteOne({ _id: itemId });
      if (result.deletedCount === 1) {
          res.status(200).send({ message: "Item deleted successfully" });
      } else {
          res.status(404).send({ message: "Item not found" });
      }
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
}

const updateOrder = async (req, res) => {
  const itemId = req.params.id;
  // const updatedData = req.body; // Example: { name: "New Name", price: 100 }
  const {barcodeID, sender, receiver, product, signedBy} = req.body;

  try {
      const result = await Order.updateOne(
          { _id: itemId },
          { $set: {
            barcodeID, sender, receiver, product, signedBy, status: 'Unprinted'
          } }
      );

      if (result.matchedCount === 1) {
          res.status(200).send({ message: "Item updated successfully" });
      } else {
          res.status(404).send({ message: "Item not found" });
      }
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
}


// Fetch Orders for a Specific Store
const fetchOrdersByStore = async (storeId) => {
  const orders = await Order.find({ storeId });
  console.log(`Orders for store ${storeId}:`, orders);
};

// Setting Up Relationships
const fetchOrdersWithStoreDetails = async () => {
  const orders = await Order.find().populate("storeId");
  console.log("Orders with store details:", orders);
}


module.exports = { getOrders, addOrder, fetchOrdersByStore, fetchOrdersWithStoreDetails, deleteOrder };
