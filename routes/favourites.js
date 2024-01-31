var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET - render the current favourites List
router.get("/favourites_list", async (req, res) => {
    try {
      // console.log("loading...");
      const results = await db("SELECT * FROM favourites_list");
      //Check if the results array is empty
      if (results.length === 0) {
        res.send({message: "You haven't saved any favourites yet!"});
      } else {
      res.send(results.data);
      }
    } catch (err) {
      console.error("Error fetching favourites:", err); // Log the error for debugging purposes
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  //Add a new favourite
  router.post("/favourites_list", async (req, res) => {
    const { title, departure, arrival, airline, rating, provider, price, originalPrice, externalUrl } = req.body;
  
  // SQL query to handle both flights and hotels
  const sql = `
    INSERT INTO favourites_list (title, departure, arrival, airline, rating, provider, price, originalPrice, externalUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const params = [title, departure, arrival, airline, rating, provider, price, originalPrice, externalUrl];
    await db(sql, params);
    let result = await db("SELECT * FROM favourites_list");
    res.status(200).send(result.data); // Return updated list
  } catch (err) {
    console.log("Error creating new favourite:", err);
    res.status(500).send({ error: err.message });
  }
});

  // Remove a favourite
  router.delete("/favourites_list/:id", async (req, res) => {
    let favouriteID = req.params.id;
    console.log("Attempting to delete favourite with ID:", favouriteID);
    try {
      let checkResult = await db(`DELETE FROM favourites_list WHERE id = ${favouriteID}`);
        res.send({message: "favourite deleted successfully"}); 
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error", message: err.message });
    }
  });  
  
  module.exports = router;