import React from 'react';
import '../Styles/Hour.css';

export default class Hour extends React.Component{
    constructor(){
        super();
        this.state={
            seconds: ""
        };
        this.handleSeconds = this.handleSeconds.bind(this);
    }

    handleSeconds(){
        setInterval(() => {
            let date = new Date();
            let updatedSeconds = date.getSeconds();
            this.setState({
                seconds: updatedSeconds
            });
        }, 1000);
    }

    componentDidMount(){
        this.handleSeconds();
    }

    render(){
        let date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentMonth = months[date.getMonth()];
        let currentDay = days[date.getDay()];
        return(
            <div id="hourContainer">
                <h1>{date.getHours()}:{date.getMinutes()}:{this.state.seconds}</h1>
                <h2>{currentDay}, {date.getDate()} {currentMonth} {date.getFullYear()}</h2>
            </div>
        );
    }
}
