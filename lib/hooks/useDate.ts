import { useEffect, useState } from "react";

export const useDate = () => {
    const [date, setDate] = useState(new Date());

    const tick = () => setDate(new Date());
    useEffect(() => {
        let timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const localTime = date.toLocaleTimeString();
    const newDate = date.toLocaleDateString();

    return { date: newDate, clock: localTime };
};
