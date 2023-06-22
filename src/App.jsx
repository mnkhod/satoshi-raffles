import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getAddressDetail();
  }, []);

  async function getAddressDetail() {
    try {
      let tokenAddress = "bc1pus3ue90xcrq2sh7tlfaghw89rlgvr9986xh86qemct85zq2v839q7mmve2"
      let tokenTicker = "BTOC"

      let response = await axios({
        method: "get",
        url:
          `https://unisat.io/brc20-api-v2/address/${tokenAddress}/brc20/${tokenTicker}/history?start=0&limit=20`,
      });

      if (response.data.msg == "ok") {
        let tokenData = response.data.data;
        let resultTokens = tokenData.detail;
        setTokens(resultTokens);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full flex justify-center items-center">
      <ul className="flex gap-5 flex-col">
        {tokens.length > 0 && tokens.map((token) => (
          <li className="flex flex-col gap-3 p-12 border">
            <h1>{token.ticker}</h1>
            <p>type - [{token.type}]</p>
            <p>from - {token.from}</p>
            <p>to - {token.to}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
