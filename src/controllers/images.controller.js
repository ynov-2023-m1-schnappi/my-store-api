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

exports.getImage = async (req, res, next) => {
    try {
        const s3Object = await s3.getObject({ Bucket: 'my-store-ynov', Key: 'image12456.png' }).promise();

        console.log(s3Object, "immmmm");
        return res.json({
            success: true,
            data: s3Object
          });

    } catch (err) {
      return next(err);
    }
  };
