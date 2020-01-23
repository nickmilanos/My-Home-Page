import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    onClickHandler(){
        document.querySelector("#list").classList.toggle("zeroWidth");

    }
    onKeyPressHandler(event){
        let myInput = document.querySelector("#input");
        let myList = document.querySelector("ul");
        if(event.key === "Enter" && myInput.value !== ""){
            let newItem = document.createElement("li");
            newItem.textContent = myInput.value;
            myList.append(newItem);
            myInput.value = "";
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
                    </ul>
                </div>
            </div>
        );
    }
    


}