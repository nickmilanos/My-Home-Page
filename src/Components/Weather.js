import React from 'react';
import {IoIosWater} from 'react-icons/io';
import {WiThermometer, WiCloud, WiCloudyWindy} from 'react-icons/wi';

export default class Weather extends React.Component{
    constructor(){
        super();
        this.state = {
            lon: "",
            lat: "",
            cityName: '',
            country: "",
            temp: "",
            humidity: "",
            cloud: "",
            windSpeed: "",
            sunrise: "",
            sunset: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(position => {
            const coordinates = position.coords;
            this.setState({
                lon: coordinates.longitude,
                lat: coordinates.latitude
            });
        });
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=256429&units=metric&appid=9b00c332e03384ca3992818f17135f63`)
            .then(res => res.json())
            .then(res => {
                let readableSunset = new Date(res.sys.sunset * 1000);
                let readableSunrise = new Date(res.sys.sunrise * 1000);
                let sunsetHour = readableSunset.getHours() < 10 ? `0${readableSunset.getHours()}` : readableSunset.getHours()
                let sunsetMinute = readableSunset.getMinutes() < 10 ? `0${readableSunset.getMinutes()}` : readableSunset.getMinutes();
                let sunriseHour = readableSunrise.getHours() < 10 ? `0${readableSunrise.getHours()}` : readableSunrise.getHours()
                let sunriseMinute = readableSunrise.getMinutes() < 10 ? `0${readableSunrise.getMinutes()}` : readableSunrise.getMinutes();

                this.setState({
                    cityName: res.name,
                    country: res.sys.country,
                    temp: res.main.temp,
                    humidity: res.main.humidity,
                    cloud: res.clouds.all,
                    windSpeed: res.wind.speed,
                    sunrise: `${sunriseHour}:${sunriseMinute}`,
                    sunset: `${sunsetHour}:${sunsetMinute}`
                });
            });
    }


    render(){
        return(
            <div id="weatherContainer">
                <span><WiThermometer />{Math.round(this.state.temp)} °C</span> 
                <span><IoIosWater />{this.state.humidity}%</span>
                <span><WiCloud />{this.state.cloud}%</span>
                <span><WiCloudyWindy />{Math.round(this.state.windSpeed * 3.6)}km/h</span>
                <span><i className="fas fa-sun"></i> {this.state.sunrise}</span>
                <span><i className="fas fa-moon"></i> {this.state.sunset}</span>
            </div>
        );
    }
}
