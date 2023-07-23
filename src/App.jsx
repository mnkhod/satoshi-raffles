import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import InscriptionDetails from "./components/InscriptionDetails";
import ViewInscription from "./components/ViewInscription";
import BuyPanel from "./components/BuyPanel";
import Leaderboard from "./components/Leaderboard";
import InfoSection from "./components/InfoSection";

import Navbar from "./components/Navbar";

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
        let endTime = moment(raffle.endTime, raffle.timeFormat);
        // let startTime = moment(raffle.startTime, raffle.timeFormat);
        for (let i = 0; i < resultTransfers.length; i++) {
          if (
            endTime.unix() < resultTransfers[i].blocktime
            // || startTime.unix() > resultTransfers[i].blocktime
          )
            continue;
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
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto">
        <div className="py-[48px] md:py-[64px] px-4 md:px-[40px] w-full grid grid-cols-1 gap-8 justify-start items-center">
          <div className="flex md:flex-row flex-col gap-9">
            <ViewInscription />
            <InfoSection />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <InscriptionDetails />
            <BuyPanel tokens={tokens} />
            <Leaderboard tokens={tokens} getAddressDetail={getAddressDetail} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
