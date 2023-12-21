const { describe, expect, test, it, beforeAll } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { queryInterface } = sequelize;

let member;
let notMember;

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
  member = findLogin.body.access_token;

  const staff = {
    email: "user2@example.com",
    password: "123456",
  };

  const findStaff = await request(app).post("/auth/login").send(staff);
  notMember = findStaff.body.access_token;
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
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("POST /auth/register", () => {
  it("should response with status code 200", async () => {
    const newUser = {
      username: "user3",
      email: "user3@example.com",
      password: "123456",
    };
    const response = await request(app).post("/auth/register").send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /users/:id", () => {
  it("should response with status code 200", async () => {
    const updateUser = {
      desc: "DIUBAH OLEH STAFF YANG SESUAI",
      city: "Jakarta",
      from: "Indonesia",
    };
    const response = await request(app)
      .put("/users/3")
      .set("authorization", `Bearer ${notMember}`)
      .send(updateUser);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /users/:id", () => {
  it("should response with status code 200", async () => {
    const response = await request(app)
      .get("/users/2")
      .set("authorization", `Bearer ${notMember}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /users/:id/follow", () => {
  it("should response with status code 200", async () => {
    const response = await request(app)
      .put("/users/2/follow")
      .set("authorization", `Bearer ${notMember}`);
    // console.log(response, "<<<<<<<<<<<<<<<");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("user has been followed");
  });
});

describe("PUT /users/:id/unfollow", () => {
  it("should response with status code 200", async () => {
    const response = await request(app)
      .put("/users/2/unfollow")
      .set("authorization", `Bearer ${notMember}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("user has been unfollowed");
  });
});

describe("DELETE /users/:id", () => {
  it("should response with status code 200", async () => {
    const response = await request(app)
      .delete("/users/3")
      .set("authorization", `Bearer ${notMember}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Account has been deleted");
  });
});
