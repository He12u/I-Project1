const { describe, expect, test, it, beforeAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { queryInterface } = sequelize;

let findTokenAdmin;
let findTokenStaff;

beforeAll(async () => {
  const users = require("../data/users.json").map((user) => {
    delete user.id;
    // hash pass
    user.password = hashPassword(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  });

  await queryInterface.bulkInsert("Users", users);

  const user = {
    email: "admin@example.com",
    password: "123456",
  };

  const findLogin = await request(app).post("/auth/login").send(user);
  // console.log(findLogin.body.access_token,'<<<<<<<<<<<<<<<<<');
  findTokenAdmin = findLogin.body.access_token;

  const staff = {
    email: "user2@example.com",
    password: "123456",
  };

  const findStaff = await request(app).post("/auth/login").send(staff);
  findTokenStaff = findStaff.body.access_token;
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /auth/login", () => {
  it("should response with status code 200", async () => {
    const user = {
      email: "admin@example.com",
      password: "123456",
    };
    const response = await request(app).post("/auth/login").send(user);
    // console.log(response,'<<<<<<<<<<<<<<<<<<');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});
