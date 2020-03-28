import React from 'react';

export default class News extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "",
            titleLink: "",
            country: "us",
            publisher: "",
            description: ""
        };
        this.fetchNews = this.fetchNews.bind(this);
    }
    fetchNews(){
        if(Math.random() > 0.5) this.setState({country: "gr"});
        else this.setState({country: "us"});
        fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&pageSize=100&apiKey=4097cea840c347c48e92cf6d1ece3301`)
            .then(res => res.json())
            .then(data => {
                let randomTitle = Math.floor(Math.random() * data.articles.length);
                let splitTitle = data.articles[randomTitle].title.split("-");
                this.setState({
                    title: splitTitle.slice(0, splitTitle.length-1),
                    titleLink: data.articles[randomTitle].url,
                    publisher: splitTitle[splitTitle.length-1],
                    description: data.articles[randomTitle].description
                });
            });
    }
    componentDidMount(){
        let moreButton = document.getElementById('more');
        moreButton.addEventListener('click', () => {
            document.getElementById('description').classList.toggle('fullOpacity');
            document.getElementById('doubleArrows').classList.toggle('rotate180');
        });
        this.fetchNews();
        setInterval(this.fetchNews, 60000);
    } 
    render(){
        return(
        <div id="newsContainer">
            <a href={this.state.titleLink} target="_blank">"{this.state.title}"</a><span id="publisher">-{this.state.publisher}</span><br />
            <span id="more"><i id="doubleArrows" className="fas fa-angle-double-down"></i></span><br />
            <span id="description">{this.state.description}</span>
        </div>
        );
    }
}