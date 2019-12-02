import React from 'react';

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
                <h3>{this.state.description}</h3>
                <span>Longitude: {this.state.lon}</span> <br />
                <span>Latitude: {this.state.lat}</span> <br />
                <span>{this.state.cityName}, {this.state.country}</span> <br />
                <span>Temperature: {this.state.temp} °C</span> <br />
                <span>Humidity: {this.state.humidity}%</span> <br />
                <span>Cloud Cover: {this.state.cloud}%</span> <br />
                <span>Wind Speed: {this.state.windSpeed} m/sec</span> <br />
                <span>Sunrise: {this.state.sunrise}</span> <br />
                <span>Sunset: {this.state.sunset}</span> <br />
            </div>
        );
    }
}
