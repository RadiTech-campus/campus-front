import { useEffect, useState } from "react";

export default function useIsPeriod(startDate, endDate) {
  const [isPeriod, setIsPeriod] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start) && !isNaN(end)) {
      setIsPeriod(currentDate >= start && currentDate <= end);
    } else {
      setIsPeriod(false);
    }
  }, [startDate, endDate]);
  return { isPeriod };
}
