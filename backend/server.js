const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all origins (allow access from any domain)
app.use(
  cors({
    origin: "http://localhost:3000", // Your React app's URL
  })
);

// Optionally, restrict CORS to specific origins:
// app.use(cors({
//   origin: 'http://localhost:3000', // React app running on port 3000
// }));

app.use(express.json());

// Define your routes
app.post("/api/v1/users", (req, res) => {
  const { external_id, custom_content, search_tags } = req.body;
  // Simulate user creation logic and return a success response
  res.json({
    message: "User created successfully",
    user: { id: 12345, external_id, custom_content, search_tags },
  });
});

// Start the server on port 3001 (HTTP)
app.listen(3000, () => {
  console.log("Backend running on http://127.0.0.1:3000");
});
