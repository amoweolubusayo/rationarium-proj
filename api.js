const axios = require("axios");

async function getBalance(address) {
  try {
    const response = await axios.get(
      `https://api.tzkt.io/v1/accounts/${address}/balance`
    );
    return response.data.balance;
  } catch (error) {
    if (error.response && error.response.status === 204) {
      throw new Error("Account not found");
    } else {
      throw new Error("Failed to fetch balance");
    }
  }
}

module.exports = {
  getBalance,
};
