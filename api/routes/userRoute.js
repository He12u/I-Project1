const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// GET FRIENDS
// BELUM JALAN
router.get("/friends", userController.getFriends);
// UPDATE
router.put("/:id", userController.updateUser);
// DELETE
router.delete("/:id", userController.deleteUser);
// GET
router.get("/:id", userController.getUser);
// FOLLOW
router.put("/:id/follow", userController.followUser);
// UNFOLLOW
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
