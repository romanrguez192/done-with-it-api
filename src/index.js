const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const cors = require("cors");

const routes = require("./routes");

// App
const app = express();

// Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

// Routes
app.use("/api", routes);

// Port
const port = process.env.PORT || config.get("port");

// Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
