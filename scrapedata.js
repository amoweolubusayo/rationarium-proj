const fs = require("fs");
const axios = require("axios");

async function scrapeData(address) {
  console.log("got here");
  try {
    const response = await axios.get(
      `https://api.tzkt.io/v1/accounts/${address}/balance`
    );

    const data = response.data;
    return { address, balance: data };
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return { address, error: "Account not found" };
    } else {
      return { address, error: error.message };
    }
  }
}

module.exports = async function scrapeAddresses() {
  console.log("got here");
  try {
    const addresses = JSON.parse(fs.readFileSync("addresses.json"));
    console.log(addresses);
    const results = await Promise.all(
      addresses.map(async (address) => {
        return await scrapeData(address);
      })
    );
    console.log(await results);
    return results;
  } catch (error) {
    throw new Error("Failed to scrape addresses: " + error.message);
  }
};
