import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';
import GoogleSearch from './GoogleSearch.js';

export default class App extends React.Component {
    getWallpaper(){
        let myRoot = document.getElementById("root");
        const accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`, {
            headers: {
                "Accept-Version": "v1"
            }
        })
            .then(res => res.json())
            .then(data => {
                let randomImage = data.urls.raw;
                console.log(randomImage);
                myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${randomImage})`;
            });
    }
    render() {
        this.getWallpaper();
        return ( 
        <div id = "appContainer" >
            <Hour />
            <Weather />
            <GoogleSearch />
        </div>
        );
    }
}