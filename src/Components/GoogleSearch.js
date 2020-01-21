import React from 'react';

export default class GoogleSearch extends React.Component{
    render(){
        return(
            <div id="googleSearchContainer">
                <form method="get" action="https://www.google.com/search">
                    <input type="text" name="q" id="search" autoComplete="off" placeholder="Google Search" autoFocus />
                </form>
            </div>
        );
    }
}