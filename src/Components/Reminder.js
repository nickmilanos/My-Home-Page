import React from 'react';

export default class Reminder extends React.Component{
    render(){
        return(
            <div id="reminderContainer">
                <span class="sideButtons" id="reminderIcon"><i class="fas fa-clock"></i></span>
            </div>
        )
    }
}