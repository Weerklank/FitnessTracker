const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000

const app = express()

app.use(logger("dev"))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/workout';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// routes
app.use(require("./routes/api.js"))
app.use(require("./routes/html.js"))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})