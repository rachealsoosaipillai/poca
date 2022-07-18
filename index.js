const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: 'http://localhost:3000'
}
// use cors options
app.use(cors(corsOptions));


// connect to db
const db = require("./app/models");
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync().then((result) => {
  console.log("Successfully synced db!");
})
  .catch((err) => {
    console.log(err);
  });

// to force sync during development
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});

// static index
app.use(express.static(path.join(__dirname, 'app/public')));

// routes
const contact = require('./app/routes/contact');
app.use('/api/contact', contact);

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});