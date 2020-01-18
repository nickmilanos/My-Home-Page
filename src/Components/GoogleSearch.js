import React from 'react';

export default class GoogleSearch extends React.Component{
    render(){
        return(
            <div id="googleSearchContainer">
                <form method="get" action="https://www.google.com/search">
                    <input type="text" name="q" id="search" autocomplete="off" placeholder="Google Search" />
                </form>
            </div>
        );
    }
}