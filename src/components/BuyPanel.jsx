import { useEffect, useState } from "react";
import raffle from "../../raffleDetails.json";
import CountdownTimer from "./CountdownTimer";
import CopyDepositAddressButton from "./CopyDepositAddressButton";

export default function BuyPanel({ tokens }) {
  const [buyPanelOpen, setBuyPanelOpen] = useState(false);
  const [buyTicketAmount, setBuyTicketAmount] = useState(1);

  const [isBuyButtonPressed, setIsBuyButtonPressed] = useState(false);

  const handleBuyButtonDown = () => {
    setIsBuyButtonPressed(true);
  };

  const handleBuyButtonUp = () => {
    setIsBuyButtonPressed(false);
  };

  const handleBuyButton = () => {
    setBuyPanelOpen(!buyPanelOpen);
  };

  return (
    <>
      {buyPanelOpen ? (
        <div className="rounded-lg p-[24px] flex flex-col border gap-[24px] bg-defaultGray">
          <div className="flex justify-between">
            <h1 className="text-3xl">BTC Annons | Artefacts</h1>
            <h1
              className="bg-inherit text-3xl cursor-pointer"
              onClick={handleBuyButton}
              onMouseDown={handleBuyButtonDown}
              onMouseUp={handleBuyButtonUp}
              onBlur={handleBuyButtonUp}
            >
              X
            </h1>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base">Price per ticket</p>
              <h2 className="text-3xl">
                {raffle.ticketPrice} {raffle.tokenTicker}
              </h2>
            </div>
            <div>
              <p className="text-base">Select amount</p>
              <h2 className="text-3xl ">
                {raffle.minTicketAmount}-{raffle.maxTicketAmount}
              </h2>
            </div>
            <div className="flex justify-center items-center" role="group">
              <div className="flex items-center rounded-lg text-lg border-4 border-lightGray bg-darkGray">
                <button
                  className="px-6 py-2 text-5xl text-white rounded-r-none bg-inherit"
                  onClick={() =>
                    setBuyTicketAmount((prevAmount) =>
                      Math.max(prevAmount - 1, raffle.minTicketAmount)
                    )
                  }
                >
                  -
                </button>
                <input
                  className="w-20 px-2 py-2 text-center bg-inherit text-xl"
                  type="text"
                  min="1"
                  max="1000"
                  value={buyTicketAmount}
                  placeholder="1"
                  onChange={(e) => setBuyTicketAmount(e.target.value)}
                />
                <button
                  className="px-4 py-2 text-5xl text-white rounded-r rounded-l-none bg-inherit"
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
            <div>
              <p className="text-base">Deposit Address</p>
              <textarea
                className="w-full select-all h-24 text-base bg-defaultGray border-4 inline-block border-lightGray resize-none text-start"
                value={raffle.userAddress}
              ></textarea>
              <CopyDepositAddressButton />
            </div>
            <div>
              <p className="text-base">Total cost</p>
              <h2 className="text-3xl">
                {buyTicketAmount * raffle.ticketPrice} {raffle.tokenTicker}
              </h2>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="flex flex-col">
            <div className="text-base">
              <p>
                Deposit the amount shown in “Total cost” to the deposit address
                to enter the draw. Please note this deposit is
                <span className="font-semibold"> NON-REFUNDABLE.</span> For a
                more in-depth guide,{" "}
                <a className="cursor-pointer underline text-white hover:text-gray-400">
                  read here
                </a>
              </p>
            </div>
            <div>
              <p>
                Once the TX is confirmed, close this window, paste your deposit
                wallet into the search bar and your total tickets will be shown
                for the draw.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg w-[514px] p-[24px] flex flex-col border gap-[24px] bg-defaultGray">
          <h1 className="text-[28px]">BTC Annons | Artefacts</h1>
          <p className="text-base">
            The king of $PSAT, the BitGod21 Annon onboarded masses in their
            thousands to the Ordinals Ecosystem. He is a treasured artefact
            inscribed into a treasured sat.
          </p>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base">Price per ticket</p>
              <h2 className="text-3xl">
                {raffle.ticketPrice} {raffle.tokenTicker}
              </h2>
            </div>
            <div>
              <p className="text-base">Tickets purchased</p>
              <h2 className="text-3xl">
                {tokens.length > 0 &&
                  tokens.reduce((a, b) => a + (b["ticket"] || 0), 0)}
              </h2>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="grid grid-cols-2">
            <div>
              <CountdownTimer />
            </div>
            <div>
              <button
                className={
                  isBuyButtonPressed
                    ? "text-lg bg-defaultGray border-lightGray"
                    : "text-lg bg-darkerLightGray border-lightGray"
                }
                onClick={handleBuyButton}
                onMouseDown={handleBuyButtonDown}
                onMouseUp={handleBuyButtonUp}
                onBlur={handleBuyButtonUp}
              >
                Buy tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
