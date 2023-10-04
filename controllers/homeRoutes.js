const router = require("express").Router();
const { Post, User, Pet } = require("../models");
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
//GET /
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({});

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for profile button to select random pet
router.get("/profile/", withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const pets = petData.map((pet) => pet.get({ plain: true }));
    const currentPet = pets[0];
    res.redirect("profile/" + currentPet.name);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route for the pet profile pages
// GET /profile/name
router.get("/profile/:name", withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    const petIDList = petData.map((pet) => pet.id);
    const postData = await Post.findAll({
      where: {
        [Op.or]: {
          pet_id: petIDList,
        },
      },
    });

    const pets = petData.map((pet) => pet.get({ plain: true }));
    console.log("pet", pets);
    const posts = postData.map((post) => post.get({ plain: true }));
    const currentPet = pets.filter((pet) => pet.name === req.params.name)[0];
    res.render("profile", {
      posts,
      pets,
      currentPet,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET /login
router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
