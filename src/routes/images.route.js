const express = require('express');
const multer = require('multer');
const router = express.Router();
const imagesController = require('../controllers/images.controller');
const storage = multer.memoryStorage();

router.get('/get', imagesController.getImage);

module.exports = router;