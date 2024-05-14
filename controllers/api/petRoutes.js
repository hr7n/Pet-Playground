const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');
const { uploadPets } = require('../../cloudinarySetup');
const { cloudinary, formidable } = require('../../cloudinarySetup');

//POST /api/pets/
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

      const file = files.pet_pic[0];
      const filePath = file.filepath || file.path;
      if (!filePath) {
        throw new Error('No file path found');
      }

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'pets',
      });

      const petData = await Pet.create({
        bio: fields.bio.toString(),
        name: fields.name.toString(),
        username: fields.username.toString(),
        birthday: fields.birthday.toString(),
        gender: fields.gender.toString(),
        favorite_food: fields.favorite_food.toString(),
        pet_pic: result.secure_url,
        pet_type: fields.pet_type.toString(),
        favorite_toy: fields.favorite_toy.toString(),
        user_id: req.session.userId,
      });

      res.status(200).json(petData);
      console.log('Pet data saved:', petData);
    } catch (err) {
      console.error('Error in POST /api/pets/', err);
      res.status(500).json({ error: err.message });
    }
  });
});

//GET /api/pets/
router.get('/', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({});

    const pets = petData.map((pet) => pet.get({ plain: true }));

    res.status(200).json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

///DELETE /api/pets/id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const pet = Pet.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST /api/pets/id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const pet = Pet.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET /api/pets/
router.get('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      where: {
        user_id: req.params.id,
      },
    });

    const pets = petData.map((pet) => pet.get({ plain: true }));

    res.status(200).json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
