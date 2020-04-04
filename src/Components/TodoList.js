import React, {useState, useEffect} from 'react';
import {GoChecklist} from 'react-icons/go';
import ListItem from './ListItem';

export default function TodoList() {
    let [listItems, setListItems] = useState([]);
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
        const myInput = document.querySelector('#input');
        myInput.value = "";
        setListItems(listItems => [...listItems,<ListItem 
                            taskValue={taskValue} 
                            taskCompleted={taskCompleted}
                            year={year} 
                            month={month} 
                            day={day} 
                            hour={hour} 
                            minute={minute} 
                            key={taskValue}
                      />]);
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
    const myHeader = <h5>Things to do</h5>;
    const myRenderedInput = <input 
                                type="text" 
                                placeholder="New Task" 
                                id="input" 
                                onKeyPress={onKeyPressHandler} 
                            />;
    return(
        <div id="todoListContainer">
            <span className="sideButtons" onClick={onClickHandler}><GoChecklist /></span>
            <div id="list">
                {myHeader}
                {myRenderedInput}                
                <div id='ulWrapper'>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}