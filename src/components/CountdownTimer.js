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

      const duration = moment.duration(end.diff(start));

      const totalDays = Math.floor(duration.asDays());
      const totalHours = Math.floor(duration.asHours());
      const hours = (totalHours % 24).toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");

      const formattedCountdown = `${totalDays}D : ${hours}H : ${minutes}M : ${seconds}S`;

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        setRemainingTime("Countdown Ended");
      } else {
        setRemainingTime(formattedCountdown);
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
