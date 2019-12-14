import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';
import GoogleSearch from './GoogleSearch.js';

export default class App extends React.Component {
    render() {
        return ( 
        <div id = "appContainer" >
            <Hour />
            <Weather />
            <GoogleSearch />
        </div>
        );
    }
}