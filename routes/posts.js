const router = require("express").Router();
const axios = require("axios");
let Post = require("../models/post.model");

// retrieving posts from external data source
router.get("/", async (req, res) => {
  const response = await axios.get(
    "http://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _limit: 20, // can remove params to retrieve all posts
      },
    }
  );
  res.json(response.data);
});

//search data source based on user supplied key (part/full post title )
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

/*
  Routes for favorite posts
 */

//create new favorite post
router.post("/favorite", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const comments = req.body.comments;

  const favoritePost = new Post({
    title,
    body,
    comments,
  });

  favoritePost
    .save()
    .then(() => retriveAllPosts(req, res))
    .catch((err) => res.status(400).json("Error saving post"));
});

//search posts by title
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
router.patch("/favorite/update/", async (req, res) => {
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

//retrieve post by id --> mainly for debugging
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

// this is just a helper function for getting all posts
function retriveAllPosts(req, res) {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
}

module.exports = router;
