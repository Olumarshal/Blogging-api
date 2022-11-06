const mongoose = require("mongoose");
const supertest = require("supertest");
const { connect } = require("./database");
const app = require("../app");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const api = supertest(app);

describe("Blog Route", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect();

    await User.create({ username: "Mars7", password: "123456" });

    const loginResponse = await api(app)
      .post("/api/v1/blog/login")
      .set("content-type", "application/json")
      .send({
        username: "tobi",
        password: "123456",
      });

    token = loginResponse.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should return orders", async () => {
    // create blog in our db
    await Blog.create({
      title: "things fall apart",
      description: "very short",
      author: "Mars Ken",
      state: "draft",
      reading_time: "4min",
      tags: "Don't know",
      body: "blah blah blah",
    });

    await Blog.create({
      title: "Think like a Negro",
      description: "test desc",
      author: "Steve Harv",
      state: "published",
      reading_time: "7min",
      tags: "things u want",
      body: "are u sure",
    });

    const response = await api(app)
      .get("/api/v1/blog")
      .set("content-type", "application/json")
      .set("Authorization", `secret_token ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("savedBlog");
    expect(response.body).toHaveProperty("status", true);
  });

  it("should return blogs in published state", async () => {
    // create blog in our db
    await Blog.create({
        title: "things fall apart",
        description: "very short",
        author: "Mars Ken",
        state: "draft",
        reading_time: "4min",
        tags: "Don't know",
        body: "blah blah blah",
    });

    await Blog.create({
        title: "Think like a Negro",
        description: "test desc",
        author: "Steve Harv",
        state: "published",
        reading_time: "7min",
        tags: "things u want",
        body: "are u sure",
    });

    const response = await api(app)
      .get("/api/v1/blog?state=published")
      .set("content-type", "application/json")
      .set("Authorization", `secret_token ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("allBlogs");
    expect(response.body).toHaveProperty("status", true);
    expect(response.body.allBlogs.every((blog) => blog.state === published)).toBe(true);
  });
});
