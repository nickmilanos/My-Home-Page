import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';
import GoogleSearch from './GoogleSearch.js';

export default class App extends React.Component {
    getRandomWallpaperFromUnsplash(){
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

    getRandomWallpaperFromCollectionOfUnsplash = () => {
        let myRoot = document.getElementById("root");
        const favoriteCollections = {
            patternsAndTextures: "175083",
            animals: "181581",
            intoTheWild: "225",
            raindropsGlass: "1410320",
            landscape: "827743",
            earthPlanets: "894"
        };
        let favoriteCollectionsValues = Object.values(favoriteCollections);
        let randomCollectionId = favoriteCollectionsValues[Math.floor(Math.random() * favoriteCollectionsValues.length)];
        for(let key of Object.keys(favoriteCollections)){
            if(favoriteCollections[key] === randomCollectionId) console.log(key);
        }
        const accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        fetch(`https://api.unsplash.com/collections/${randomCollectionId}/photos?client_id=${accessKey}`, {
            "Accept-Version": "v1"
        })
            .then(res => res.json())
            .then(data => {
                let randomImage = data[Math.floor(Math.random() * data.length)].urls.raw;
                console.log(`Images in Collection: ${data.length}`);
                myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${randomImage})`;
            });
    }

    render() {
        this.getRandomWallpaperFromCollectionOfUnsplash();
        return ( 
        <div id = "appContainer" >
            <Hour />
            <Weather />
            <GoogleSearch />
        </div>
        );
    }
}