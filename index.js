const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const REQUEST_URL =
  "https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json";

app.get("/api/tracks", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("json");

  axios
    .get(REQUEST_URL, {})
    .then(results => {
      res.send(results.data);
    })
    .catch(error => {
      console.log(error);
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})