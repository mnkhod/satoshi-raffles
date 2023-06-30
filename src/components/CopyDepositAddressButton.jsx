import { useEffect, useState } from "react";
import raffle from "../../raffleDetails.json";

export default function CopyDepositAddressButton() {
  const [isCopied, setIsCopied] = useState(false);
  const [
    isCopyDepositAddressButtonPressed,
    setIsCopyDepositAddressButtonPressed,
  ] = useState(false);

  const handleCopyDepositAddressButtonDown = () => {
    setIsCopyDepositAddressButtonPressed(true);
  };

  const handleCopyDepositAddressButtonUp = () => {
    setIsCopyDepositAddressButtonPressed(false);
  };

  const handleCopyDepositAddressButton = () => {
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
          isCopyDepositAddressButtonPressed
            ? "text-lg bg-darkerLightGray border-lightGray"
            : "text-lg bg-lighterDarkGray border-lightGray"
        }
        onClick={handleCopyDepositAddressButton}
        onMouseDown={handleCopyDepositAddressButtonDown}
        onMouseUp={handleCopyDepositAddressButtonUp}
        onBlur={handleCopyDepositAddressButtonUp}
      >
        {isCopied ? "Copied to clipboard" : "Copy Address"}
      </button>
    </div>
  );
}
