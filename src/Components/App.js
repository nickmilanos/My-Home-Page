import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';
import Settings from './Settings.js';
import GoogleSearch from './GoogleSearch.js';
import Loading from './Loading.js';
import TodoList from './TodoList.js';
import QuoteOfTheDay from './QuoteOfTheDay.js';
import Reminder from './Reminder.js';
import News from './News.js';

export default class App extends React.Component {
    constructor(){
        super();
        this.myRoot = document.querySelector("#root");
        this.imgObj = new Image();
    }

    getRandomWallpaperFromCollectionOfUnsplash = () => {
        const favoriteCollections = {
            animals: "181581",
            intoTheWild: "225",
            raindropsGlass: "1410320",
            landscape: "827743",
            earthPlanets: "894",
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
        let randomPage = Math.floor(Math.random() * 20) + 1;
        let favoriteCollectionsValues = Object.values(favoriteCollections);
        let randomCollectionId = favoriteCollectionsValues[Math.floor(Math.random() * favoriteCollectionsValues.length)];
        for(let key of Object.keys(favoriteCollections)){
            if(favoriteCollections[key] === randomCollectionId) console.log(`Collection: ${key}`);
        }
        const accessKey = "973a2dc62497213188e486e906dc5128f123552910555beecdf9894d63b29bb0";
        fetch(`https://api.unsplash.com/collections/${randomCollectionId}/photos?client_id=${accessKey}&per_page=30&page=${randomPage}&auto=compress`, {
            "Accept-Version": "v1"
        })
            .then(res => res.json())
            .then(data => {
                let randomImage;
                if(data.length !== 0){
                    randomImage = data[Math.floor(Math.random() * data.length)].urls.raw;
                }
                else{
                    this.getRandomWallpaperFromCollectionOfUnsplash();
                }
                this.imgObj.src = randomImage;
                this.imgObj.addEventListener("load", _ => {
                    document.querySelector("#loadingContainer").style.display = "none";
                    this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${randomImage})`;
                });
                console.log(`Page: ${randomPage}`);
            })
            .catch(_ => console.log('Image limit reached..'));
    }

    componentDidMount(){
        this.myRoot.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(./Images/road.jpg)`;
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
            <Loading />
            <News />
            <Settings />
            <QuoteOfTheDay />
        </div>
        );
    }
}