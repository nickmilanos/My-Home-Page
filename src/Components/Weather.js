import React from 'react';

export default class Weather extends React.Component{
    constructor(){
        super();
        this.state = {
            lon: "",
            lat: "",
            cityName: '',
            country: "",
            temp: "",
            humidity: ""
        };
        this.success = this.success.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    success(position){
        const coordinates = position.coords;
        this.setState({
            lon: coordinates.longitude,
            lat: coordinates.latitude
        });
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.success);
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=256429&units=metric&appid=9b00c332e03384ca3992818f17135f63`)
            .then(res => res.json())
            .then(res => {console.log(res)
                this.setState({
                    cityName: res.name,
                    country: res.sys.country,
                    temp: res.main.temp,
                    humidity: res.main.humidity
                });
            });
    }


    render(){
        return(
            <div id="watherContainer">
                <h2>Longitude: {this.state.lon}</h2>
                <h2>Latitude: {this.state.lat}</h2>
                <h2>{this.state.cityName}, {this.state.country}</h2>
                <h2>Temperature {this.state.temp} °C</h2>
                <h2>Humidity: {this.state.humidity}%</h2>
            </div>
        );
    }
}
