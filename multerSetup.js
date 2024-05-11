const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// cloudinary config
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

// posts
const storagePosts = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts',
    allowedFormats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => file.originalname,
  },
});
// const storagePosts = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// pets
const storagePets = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pets',
    allowedFormats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => file.originalname,
  },
});

// const storagePets = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/pet_pics/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const uploadPosts = multer({ storage: storagePosts });
const uploadPets = multer({ storage: storagePets });

module.exports = { uploadPosts, uploadPets };
