const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

//api/pet-post/

//Create Post
//POST //api/pet-post/
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      caption: req.body.caption,
      picture: req.body.picture,
      pet_id: req.body.pet_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET //api/pet-post/
router.get("/", withAuth, async (req, res) => {
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
router.delete("/:id", withAuth, async (req, res) => {
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

//POST //api/pet-post/id
router.post("/:id", withAuth, async (req, res) => {
  try {
    const post = Post.update(
      {
        title: req.body.title,
        caption: req.body.caption,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET /api/pet-post/id
router.get("/:id", withAuth, async (req, res) => {
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