const router = require("express").Router();
const axios = require("axios");
let Post = require("../models/post.model");

router.get("/", async (req, res) => {
  const response = await axios.get(
    "http://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _limit: 20,
      },
    }
  );
  res.json(response.data);
});

router.get("/search", async (req, res) => {
  const response = await axios.get(
    "http://jsonplaceholder.typicode.com/posts",
    { params: { _limit: 20 } }
  );
  const target = response.data.filter((post) =>
    post.title.includes(req.query.key)
  );
  if (target.length > 0) return res.json(target);
  else
    return res.status(404).json("There are no posts that matches your search");
});

//create new favorite post
router.post("/favorite", (req, res) => {
  const userId = Number(req.body.userId);
  const title = req.body.title;
  const body = req.body.body;

  const favoritePost = new Post({
    userId,
    title,
    body,
  });

  favoritePost
    .save()
    .then(() => retriveAllPosts(req, res))
    .catch((err) => res.status(400).json("Error saving post"));
});

//search post by title
router.get("/favorite/search", (req, res) => {
  let posts = [];
  Post.find()
    .then((posts) => {
      let searchRes = posts.filter((post) =>
        post.title.includes(req.query.key)
      );
      return res.json(searchRes);
    })
    .catch((err) => res.status(400).json("Your search did not return results"));
});

//update post
router.post("/favorite/update/", async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then(() => retriveAllPosts(req, res))
    .catch((err) => res.status(400).json(err));
});

//delete post
router.delete("/favorite/", (req, res) => {
  Post.findByIdAndDelete(req.query.id)
    .then(() => res.json("Post deleted"))
    .catch((err) => res.status(400).json(err));
});

router.get("/favorite/:id", (req, res) => {
  let comments = [];
  console.log(req.params.id);
  Post.findById(req.params.id).then((post) => {
    comments = post.comments;
    return res.json(comments);
  });
});
//retrieve all favorite posts
router.get("/favorite", (req, res) => {
  retriveAllPosts(req, res);
});

function retriveAllPosts(req, res) {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
}

module.exports = router;
