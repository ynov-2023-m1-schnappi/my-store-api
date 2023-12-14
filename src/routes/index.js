const express = require('express');
const productRoute = require('./product.route');
const imageRoute = require('./images.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/images', imageRoute);

module.exports = router;
