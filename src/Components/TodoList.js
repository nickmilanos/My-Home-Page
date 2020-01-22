import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    onClickHandler(){
        document.querySelector("#list").classList.toggle("zeroWidth");
    }
    onKeyPressHandler(e){
        if(e.key === "Enter" && document.querySelector("input").value !== ""){
            let newListItem = document.createElement("li");
            newListItem.textContent = document.querySelector("input").value;
            document.querySelector("ul").append(newListItem);
        }
    }
    render(){
        return(
            <div id="todoListContainer">
                <span onClick={this.onClickHandler}><GoChecklist /></span>
                <div id="list">
                    <h5>TODO</h5>
                    <input type="text" placeholder="New Task" id="input" onKeyPress={this.onKeyPressHandler}></input>
                    <ul>
                        <li>qwqw</li>
                    </ul>
                </div>
            </div>
        );
    }
    


}