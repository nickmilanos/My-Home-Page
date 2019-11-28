import React from 'react';
import '../Styles/App.css';
import Hour from './Hour.js';


export default class App extends React.Component{
    render(){
        return(
            <div id="appContainer">
                <Hour />
            </div>
        );
    }
}
