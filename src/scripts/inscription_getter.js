const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.UNISAT_API_KEY;
const apiUrl = "https://open-api.unisat.io";

// will get Inscriptions of address

async function main() {
  const address =
    "bc1qqd72vtqlw0nugqmzrx398x8gj03z8aqr79aexrncezqaw74dtu4qxjydq3";
  const ordinals = await getOrdinals(address);
  const brc20s = await getBRC20(address);
  const inscriptions = await getInscriptions(address);
}

async function getBRC20(address) {
  let brc20s = [];
  try {
    const response = await axios.get(`${apiUrl}/v1/indexer/tx/${address}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const utxo = response.data.utxo;

    for(let i = 0; i < utxo.length; i++) {
      if(utxo[i].inscriptions[0].isBRC20){
        brc20s.push(utxo[i].inscriptions[0]);
      }
    }

    return brc20s;
  } catch (error) {
    console.error(error);
  }
}

async function getOrdinals(address) {
  let ordinals = [];
  try {
    const response = await axios.get(`${apiUrl}/v1/indexer/tx/${address}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const utxo = response.data.utxo;

    for(let i = 0; i < utxo.length; i++) {
      if(!utxo[i].inscriptions[0].isBRC20){
        ordinals.push(utxo[i].inscriptions[0]);
      }
    }
    return ordinals;
    
  } catch (error) {
    console.log(error)
  }
}

async function getInscriptions(address) {
  let inscriptions = [];
  try {
    const response = await axios.get(`${apiUrl}/v1/indexer/tx/${address}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const utxo = response.data.utxo;

    for(let i = 0; i < utxo.length; i++) {
      inscriptions.push(utxo[i].inscriptions[0]);
    }

    return inscriptions;
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
