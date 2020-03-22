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
            const date = new Date();
            let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

            // Save task to database
            fetch('/saveNewTask', {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: 'POST',
                body: JSON.stringify({newTask: myInput.value,
                                      taskCompleted: false,
                                      year: date.getFullYear(),
                                      month: date.getMonth()+1,
                                      day: date.getDate(),
                                      hour: currentHour,
                                      minute: currentMinute
                                })
            })
            .then(this.appendNewTaskToList(myInput.value, false, date.getFullYear(), date.getMonth()+1, date.getDate(), currentHour, currentMinute));
        }     
    }

    appendNewTaskToList(taskValue, taskCompleted, year, month, day, hour, minute){
        let myList = document.querySelector('ul');
        let myInput = document.querySelector('#input');
        myInput.value = "";
        let newItem = document.createElement('li');
        newItem.classList.add('fadeIn');
        let newTrashCan = document.createElement('span');
        newTrashCan.innerHTML = `<i class="fas fa-trash"></i> `;
        let contentAndDate = document.createElement('span');
        contentAndDate.innerHTML = `<span>${taskValue}</span> <span class="dateTime">${day}.${month}.${year} ${hour}:${minute}</span>`;
        let checkCircle = document.createElement('span');
        checkCircle.innerHTML = ` <i class="fas fa-check-circle"></i>`;
        newItem.append(newTrashCan);
        newItem.append(contentAndDate);
        newItem.append(checkCircle);
        myList.append(newItem);
        if(taskCompleted){
            newItem.classList.add('green');
            checkCircle.classList.add('displayInlineBlock');
        }
        newTrashCan.addEventListener('click', (event) => {
            event.stopPropagation();
            this.deleteATaskFromDB(taskValue);
            newTrashCan.parentNode.remove();
        });
        newItem.addEventListener('click', (event) => {
            event.target.querySelector('.fas.fa-check-circle').classList.toggle('displayInlineBlock');
            newItem.classList.toggle('green');
            if(newItem.classList.contains('green')){
                fetch('/markTaskCompletedUncompleted', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({
                        taskContent: taskValue,
                        completed: true
                    })
                });
            }
            else {
                fetch('/markTaskCompletedUncompleted', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({
                        taskContent: taskValue,
                        completed: false
                    })
                });
            } 
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
                this.appendNewTaskToList(task.content, task.completed, task.year, task.month, task.day, task.hour, task.minute);
            }

        });

    }

    deleteATaskFromDB(taskContent){
        fetch('/deleteATask', {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: 'DELETE',
            body: JSON.stringify({taskToDelete: taskContent})
        })
        .then()
        .catch(err => console.log(err));
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