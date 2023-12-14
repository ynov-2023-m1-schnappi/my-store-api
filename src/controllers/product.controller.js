const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const throwError = require('../utils/throwError');
const config = require('../config');
const prisma = new PrismaClient();

const s3 = new AWS.S3({
    accessKeyId: 'AKIAS6JRDC7KNCJ4VFAV',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

exports.getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      take: req.query.take ? Number(req.query.take) : 8,
    });
    console.log(products)
    if (!products) {
      const err = throwError('No products found', 404);
      return next(err);
    }
    return res.send(
      {
        success: true,
        data: products,
      },
    );
  } catch (err) {
    return next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const err = throwError('No product id provided', 404);
      next(err);
    }
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      const err = throwError('Product not found', 404);
      return next(err);
    }
    return res.json(
      {
        data: product,
        sucess: true,
      },
    );
  } catch (err) {
    return next(err);
  }
};

exports.createProduct = async (req, res, next) => {
    try {
      const { name, price, description, active } = req.body;

      if (!name || !price || !description) {
        const err = throwError('Name, price, and description are required fields', 400);
        return next(err);
      }

      const imageDataBuffer = await sharp(req.file.buffer).png().toBuffer();

      const image_path = `image_${Date.now()}.png`

      const createdProduct = await prisma.product.create({
        data: {
          name,
          price,
          description,
          active,
          image_path,
        },
      });

      const params = {
        Bucket: 'my-store-ynov',
        Key: image_path, // Provide a unique key for the image
        Body: imageDataBuffer,
        ContentType: 'image/png', // Set the content type accordingly
      };
  
      // Upload the image to S3
      await s3.upload(params).promise();
  
      return res.json({
        success: true,
        message: 'Image uploaded to AWS S3 successfully.',
        data: createdProduct,
      });
    } catch (err) {
      return next(err);
    }
  };


  