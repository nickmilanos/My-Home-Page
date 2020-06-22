import React, {useState, useEffect} from 'react';
import {GoChecklist} from 'react-icons/go';
import {ListItem} from './ListItem';

export default function TodoList() {
    let [listItems, setListItems] = useState([]);
    let [isListVisible, setIsListVisible] = useState('');
    let [inputValue, setInputValue] = useState('');

    const onClickHandler = () => {
        document.querySelector('#input').focus();
        fetch('/changeDashboardState', {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: 'PUT',
            body: JSON.stringify({
                isTodoListOpen: !isListVisible
            })
        })
        .then(res => res.json())
        .then(data => console.log(data.responseMessage))
        .catch(err => console.log(err));
        setIsListVisible(!isListVisible); 
    }

    const onKeyPressHandler = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            const date = new Date();
            let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

            // Save task to database
            fetch('/saveNewTask', {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: 'POST',
                body: JSON.stringify({newTask: inputValue,
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
                appendNewTaskToList(inputValue, false, date.getFullYear(), date.getMonth()+1, date.getDate(), currentHour, currentMinute);
                console.log(data.responseMessage);
            })
            .catch(err => console.log(err));
        }     
    }

    const onChangeHandler = e => {
        setInputValue(e.target.value);
    } 

    const appendNewTaskToList = (taskValue, taskCompleted, year, month, day, hour, minute) => {
        setInputValue('');
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
                setIsListVisible(res)
                if(res) document.querySelector('#input').focus();
            });
    }, []);

    return(
        <div id="todoListContainer">
            <span className='sideButtons' onClick={onClickHandler}><GoChecklist /></span>
            <div id="list" 
                 className={isListVisible ? "fullOpacity" : ""}
            >
                <h5>Things to do</h5>
                <input type="text" placeholder="New Task" id="input" onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={inputValue} />
                <div id='ulWrapper'>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}