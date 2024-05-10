const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const storagePosts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storagePets = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/pet_pics/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadPosts = multer({ storage: storagePosts });
const uploadPets = multer({ storage: storagePets });

module.exports = { uploadPosts, uploadPets };
