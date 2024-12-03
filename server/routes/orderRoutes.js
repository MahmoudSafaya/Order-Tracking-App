const express = require('express');
const router = express.Router();

const { getOrders, addOrder, deleteOrder } = require('../controllers/orderControllers');

router.get('/orders', getOrders);

router.post('/add-order', addOrder);

router.delete('/delete/:id', deleteOrder);

module.exports = router;