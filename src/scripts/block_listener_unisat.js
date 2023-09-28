const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.UNISAT_API_KEY;
const apiUrl = "https://open-api.unisat.io";

async function main() {
  const blockchainInfo = await getBlockchainInfo();
  let lastBlockNumberHolder = blockchainInfo.data.blocks;
  while (true) {
    const blockchainInfo = await getBlockchainInfo();
    const lastBlockHeight = blockchainInfo.data.blocks;
    if (lastBlockNumberHolder != lastBlockHeight) {
      const block = await getBlock(lastBlockNumberHolder);
      console.log(block);
      lastBlockNumberHolder = lastBlockHeight;
    }
    console.log(lastBlockNumberHolder);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

async function getBlockchainInfo() {
  try {
    const response = await axios.get(`${apiUrl}/v1/indexer/blockchain/info`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getBlock(height) {
  try {
    const response = await axios.get(
      `${apiUrl}/v1/indexer/block/${height}/txs`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
