var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");  
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn") 
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

// Register :

router.post("/register", async (req, res) => {      
  //extract username and password from the req body
  const { username, password } = req.body;

  try {
    //keep the hashed version of the password here
    const hash = await bcrypt.hash(password, saltRounds);  

    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


//  Login:

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const results = await db(
        `SELECT * FROM users WHERE username = "${username}"`
      );
      const user = results.data[0];
      if (user) {
        const user_id = user.id;
  
        const correctPassword = await bcrypt.compare(password, user.password);
  
        if (!correctPassword) throw new Error("Incorrect password");
  
        var token = jwt.sign({ user_id }, supersecret);
        res.send({ message: "Login successful, here is your token", token });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });


// Profile:

  router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
    res.send({
      message: "Let´s put the favorites here " + req.user_id,
    });
  });
  
  module.exports = router;

