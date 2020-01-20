const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const models = require("./models");
const path = require("path");
const sequelize_fixtures = require("sequelize-fixtures");
const routes = require("./routes");
const bodyParser = require("body-parser");

// middleware
app.use(morgan("dev"));
app.use(cors());

// parse request body as JSON
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use(routes);

// send every other request to the React app
// define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// sync db
// when in dev force: true
// when in prod force: false
models.sequelize.sync({ force: false }).then(function() {
  // load fixtures files into the db
  // it's important that the process is finished in order
  // sequelize_fixtures.loadFile("fixtures/*.json", models).then(function() {
  //   console.log("dev data loaded successfully");
  // });

  // start server
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
