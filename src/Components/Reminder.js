import React from 'react';

export default class Reminder extends React.Component{
    render(){
        return(
            <div id="reminderContainer">
                <span className="sideButtons" id="reminderIcon"><i className="fas fa-clock"></i></span>
            </div>
        )
    }
}