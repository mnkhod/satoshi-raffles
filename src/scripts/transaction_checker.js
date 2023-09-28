const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.UNISAT_API_KEY;
const apiUrl = "https://open-api.unisat.io";

async function main() {
  const transactionId =
    "c02e55f2d4aad69e076e4ae0f08006fac26fe64eb118d1f10f9222bdfdc279e0";
  const transaction = await getTransaction(transactionId);
  console.log(transaction);
}

async function getTransaction(txid) {
  try {
    const response = await axios.get(`${apiUrl}/v1/indexer/tx/${txid}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
