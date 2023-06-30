import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import InscriptionDetails from "./components/InscriptionDetails";
import ViewInscription from "./components/ViewInscription";
import BuyPanel from "./components/BuyPanel";
import Leaderboard from "./components/Leaderboard";

import raffle from "../raffleDetails.json";

function App() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getAddressDetail();
  }, []);

  async function getAddressDetail() {
    try {
      let response = await axios({
        method: "get",
        url: `https://unisat.io/brc20-api-v2/address/${raffle.userAddress}/brc20/${raffle.tokenTicker}/history?start=0&limit=512&type=receive`,
      });

      if (response.data.msg == "ok") {
        let tokenData = response.data.data;
        let resultTransfers = tokenData.detail;
        let result = [];
        for (let i = 0; i < resultTransfers.length; i++) {
          // if (resultTransfers.blocktime < startBlock) continue;
          let user = resultTransfers[i].from;
          let amount = parseInt(resultTransfers[i].amount);
          let userExists = result.find((obj) => obj.from === user);
          if (userExists) {
            userExists.amount += amount;
            userExists.ticket = Math.floor(
              userExists.amount / raffle.ticketPrice
            );
          } else {
            result.push({
              // Use push to add new objects to the array
              from: user,
              amount: amount,
              ticket: Math.floor(amount / raffle.ticketPrice),
            });
          }
        }
        result.sort((a, b) => b.ticket - a.ticket);
        setTokens(result);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="py-[48px] md:py-0 px-[40px] w-full grid grid-cols-1 gap-[24px] justify-start items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        <ViewInscription />

        <div className="order-1 md:order-2 flex flex-col gap-3 col-span-2">
          <div>
            <span className="text-5xl text-orange-500 font-semibold">
              Satoshi Pit
            </span>
            <span className="text-[48px] text-orange-500"> Beta</span>
          </div>
          <p className="text-base">
            A place to partake in the raffles of unique and abstract Ordinal
            Artefacts, powered by BRC20.
          </p>
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl">How to enter</h2>
              <p className="text-base">
                Purchase a ticket by clicking ‘Buy tickets’ and following the
                instructions. Once the transaction is confirmed, your tickets
                will be credited to the wallet address you deposited with, you
                can paste your wallet into the search bar under the leaderboard
                to show total tickets in your account.
              </p>
              <p className="text-base ">
                For more detailed instructions, take a look at our guide.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <InscriptionDetails />
        <BuyPanel tokens={tokens} />
        <Leaderboard tokens={tokens} getAddressDetail={getAddressDetail} />
      </div>
    </div>
  );
}

export default App;
