const mongoose = require("mongoose");

describe("Database Connection", () => {
  let connection;

  beforeAll(async () => {
    try {
      // Connect to a test database
      connection = await mongoose.connect("mongodb://localhost:27017/test");
      console.log("Connected to test database");
    } catch (err) {
      console.error("Could not connect to test database", err);
      throw err;
    }
  });

  afterAll(async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close(true);
      }
      console.log("Database connection closed");
    } catch (err) {
      console.error("Error cleaning up database connection", err);
    }
  });

  test("MongoDB connection should be successful", async () => {
    const isConnected = mongoose.connection.readyState === 1;
    expect(isConnected).toBe(true);
  });

  test("Should be able to access database collections", async () => {
    const collections = await mongoose.connection.db.collections();
    expect(Array.isArray(collections)).toBe(true);
  });

  test("MongoDB connection error handling", async () => {
    const invalidMongoose = new mongoose.Mongoose();
    let error;
    try {
      // Set a short connectTimeoutMS to avoid long waits
      await invalidMongoose.connect("mongodb://invalidhost:27017/test", {
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000,
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.name).toBe("MongooseServerSelectionError");
  }, 10000); // Increase timeout to 10 seconds
});
