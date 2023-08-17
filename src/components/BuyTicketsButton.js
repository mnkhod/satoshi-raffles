import { useEffect, useState } from "react";
import raffle from "../../raffleDetails.json";

export default function BuyTickets() {
  const [isCopied, setIsCopied] = useState(false);
  const [isBuyTicketsPressed, setIsBuyTicketsPressed] = useState(false);

  const handleBuyTicketsDown = () => {
    setIsBuyTicketsPressed(true);
  };

  const handleBuyTicketsUp = () => {
    setIsBuyTicketsPressed(false);
  };

  const handleBuyTickets = () => {
    navigator.clipboard.writeText(raffle.userAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div>
      <button
        className={
          isBuyTicketsPressed
            ? "text-lg bg-darkerLightGray border-lightGray"
            : "text-lg bg-lighterDarkGray border-lightGray"
        }
        onClick={handleBuyTickets}
        onMouseDown={handleBuyTicketsDown}
        onMouseUp={handleBuyTicketsUp}
        onBlur={handleBuyTicketsUp}
      >
        {isCopied ? "Copied to clipboard" : "Copy Address"}
      </button>
    </div>
  );
}
