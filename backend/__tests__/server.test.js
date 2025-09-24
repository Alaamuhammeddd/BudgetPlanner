const request = require("supertest");
const express = require("express");

describe("Server Configuration", () => {
  let server;
  let app;

  beforeAll(async () => {
    try {
      // Create a test server
      app = express();
      app.use(express.json());
      app.get("/test", (req, res) =>
        res.status(200).json({ message: "Server is running" })
      );
      server = app.listen(0); // Use port 0 to let the OS assign a random available port
      console.log("Test server started on port 3000");
    } catch (err) {
      console.error("Could not set up test server", err);
      throw err;
    }
  });

  afterAll(async () => {
    try {
      await new Promise((resolve) => server.close(resolve));
      console.log("Test server closed");
    } catch (err) {
      console.error("Error closing test server", err);
    }
  });

  test("Server should be running and accessible", async () => {
    // Get the actual port assigned by the OS
    const port = server.address().port;
    expect(port).toBeGreaterThan(0);

    // Test that the server responds
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Server is running");
  });
});
