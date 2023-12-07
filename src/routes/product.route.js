const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/product.controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.post('/create', upload.single('image'), productController.createProduct);

module.exports = router;
