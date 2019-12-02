import React from 'react';

export default class Weather extends React.Component{
    constructor(){
        super();
        this.state = {
            lon: "",
            lat: ""
        };
        this.success = this.success.bind(this);
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
    }

    render(){
        return(
            <div id="watherContainer">
                <h2>{this.state.lon}</h2>
                <h2>{this.state.lat}</h2>
            </div>
        );
    }
}
