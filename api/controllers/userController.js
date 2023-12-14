const { User } = require("../models");

class userController {
  // UPDATE
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { desc, city, from } = req.body;

      if (req.user.id === +id || req.user.isAdmin) {
        let findUpdate = await User.update(
          { desc, city, from },
          {
            where: {
              id,
            },
            returning: true,
          }
        );
        if (findUpdate[0] === 0) {
          throw { name: "404" };
        }
        res.status(200).json(findUpdate[1][0]);
      } else {
        throw { name: "403" };
      }
    } catch (error) {
      next(error);
    }
  }
  // DELETE
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (req.user.id === +id || req.user.isAdmin) {
        let foundDelete = await User.destroy({
          where: {
            id,
          },
          returning: true,
        });
        if (foundDelete !== 0) {
          res.status(200).json({ message: `Account has been deleted` });
        } else {
          throw { name: "403" };
        }
      }
    } catch (error) {
      next(error);
    }
  }
  //GET USER
  static async getUser(req, res, next) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw { name: "404" };
    }
    res.status(200).json(user);
    try {
    } catch (error) {
      next(error);
    }
  }
  // FOLLOW USER
  static async followUser(req, res, next) {
    try {
      const { id } = req.params;
      if (req.user.id !== +id) {
        const user = await User.findByPk(id);
        const currentUser = await User.findByPk(req.user.id);
        if (!user.followers.includes(req.user.id)) {
          user.followers.push(req.user.id);
          await User.update(
            { followers: user.followers },
            {
              where: {
                id,
              },
            }
          );
          currentUser.following.push(id);
          await User.update(
            { following: currentUser.following },
            {
              where: {
                id: req.user.id,
              },
            }
          );
          res.status(200).json({ message: "user has been followed" });
        } else {
          throw { name: "403" }; // already follow selected user
        }
      } else {
        throw { name: "403" };
      }
    } catch (error) {
      next(error);
    }
  }
  // UNFOLLOW USER
  static async unfollowUser(req, res, next) {
    try {
      const { id } = req.params;
      if (req.user.id !== +id) {
        const user = await User.findByPk(id);
        const currentUser = await User.findByPk(req.user.id);

        if (user.followers.includes(req.user.id)) {
          const followerArray = user.followers;
          const indexFollower = followerArray.indexOf(req.user.id);
          followerArray.splice(indexFollower, 1);

          await User.update(
            { followers: followerArray },
            {
              where: {
                id,
              },
            }
          );

          const followingArray = currentUser.following;
          const indexFollowing = followingArray.indexOf(id);
          followingArray.splice(indexFollowing, 1);
          await User.update(
            { following: followingArray },
            {
              where: {
                id: req.user.id,
              },
            }
          );
          res.status(200).json({ message: "user has been unfollowed" });
        } else {
          throw { name: "403" }; // already follow selected user
        }
      } else {
        throw { name: "403" };
      }
    } catch (error) {
      next(error);
    }
  }
  // GET FRIENDS
  static async getFriends(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      const friends = await user.following.map((friendId) => {
        return User.findById(friendId);
      });
      let friendList = [];
      friends.map((friend) => {
        const { id, username, profilePicture } = friend;
        friendList.push({ id, username, profilePicture });
      });
      res.status(200).json(friendList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
