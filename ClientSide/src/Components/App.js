import React from 'react';

import Hour from './Hour/Hour.js';
import Weather from './Weather/Weather.js';
import {Settings} from './Settings.js';
import GoogleSearch from './GoogleSearch.js';
import {Loading} from './Loading/Loading.js';
import TodoList from './TodoList.js';
import QuoteOfTheDay from './QuoteOfTheDay/QuoteOfTheDay.js';
import Reminder from './Reminder.js';
import {News} from './News/News.js';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            isLoadingVisible: true
        };
        this.myRoot = document.querySelector("#root");
        this.imgObj = new Image();
        this.accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        this.favoriteCollections = {
            animals: "181581",
            intoTheWild: "225",
            landscape: "827743",
            summerTropical: "494263",
            maldives: "3106804",
            milkyway: "1538150",
            fogMist: "1463948",
            cloudsColor: "1052683",
            moodyLandscapes: "1457745",
            space: "1111575",
            unsplashEditorial: '317099',
            desktopWallpapers: '987395',
            coolWallpapers: '1111678'
        };
    }

    getRandomWallpaperFromCollectionOfUnsplash = () => {
        let randomPage = Math.floor(Math.random() * 20) + 1;
        let favoriteCollectionsValues = Object.values(this.favoriteCollections);
        let randomCollectionId = favoriteCollectionsValues[Math.floor(Math.random() * favoriteCollectionsValues.length)];
        fetch(`https://api.unsplash.com/collections/${randomCollectionId}/photos?client_id=${this.accessKey}&per_page=30&page=${randomPage}&auto=compress`, {
            "Accept-Version": "v1"
        })
            .then(res => res.json())
            .then(data => {
                let randomImage;
                if(data.length !== 0) randomImage = data[Math.floor(Math.random() * data.length)].urls.raw;
                else this.getRandomWallpaperFromCollectionOfUnsplash();
                this.imgObj.src = randomImage;
                this.imgObj.addEventListener("load", _ => {
                    this.setState({
                        isLoadingVisible: false
                    });
                    this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${randomImage})`;
                });
            })
            .catch(_ => {
                this.setState({
                    isLoadingVisible: false
                });
            });
    }

    componentDidMount(){
        this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(./Images/dock.jpg)`;
        this.getRandomWallpaperFromCollectionOfUnsplash();
    }

    render() {
        return ( 
        <div id = "appContainer" >
            <Hour />
            <Weather />
            <GoogleSearch />
            <TodoList />
            <Reminder />
            <News />
            {this.state.isLoadingVisible ? <Loading /> : null}
            <Settings />
            <QuoteOfTheDay />
        </div>
        );
    }
}