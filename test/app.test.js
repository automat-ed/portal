import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

// Read .env file for secrets
dotenv.config();

describe("Server-side Tests", function () {
  // Stores the database connection
  let db;

  // Connect to the database for all tests
  before("Connect to database", async function () {
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  describe("GET /", function () {
    it("returns 302 Found", function (done) {
      request(app).get("/").expect(302, done);
    });
  });

  describe("GET /robots", function () {
    it("returns 200 OK", function (done) {
      request(app).get("/robots").expect(200, done);
    });

    it("responds with json", function (done) {
      request(app).get("/robots").expect("Content-Type", /json/, done);
    });
  });

  // Close connection to database
  after("Close connection to database", function () {
    db.close();
  });
});
