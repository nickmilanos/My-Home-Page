import React from 'react';

export default class News extends React.Component{
    constructor(){
        super();
        this.state = {
            randomGreekTitle: "",
            randomUSTitle: ""
        };
    }
    fetchUSNews(){
        fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=4097cea840c347c48e92cf6d1ece3301')
            .then(res => res.json())
            .then(data => {
                let randomTitle = Math.floor(Math.random() * data.articles.length);
                this.setState({
                    randomUSTitle: data.articles[randomTitle].title
                });
            });
    }
    fetchGreekNews(){
        fetch('https://newsapi.org/v2/top-headlines?country=gr&pageSize=100&apiKey=4097cea840c347c48e92cf6d1ece3301')
            .then(res => res.json())
            .then(data => {
                let randomTitle = Math.floor(Math.random() * data.articles.length);
                this.setState({
                    randomGreekTitle: data.articles[randomTitle].title
                });
            });
    }
    componentDidMount(){
        this.fetchUSNews();
        setInterval(this.fetchGreekNews(), 5000);
    } 
    render(){
        return(
        <div id="newsContainer">{this.state.randomGreekTitle}</div>
        );
    }

}