import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';
import Settings from './Settings.js';
import GoogleSearch from './GoogleSearch.js';
import TodoList from './TodoList.js';

export default class App extends React.Component {
    constructor(){
        super();
        this.myRoot = document.querySelector("#root");
    }
    getRandomWallpaperFromUnsplash = () => {
        const accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`, {
            headers: {
                "Accept-Version": "v1"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.urls.raw);
                this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${data.urls.raw})`;
            });
    }

    getRandomWallpaperFromCollectionOfUnsplash = () => {
        const favoriteCollections = {
            animals: "181581",
            intoTheWild: "225",
            raindropsGlass: "1410320",
            landscape: "827743",
            earthPlanets: "894",
            rainyDay: "1052192",
            floralBeauty: "17098",
            summerTropical: "494263",
            maldives: "3106804",
            milkyway: "1538150",
            fogMist: "1463948"
        };
        let randomPage = Math.floor(Math.random() * 4) + 1;
        let favoriteCollectionsValues = Object.values(favoriteCollections);
        let randomCollectionId = favoriteCollectionsValues[Math.floor(Math.random() * favoriteCollectionsValues.length)];
        for(let key of Object.keys(favoriteCollections)){
            if(favoriteCollections[key] === randomCollectionId) console.log(`Collection: ${key}`);
        }
        const accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        fetch(`https://api.unsplash.com/collections/${randomCollectionId}/photos?client_id=${accessKey}&per_page=30&page=${randomPage}`, {
            "Accept-Version": "v1"
        })
            .then(res => res.json())
            .then(data => {
                let randomImage = data[Math.floor(Math.random() * data.length)].urls.raw;
                console.log(`Page: ${randomPage}`);
                this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${randomImage})`;
            });
    }

    render() {
        this.getRandomWallpaperFromCollectionOfUnsplash();
        return ( 
        <div id = "appContainer" >
            <Hour />
            <Weather />
            <GoogleSearch />
            <TodoList />
            <Settings />
        </div>
        );
    }
}