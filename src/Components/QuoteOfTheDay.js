import React from 'react';

export default class QuoteOfTheDay extends React.Component{
    constructor(){
        super();
        this.state = {
            quote: "",
            author: ""
        };
    }
    getQuoteFromAPI(){
        return fetch("http://quotes.rest/qod.json")
        .then(res => res.json())
        .then(data => {
            this.setState({
                quote: `"${data.contents.quotes[0].quote}"`,
                author: `-${data.contents.quotes[0].author}`
            });
        });
    }

    componentDidMount(){
        this.getQuoteFromAPI();
    }

    render(){
        return(
            <div id="quoteContainer">
                <blockquote>
                    <cite>{this.state.quote}</cite>
                    <footer>{this.state.author}</footer>
                </blockquote>

            </div>
        );
    }
}