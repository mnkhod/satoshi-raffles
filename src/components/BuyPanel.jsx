import { useEffect, useState } from "react";
import raffle from "../../raffleDetails.json";
import CountdownTimer from "./CountdownTimer";
import CopyDepositAddressButton from "./CopyDepositAddressButton";

export default function BuyPanel({ tokens }) {
  const [buyTicketAmount, setBuyTicketAmount] = useState(1);

  const renderBuyPanel = () => (
    <>
      <div className="w-full h-0.5 bg-lightGray"></div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="pb-6">
          <p className="text-base text-lighterGray pb-2">Price per ticket</p>
          <h2 className="text-3xl">
            {raffle.ticketPrice} {raffle.tokenTicker}
          </h2>
        </div>
        <div className="pb-6">
          <p className="text-base pb-2">Tickets purchased</p>
          <h2 className="text-3xl ">
            {raffle.minTicketAmount}-{raffle.maxTicketAmount}
          </h2>
        </div>
        <div className="flex justify-start w-full" role="group">
          <div className="flex flex-col w-full md:w-auto">
            <p className="text-base pb-2">Select amount</p>
            <div className="flex items-center px-5 py-2 rounded-lg  text-lg border border-lightGray bg-darkGray ">
              <div className="w-full md:w-auto flex justify-between px-6 md:px-0">
                <button
                  className=" text-3xl p-0 text-white rounded-r-none bg-inherit"
                  onClick={() =>
                    setBuyTicketAmount((prevAmount) =>
                      Math.max(prevAmount - 1, raffle.minTicketAmount)
                    )
                  }
                >
                  -
                </button>
                <input
                  className="w-20 text-center bg-inherit text-2xl"
                  type="text"
                  min="1"
                  max="1000"
                  value={buyTicketAmount}
                  placeholder="1"
                  onChange={(e) => setBuyTicketAmount(e.target.value)}
                />
                <button
                  className=" text-3xl p-0 text-white rounded-r rounded-l-none bg-inherit"
                  onClick={() =>
                    setBuyTicketAmount((prevAmount) =>
                      Math.min(prevAmount + 1, raffle.maxTicketAmount)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="pt-6 pb-6 md:pb-0">
              <p className="text-base pb-2">Total cost</p>
              <h2 className="text-3xl">
                {buyTicketAmount * raffle.ticketPrice} {raffle.tokenTicker}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <p className="text-base text-lighterGray pb-2">Deposit Address</p>
          <p className="w-full select-all text-base bg-defaultGray break-all  inline-block   text-start pb-6">
            {raffle.userAddress}
          </p>
          <CopyDepositAddressButton />
        </div>
      </div>
      <div className="w-full h-0.5 bg-lightGray"></div>
      <div className="flex flex-col">
        <CountdownTimer />
      </div>
    </>
  );

  return (
    <>
      <div className="rounded-lg w-full md:w-[514px] p-[24px] flex flex-col border border-lightGray gap-[24px] bg-defaultGray">
        <div className="flex justify-between">
          <h1 className="text-3xl">BTC Annons | Artefacts</h1>
        </div>

        {renderBuyPanel()}
      </div>
    </>
  );
}
