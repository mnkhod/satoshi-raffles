import React, { useEffect, useState } from "react";
import moment from "moment";
import raffle from "../../raffleDetails.json";

function CountdownTimer() {
  const [remainingTime, setRemainingTime] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let start = moment();
      let end = moment(raffle.endTime, raffle.timeFormat);

      let diff = end.diff(start);
      let diffTime = moment(diff);

      const duration = moment.duration(end.diff(start));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        setRemainingTime("Countdown Ended");
      } else {
        setRemainingTime(diffTime.format("D[D] : HH[H] : mm[M] : ss[S]"));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCopyWinnerAddress = () => {
    navigator.clipboard.writeText(raffle.winner);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div>
      {raffle.winner.length > 0 ? (
        <div className="relative">
          {isCopied && (
            <p className="absolute border rounded-md ml-10 mt-[-30px] bg-darkGray">
              Copied!
            </p>
          )}
          <p className="text-base flex-shrink-0 text-lighterGray pb-2">
            Winner:
          </p>
          <p
            className="text-3xl text-white cursor-pointer"
            onClick={handleCopyWinnerAddress}
          >
            {raffle.winner.substring(0, 4) +
              "..." +
              raffle.winner.substring(raffle.winner.length - 4)}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-base text-lighterGray pb-2">Raffle ends in:</p>
          <p className="text-3xl text-white">{remainingTime}</p>
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
