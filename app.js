const express = require("express");
const scrapeAddresses = require("./scrapedata");

const app = express();
const port = 3000;

app.get("/scrape", async (req, res) => {
  try {
    const results = scrapeAddresses();
    console.log("results are:", await results);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
