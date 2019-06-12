const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/', cartController.getCarts);
router.get('/:id', cartController.getCartById);
router.post('/add-stall-to-cart/:id', cartController.addStallToCart);

module.exports = router
