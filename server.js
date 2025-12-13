const express = require("express");
const app = express();
const routes = require("./routes");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
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
