const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

// CREATE A POST
router.post("/", postController.makePost);
// UPDATE A POST
// DELETE A POST
// LIKE A POST
// GET A POST
// GET TIMELINE POSTS

module.exports = router;
