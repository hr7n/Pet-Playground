const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const storagePosts = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `posts/${Date.now().toString()}-${file.originalname}`);
  },
  // destination: function (req, file, cb) {
  //   cb(null, './public/images/uploads/');
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});

const storagePets = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `pets/${Date.now().toString()}-${file.originalname}`);
  },
});

const uploadPosts = multer({ storage: storagePosts });
const uploadPets = multer({ storage: storagePets });

module.exports = { uploadPosts, uploadPets };
