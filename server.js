const express = require("express");
const app = express();
const routes = require("./routes");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
});

app.use(limiter);
app.use("/api", routes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error.message);
    process.exit(1);
  }
};

startServer();
