import React from 'react';
import {IoIosWater} from 'react-icons/io';
import {WiThermometer, WiCloud, WiCloudyWindy} from 'react-icons/wi';

export default class Weather extends React.Component{
    constructor(){
        super();
        this.state = {
            description: "",
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
            .then(res => {
                let readableSunset = new Date(res.sys.sunset * 1000).toUTCString();
                let readableSunrise = new Date(res.sys.sunrise * 1000).toUTCString();
                this.setState({
                    cityName: res.name,
                    country: res.sys.country,
                    temp: res.main.temp,
                    humidity: res.main.humidity,
                    cloud: res.clouds.all,
                    windSpeed: res.wind.speed,
                    description: res.weather[0].description,
                    sunrise: readableSunrise,
                    sunset: readableSunset
                });
            });
    }


    render(){
        return(
            <div id="weatherContainer">
                <span><WiThermometer />{this.state.temp} °C</span> 
                <span><IoIosWater />{this.state.humidity}%</span> <br />
                <span><WiCloud />{this.state.cloud}%</span> <br />
                <span><WiCloudyWindy />{this.state.windSpeed * 3.6.toFixed(1)}km/h</span> <br />
            </div>
        );
    }
}
