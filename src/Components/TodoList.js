import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        document.querySelector('#list').classList.toggle("fullOpacity");
        document.querySelector('#reminderContainer').classList.toggle('zeroOpacity');
        document.querySelector('#input').focus();
        let isTodoListOpened = document.querySelector('#list').classList.contains('fullOpacity') ? true : false;
        fetch('/changeDashboardState', {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: 'PUT',
            body: JSON.stringify({
                isTodoListOpen: isTodoListOpened
            })
        })
        .then(res => res.json())
        .then(data => console.log(data.responseMessage))
        .catch(err => console.log(err));
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
            .then(res => res.json())
            .then(data => {
                this.appendNewTaskToList(myInput.value, false, date.getFullYear(), date.getMonth()+1, date.getDate(), currentHour, currentMinute);
                console.log(data.responseMessage);
            })
            .catch(err => console.log(err));
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
                fetch('/deleteATask', {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: 'DELETE',
                    body: JSON.stringify({taskToDelete: taskValue})
                })
                .then(res => res.json())
                .then(res => {
                    newTrashCan.parentNode.remove();
                    console.log(res.responseMessage);
                })
                .catch(err => console.log(err));
        });
        newItem.addEventListener('click', (event) => {
            event.target.querySelector('.fas.fa-check-circle').classList.toggle('displayInlineBlock');
            newItem.classList.toggle('green');
            let isCompleted = newItem.classList.contains('green') ? true : false;
                fetch('/markTaskCompletedUncompleted', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({
                        taskContent: taskValue,
                        completed: isCompleted
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data.responseMessage));
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

    componentDidMount(){
        this.getAllTasksFromDB();
        fetch('/getDashboardState')
            .then(res => res.json())
            .then(res => {
                if (res !== false){
                    document.querySelector('#list').classList.toggle("fullOpacity");
                    document.querySelector('#reminderContainer').classList.toggle('zeroOpacity');
                    document.querySelector('#input').focus();
                }
                console.log("TODO List is open: " + res);
            });
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