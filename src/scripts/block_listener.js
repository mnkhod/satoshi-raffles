const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GETBLOCK_API_KEY;
const testnetApiUrl = "https://btc.getblock.io/testnet/";
const mainnetApiUrl = "https://btc.getblock.io/mainnet/";

async function getBlockCount() {
  try {
    const response = await axios.post(
      mainnetApiUrl,
      {
        jsonrpc: "2.0",
        method: "getblockcount",
        params: [],
        id: "getblock.io",
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    throw new Error(`Error fetching latest block count: ${error.message}`);
  }
}

async function getBlockHash(blockCount) {
  try {
    const response = await axios.post(
      mainnetApiUrl,
      {
        jsonrpc: "2.0",
        method: "getblockhash",
        params: [blockCount],
        id: "getblock.io",
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    throw new Error(`Error fetching latest block hash: ${error.message}`);
  }
}

async function getBlockData(blockHash) {
  try {
    const response = await axios.post(
      mainnetApiUrl,
      {
        jsonrpc: "2.0",
        method: "getblock",
        params: [blockHash],
        id: "getblock.io",
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching block data: ${error.message}`);
  }
}

async function listenForNewBlocks() {
  try {
    const blockCount = await getBlockCount();
    const blockHash = await getBlockHash(blockCount);
    const blockData = await getBlockData(blockHash);
    console.log(blockData);
  } catch (error) {
    console.log(error.message);
  }
}

listenForNewBlocks();
