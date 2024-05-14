const router = require('express').Router();
const { Post, Pet } = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadPosts } = require('../../cloudinarySetup');
const { cloudinary, formidable } = require('../../cloudinarySetup');

//api/pet-post/

//Create Post
//POST //api/pet-post/
router.post('/', withAuth, async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the files', err);
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    try {
      console.log('fields', fields);
      console.log('files', files);

      const file = files.image[0];
      const filePath = file.filepath || file.path;
      if (!filePath) {
        throw new Error('No file path found');
      }

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'posts',
      });

      const postData = await Post.create({
        caption: fields.caption.toString(),
        picture: result.secure_url,
        pet_id: req.session.petId,
      });

      console.log('Pet ID', req.session.petId);
      console.log('User ID', req.session.userId);
      const pet = await Pet.findByPk(postData.pet_id);
      console.log(postData.pet_id);
      const petUserName = pet.username;

      res.status(200).redirect(`/profile/${petUserName}`);
    } catch (err) {
      console.error('Error in POST /api/pet-post/', err);
      res.status(500).json({ error: err.message });
    }
  });
});

//GET //api/pet-post/
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({});

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE //api/pet-post/id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//PUT //api/pet-post/id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = Post.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET /api/pet-post/id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        pet_id: req.params.id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
