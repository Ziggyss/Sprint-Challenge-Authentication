const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("./user-model");

describe("register endpoint", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("returns a 200 status", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "Lisa", password: "1234" })
      .then(res => {
        expect(res.status)
          .toBe(200)
          .expect("Content-Type", /json/);
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
  it("returns a 400 status with missing credentials", () => {
    request(server)
      .get("api/jokes")
      .send({ username: "", password: "" })
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
});
