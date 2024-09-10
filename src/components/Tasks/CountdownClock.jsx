import React, { useState, useEffect } from "react";

const CountdownClock = ({ timeLeftTask, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(timeLeftTask);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(":").map(Number);

        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds <= 0) {
          clearInterval(countdownInterval);
          onTimeout();
          return "Time out";
        }

        totalSeconds -= 1;

        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;

        return `${String(newHours).padStart(2, "0")}:${String(
          newMinutes
        ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [onTimeout]);

  return (
    <div className="countdown-clock">
      <div className="time-display">{timeLeft}</div>
    </div>
  );
};

export default CountdownClock;
