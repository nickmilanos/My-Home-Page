import React from 'react';

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
            if(updatedSeconds < 10){
                this.setState({
                    seconds: `0${updatedSeconds}`
                });
            }
            else{
                this.setState({
                    seconds: updatedSeconds
                });
            }
        }, 1000);
    }


    componentDidMount(){
        this.handleSeconds();
    }

    render(){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date();
        const currentMonth = months[date.getMonth()];
        const currentDay = days[date.getDay()];
        let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return(
            <div id="hourContainer">
                <h1>{currentHour}:{currentMinute}:{this.state.seconds}</h1>
                <h2>{currentDay}, {date.getDate()} {currentMonth} {date.getFullYear()}</h2>
            </div>
        );
    }
}
