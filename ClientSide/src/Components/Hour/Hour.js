import React from 'react';

export default class Hour extends React.Component{
    constructor(){
        super();
        this.state={
            seconds: "",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        };
        this.handleSeconds = this.handleSeconds.bind(this);
    }

    handleSeconds(){
        setInterval(() => {
            let date = new Date();
            let updatedSeconds = date.getSeconds();
            let displayedSeconds = updatedSeconds < 10 ? `0${updatedSeconds}` : updatedSeconds ;
            this.setState({
                seconds: displayedSeconds
            });
        }, 1000);
    }

    componentDidMount(){
        this.handleSeconds();
    }

    render(){
        const date = new Date();
        let currentMonth = this.state.months[date.getMonth()];
        let currentDay = this.state.days[date.getDay()];
        let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return(
            <div className="hour">
                <h1>{currentHour}:{currentMinute}:{this.state.seconds}</h1>
                <h2>{currentDay}, {date.getDate()} {currentMonth} {date.getFullYear()}</h2>
            </div>
        );
    }
}