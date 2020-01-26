import React from 'react';

export default class QuoteOfTheDay extends React.Component{
    getQuoteFromAPI(){
        return fetch("http://quotes.rest/qod.json")
        .then(res => res.json())
        .then(data => {
            let qod = document.querySelector('blockquote cite');
            qod.textContent = `"${data.contents.quotes[0].quote}"`;
            let author = document.querySelector('blockquote footer');
            author.textContent =  `-${data.contents.quotes[0].author}`;
        });
    }

    componentDidMount(){
        this.getQuoteFromAPI();
    }

    render(){
        return(
            <div id="quoteContainer">
                <blockquote>
                    <cite></cite>
                    <footer></footer>
                </blockquote>

            </div>
        );
    }
}