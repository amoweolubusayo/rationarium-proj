const fs = require("fs");
const { getBalance } = require("./api");

async function scrapeData(address) {
  try {
    const balance = await getBalance(address);
    return { address, balance };
  } catch (error) {
    return { address, error: error.message };
  }
}

module.exports = async function scrapeAddresses() {
  try {
    const addresses = JSON.parse(fs.readFileSync("addresses.json"));
    const results = await Promise.all(addresses.map(scrapeData));

    return results;
  } catch (error) {
    throw new Error("Failed to scrape addresses: " + error.message);
  }
};
