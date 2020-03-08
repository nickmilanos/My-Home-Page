import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    constructor(){
        super();
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
    }
    onClickHandler(){
        document.querySelector('#list').classList.toggle("fullWidth");
        document.querySelector('#input').focus();
    }
    onKeyPressHandler(event){
        let myInput = document.querySelector('#input');
        if(event.key === 'Enter' && myInput.value !== ''){

            // Save task to database
            fetch('/saveNewTask', {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: 'POST',
                body: JSON.stringify({newTask: myInput.value})
            });
            this.appendNewTaskToList(myInput.value);
        }     
    }

    appendNewTaskToList(taskValue){
        let myList = document.querySelector('ul');
        let myInput = document.querySelector('#input');
        const date = new Date();
        let currentMonth = date.getMonth();
        let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        let dateTime = document.createElement('span');
        dateTime.textContent = `${date.getDate}`;
        let newItem = document.createElement('li');
        newItem.classList.add('fadeIn');
        newItem.innerHTML = `<i class="fas fa-trash"></i>${taskValue}<span class="dateAndCheck"><span><i class="fas fa-check-circle"></i></span><span class='dateTime'>${date.getDate()}.${currentMonth + 1}.${date.getFullYear()} ${currentHour}:${currentMinute}</span></span>`;
        myList.append(newItem);
        myInput.value = "";
        newItem.addEventListener('click', (event) => {
            event.target.querySelector('.fas.fa-check-circle').classList.toggle('displayInlineBlock');
            newItem.classList.toggle('green');
        });
        newItem.addEventListener('mouseenter', (event) => {
            event.target.querySelector('.fas.fa-trash').classList.toggle('fullOpacity');
        });
        newItem.addEventListener('mouseleave', (event) => {
            event.target.querySelector('.fas.fa-trash').classList.toggle('fullOpacity');
        });

    }
    getAllTasksFromDB(){
        fetch('/getAllTasks')
        .then(res => res.json())
        .then(tasks =>{
            for(let task of tasks){
                this.appendNewTaskToList(task);
            }
        });

    }
    componentDidMount(){
        this.getAllTasksFromDB();
    }

    render(){
        return(
            <div id="todoListContainer">
                <span className="sideButtons" onClick={this.onClickHandler}><GoChecklist /></span>
                <div id="list">
                    <h5>Things to do</h5>
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