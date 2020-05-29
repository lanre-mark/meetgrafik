import { useState, useEffect } from "react";
import moment from "moment-timezone";

const useClockTicker = (timezone) => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    let clockTickerId = setInterval(() => tickClock(), 1000);
    return () => clearInterval(clockTickerId);
  }, []);

  const tickClock = () => {
    setDate(moment().tz(timezone.value));
  };

  return date;
};

export default useClockTicker;
