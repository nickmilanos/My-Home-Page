import React, {useState, useEffect} from 'react';
import {months, weekdays} from '../../Constants';

export const Hour = () => {
    let [currentHour, setCurrentHour] = useState("");
    let [currentMinute, setCurrentMinute] = useState("");
    let [formatedDate, setFormatedDate] = useState("");

    const updateDate = () => {
        let date = new Date();
        setCurrentHour(date.getHours() < 10 ? `0${date.getHours()}` : date.getHours());
        setCurrentMinute(date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
        setFormatedDate(`${weekdays[date.getDay()]}, ${new Date().getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`);
    };

    useEffect(() => {
        updateDate();
        let oneMinute = setInterval(() => {updateDate()}, 1000);
        return () => clearInterval(oneMinute);
    }, []);

    return(
        <div className="hour">
            <h1>{currentHour}:{currentMinute}</h1>
            <h2>{formatedDate}</h2>
        </div>
    );
}