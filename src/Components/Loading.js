import React from 'react';

export default class Loading extends React.Component{
    render(){
        return(
            <div id="loadingContainer">
                <span><i className="fas fa-spinner fa-pulse"></i></span>
            </div>
        );
    }
}