import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Image from "next/image";

import { setTicketAmount } from "../slices/mainSlice";

import raffle from "../../raffleDetails.json";
import CountdownTimer from "./CountdownTimer";
import PurchaseOverlay from "./PurchaseOverlay";

import { AiOutlineCopy } from "react-icons/ai";

export default function BuyPanel({ tokens }) {
  const ticket = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newAmount = parseInt(e.target.value, 10);
    dispatch(setTicketAmount(newAmount));
  };

  const handleIncrement = () => {
    const newAmount = Math.min(ticket.amount + 1, raffle.maxTicketAmount);
    dispatch(setTicketAmount(newAmount));
  };

  const handleDecrement = () => {
    const newAmount = Math.max(ticket.amount - 1, 1);
    dispatch(setTicketAmount(newAmount));
  };

  const [raffleActive, setRaffleActive] = useState(false);

  useEffect(() => {
    const endTime = moment(raffle.endTime, raffle.timeFormat);
    const currentTime = moment();
    if (currentTime.isBefore(endTime)) {
      setRaffleActive(true);
    }
  }, []);

  const handleCopyDepositAddressButton = () => {
    navigator.clipboard.writeText(raffle.userAddress);
  };

  const [isPurchaseOverlayOpen, setIsPurchaseOverlayOpen] = useState(false);

  const handleOpenPurchaseOverlay = () => {
    setIsPurchaseOverlayOpen(true);
  };

  const handleClosePurchaseOverlay = () => {
    setIsPurchaseOverlayOpen(false);
  };

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
          <h2 className="text-3xl">
            {tokens.length > 0
              ? tokens.reduce((a, b) => a + (b["ticket"] || 0), 0)
              : 0}
          </h2>
        </div>
        <div className="flex justify-start w-full" role="group">
          <div className="flex flex-col w-full md:w-auto">
            <p className="text-base pb-2">Select amount</p>
            <div className="group">
              <div className="flex items-center px-5 py-2 rounded-lg text-lg border border-lightGray bg-darkGray peer focus-within:border-[#D6D6D6]">
                <div className="w-full flex justify-between px-6 md:px-0">
                  <button
                    className="text-3xl p-0 text-white rounded-r-none bg-inherit border-none select-none"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    className="w-20 focus:border-none text-center bg-inherit text-2xl focus:outline-none"
                    type="text"
                    min="1"
                    readOnly
                    max="1000"
                    value={ticket.amount}
                    placeholder="1"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <button
                    className="text-3xl p-0 text-white rounded-r rounded-l-none bg-inherit border-none select-none"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="pt-6 pb-6 md:pb-0">
                <p className="text-base pb-2">Total cost</p>
                <h2 className="text-3xl">
                  {ticket.amount * raffle.ticketPrice} {raffle.tokenTicker}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {raffleActive && (
          <div className="flex flex-col">
            <div className="flex flex-row text-base text-lighterGray pb-2">
              Deposit Address
              <div
                className="flex pl-2 items-center cursor-pointer"
                onClick={handleCopyDepositAddressButton}
              >
                <AiOutlineCopy />
              </div>
            </div>
            <p className="w-full select-all text-base bg-defaultGray break-all inline-block text-start pb-6">
              {raffle.userAddress}
            </p>
            <button
              className="text-base bg-defaultGray border-lightGray px-[16px] py-[12px] h-[48px] w-full md:w-auto hover:bg-darkerLightGray hover:border-lightGray"
              onClick={handleOpenPurchaseOverlay}
            >
              Purchase
            </button>
            <PurchaseOverlay
              isOpen={isPurchaseOverlayOpen}
              onClose={handleClosePurchaseOverlay}
            />
          </div>
        )}
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
          <h1 className="text-3xl">Join the Raffle</h1>
        </div>

        {renderBuyPanel()}
      </div>
    </>
  );
}
