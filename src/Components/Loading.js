import React from 'react';
import {AiOutlineReload} from 'react-icons/ai';

export default class Loading extends React.Component{
    render(){
        return(
            <div id="loadingContainer">
                <span><AiOutlineReload /></span>
            </div>
        );
    }

}