const router = require("express").Router();
const axios = require("axios");
let Post = require("../models/post.model");

router.get("/", async (req, res) => {
  const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
  res.json(response.data);
});

router.get("/search", async (req, res) => {
  const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
  const target = response.data.filter((post) =>
    post.title.includes(req.query.key)
  );
  if (target.length > 0) return res.json(target);
  else
    return res.status(404).json("There are no posts that matches your search");
});

// router.get("/:id", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `http://jsonplaceholder.typicode.com/posts/${req.params.id}`
//     );
//     return res.json(response.data);
//   } catch (error) {
//     return res.status(400).json(`Post with id ${req.params.id} does not exist`);
//   }
// });

//routes for favorite posts
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
    .then((post) => res.json({ msg: "Post added to favorites", post }))
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

//searching favorite post by id
// router.get("/favorite/:id", (req, res) => {
//   console.log(req);
//   // Post.findById(req.params.id)
//   //   .then((post) => res.json(post))
//   //   .catch((err) =>
//   //     res.status(400).json(`Post with id ${req.params.id} does not exist`)
//   //   );
// });

//update post
router.post("/favorite/update/", (req, res) => {
  console.log(req.query.id);
  Post.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true })
    .then((post) => res.json({ msg: "Post updated", post }))
    .catch((err) => res.status(400).json(err));
});

//delete post
router.delete("/favorite/", (req, res) => {
  Post.findByIdAndDelete(req.query.id)
    .then(() => res.json("Post deleted"))
    .catch((err) => res.status(400).json(err));
});

//retrieve all favorite posts
router.get("/favorite", (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
