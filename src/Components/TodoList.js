import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    onClickHandler(){
        document.querySelector('#list').classList.toggle("fullWidth");
        document.querySelector('#list h5').classList.toggle("displayHeader");
        document.querySelector('#list #input').classList.toggle("displayInputText");
        document.querySelector('#list ul').classList.toggle('displayList');
        document.querySelector('#input').focus();
    }
    onKeyPressHandler(event){
        let myInput = document.querySelector('#input');
        let myList = document.querySelector('ul');
        if(event.key === 'Enter' && myInput.value !== ''){
            const date = new Date();
            let currentMonth = date.getMonth();
            let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
            let dateTime = document.createElement('span');
            dateTime.textContent = `${date.getDate}`;
            let newItem = document.createElement('li');
            newItem.innerHTML = `${myInput.value}   <span class='dateTime'>${date.getDate()}.${currentMonth + 1}.${date.getFullYear()} ${currentHour}:${currentMinute}</span>`;
            myList.append(newItem);
            myInput.value = "";
            newItem.addEventListener('click', () => {
                newItem.classList.toggle('green');
            });
        }     
    }
    render(){
        return(
            <div id="todoListContainer">
                <span id="item" onClick={this.onClickHandler}><GoChecklist /></span>
                <div id="list">
                    <h5>Tasks To Do</h5>
                    <input type="text" placeholder="New Task" id="input" onKeyPress={this.onKeyPressHandler}></input>
                    <div id='ulWrapper'>
                        <ul>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    


}