const express = require('express');
const router = express.Router();

const { getOrders, addOrder, deleteOrder, updateOrder } = require('../controllers/orderControllers');

router.get('/orders', getOrders);

router.post('/add-order', addOrder);

router.delete('/delete/:id', deleteOrder);

router.put('/update/:id', updateOrder)

module.exports = router;