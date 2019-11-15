const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("./user-model");

describe("register endpoint", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("returns a 201 status with the right data", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "Lisa", password: "1234" })
      .then(res => {
        expect(res.status)
          .toBe(201)
          .expect("Content-Type", /json/);
      });
  });
  it("returns the new user", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "Zuri", password: "1234" })
      .then(res => {
        expect(res).toContain({
          username: "Zuri"
        });
      });
  });
});

describe("login endpoint", () => {
  it("returns a 200 status", () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "Lisa", password: "1234" })
      .then(res => {
        expect(res.status)
          .toBe(200)
          .expect("Content-Type", /json/);
      });
  });
  it("returns a welcome message on login", () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "Zuri", password: "1234" })
      .then(res => {
        expect(res).toContain({
          message: "Welcome Zuri!"
        });
      });
  });
});

describe("jokes endpoint", () => {
  it("returns a 200 status", () => {
    request(server)
      .get("/api/jokes")
      .send({ username: "Lisa", password: "1234" })
      .then(res => {
        expect(res.status)
          .toBe(200)
          .expect("Content-Type", /json/);
      });
  });
  it("returns a 401 status with missing credentials", () => {
    request(server)
      .get("api/jokes")
      .send({ username: "", password: "" })
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
});
