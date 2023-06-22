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
      let tokenAddress =
        "bc1pus3ue90xcrq2sh7tlfaghw89rlgvr9986xh86qemct85zq2v839q7mmve2";
      let tokenTicker = "BTOC";

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
    <div className="py-[48px] md:py-0 px-[40px] w-full grid grid-cols-1 gap-[24px] justify-start items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        <div className="order-2 md:order-1 border border-2">
          <button>View Inscription</button>
        </div>

        <div className="order-1 md:order-2 flex flex-col gap-3 col-span-2">
          <h1 className="text-[48px]">Satoshi Pit Beta</h1>
          <p>
            A place to partake in the raffles of unique and abstract Ordinal
            Artefacts, powered by BRC20.
          </p>
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl">How to enter</h2>
              <p>
                Purchase a ticket by clicking ‘Buy tickets’ and following the
                instructions. Once the transaction is confirmed, your tickets
                will be credited to the wallet address you deposited with, you
                can paste your wallet into the search bar under the leaderboard
                to show total tickets in your account.
              </p>
              <p>For more detailed instructions, take a look at our guide.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">

        <div className="flex flex-col border-4">
          <div className="p-[24px] border border-b-2 border-x-0 border-y-0">
            <h1 className="text-[18px] font-semibold">Inscription Details</h1>
          </div>
          <ul className="px-[24px]">
            <li className="flex justify-between py-[16px]">
              <h5>ID</h5>
              <p>1119</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Number</h5>
              <p>1119</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Owner</h5>
              <p>0x...C544</p>
            </li>
            <li className="flex justify-between py-[16px]">
              <h5>Set Rarity</h5>
              <p>5%</p>
            </li>
          </ul>
        </div>

        <div className="p-[24px] flex flex-col border-4 gap-[24px]">
          <h1 className="text-[28px]">BTC Annons | Artefacts</h1>
          <p>
            The king of $OXBT, the BitGod21 Annon onboarded masses in their
            thousands to the Ordinals Ecosystem. He is a treasured artefact
            inscribed into a treasured sat.
          </p>
          <div className="w-full h-2"></div>
          <div className="grid grid-cols-2">
            <div>
              <p>Price per ticket</p>
              <h2>100 OXBT</h2>
            </div>
            <div>
              <p>Tickets purchased</p>
              <h2>473</h2>
            </div>
          </div>
          <div className="w-full h-2"></div>
          <div className="grid grid-cols-2">
            <div>
              <p>Raffle ends in:</p>
              <h4>25H : 34M : 37S</h4>
            </div>
            <div>
              <button>Buy tickets</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[24px] p-[24px] border-4">
          <h1 className="text-[28px]">Leaderboard</h1>
          <div className="flex">
            <input type="text" className="grow border-2" />
            <button>Search</button>
          </div>
          <div>
            <ul className="border border-4">
              <li className="flex justify-between border border-b-2 border-x-0 border-y-0 p-[24px]">
                <h5>Wallet</h5>
                <h5>Tickets</h5>
              </li>
              {tokens.length > 0 &&
                tokens.map((token) => (
                  <li className="p-[24px] flex justify-between">
                    <h5>{token.from.substring(0,12) + "..."}</h5>
                    <p>{token.amount}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
