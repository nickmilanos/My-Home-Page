import React, {useState, useEffect} from 'react';

export default function QuoteOfTheDay() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const getQuoteFromAPI = () => {
        return fetch("http://quotes.rest/qod.json")
        .then(res => res.json())
        .then(data => {
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
        });
    }

    useEffect(() => {
        getQuoteFromAPI();
    }, []);

    return(
        <div id="quoteContainer">
            <blockquote>
                <cite>"{quote}"</cite>
                <footer>-{author}</footer>
            </blockquote>

        </div>
    );
}