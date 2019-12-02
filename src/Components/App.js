import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';
import Weather from './Weather.js';


export default class App extends React.Component{
    render(){
        return(
            <div id="appContainer">
                <Hour />
                <Weather />
            </div>
        );
    }
}
