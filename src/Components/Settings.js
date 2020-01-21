import React from 'react';
import {FiSettings} from 'react-icons/fi';

export default class Settings extends React.Component{
    onclickHandler(){
    }
    render(){
        return(
            <div id="settingsContainer">
                <span onClick={this.onclickHandler}><FiSettings /></span>
            </div>
        );
    }
}