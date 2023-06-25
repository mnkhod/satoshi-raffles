import React, { useEffect, useState } from "react";
import moment from "moment";

function CountdownTimer() {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const endTime = moment(
      "June 25th 2023, 9:44:55 pm",
      "MMMM Do YYYY, h:mm:ss a"
    );
    const interval = setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(endTime.diff(currentTime));
      const totalHours = Math.floor(duration.asHours());
      const hours = (totalHours % 24).toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        setRemainingTime("Countdown Ended");
      } else {
        const formattedCountdown = `${hours}H : ${minutes}M : ${seconds}S`;
        setRemainingTime(formattedCountdown);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>{remainingTime}</p>
    </div>
  );
}

export default CountdownTimer;
