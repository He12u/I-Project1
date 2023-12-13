"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Username are required !" },
          notEmpty: { msg: "Username are required !" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Email are required !" },
          notEmpty: { msg: "Email are required !" },
          isEmail: { msg: "Please check your email format !" },
        },
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Password are required !" },
          notEmpty: { msg: "Password are required !" },
          len: {
            args: [6, Infinity],
            msg: "Password length minimum 6",
          },
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      coverPicture: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      followers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      following: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      desc: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      from: {
        type: DataTypes.STRING,
      },
      isMember: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    // user.password = hash yang sudah di bcrypt
    user.password = hashPassword(user.password);
  });

  return User;
};
