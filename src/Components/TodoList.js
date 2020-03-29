import React, {useState, useEffect} from 'react';
import {GoChecklist} from 'react-icons/go';

export default function TodoList() {
    const onClickHandler = () => {
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

    const onKeyPressHandler = (event) => {
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
                appendNewTaskToList(myInput.value, false, date.getFullYear(), date.getMonth()+1, date.getDate(), currentHour, currentMinute);
                console.log(data.responseMessage);
            })
            .catch(err => console.log(err));
        }     
    }

    const appendNewTaskToList = (taskValue, taskCompleted, year, month, day, hour, minute) => {
        let myList = document.querySelector('ul');
        let myInput = document.querySelector('#input');
        myInput.value = "";
        let newItem = document.createElement('li');
        newItem.classList.add('fadeIn');
        let newTrashCan = document.createElement('span');
        newTrashCan.innerHTML = `<i class="fas fa-times"></i>`;
        let contentAndDate = document.createElement('span');
        contentAndDate.innerHTML = `<span id="taskValue">${taskValue}</span> <span class="dateTime">${day}.${month}.${year} ${hour}:${minute}</span>`;
        let checkCircle = document.createElement('span');
        checkCircle.innerHTML = ` <i class="fas fa-check-circle"></i>`;
        newItem.append(newTrashCan);
        newItem.append(contentAndDate);
        newItem.append(checkCircle);
        myList.append(newItem);
        if(taskCompleted) {
            newItem.children[1].children[0].classList.add('green');
            newItem.children[2].children[0].classList.add('displayInlineBlock');
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
            newItem.children[2].children[0].classList.toggle('displayInlineBlock');
            newItem.children[1].children[0].classList.toggle('green');
            let isCompleted = newItem.children[1].children[0].classList.contains('green') ? true : false;
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
            event.target.querySelector('.fas.fa-times').classList.toggle('fullOpacity');
        });
        newItem.addEventListener('mouseleave', (event) => {
            event.target.querySelector('.fas.fa-times').classList.toggle('fullOpacity');
        });
    }

    const getAllTasksFromDB = () => {
        fetch('/getAllTasks')
        .then(res => res.json())
        .then(tasks =>{
            for(let task of tasks){
                appendNewTaskToList(task.content, task.completed, task.year, task.month, task.day, task.hour, task.minute);
            }
        });
    }

    useEffect(() => {
        getAllTasksFromDB();
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
    }, []);

    return(
        <div id="todoListContainer">
            <span className="sideButtons" onClick={onClickHandler}><GoChecklist /></span>
            <div id="list">
                <h5>Things to do</h5>
                <input type="text" placeholder="New Task" id="input" onKeyPress={onKeyPressHandler}></input>
                <div id='ulWrapper'>
                    <ul>
                    </ul>
                </div>
            </div>
        </div>
    );
}