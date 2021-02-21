import React, {useState, useEffect} from 'react';
import {GoChecklist} from 'react-icons/go';
import {ListItem} from './ListItem/ListItem';
import {ajaxCall} from '../../AJAXCallWrapper';
import {httpMethods, apiEndpoints} from '../../Constants';
import {getDashboardState} from '../../AJAXServices';

export default function TodoList() {
    let [listItems, setListItems] = useState([]);
    let [isListVisible, setIsListVisible] = useState('');
    let [inputValue, setInputValue] = useState('');

    const updateDashboardState = () => {
        ajaxCall(httpMethods.PUT, apiEndpoints.setDashboardStateURL, {isTodoListOpen: !isListVisible})
            .then(() => setIsListVisible(!isListVisible))
            .catch(err => console.log(err));
    }

    const getAllTasks= () => {
        ajaxCall(httpMethods.GET, apiEndpoints.getAllTasksURL)
            .then(res => setListItems([...res]))
            .catch(err => console.log(err));
    }

    const insertNewTask = (inputValue) => {
        ajaxCall(httpMethods.POST, apiEndpoints.insertNewTaskURL, {newTask: inputValue, taskCompleted: false})
            .then(data => getAllTasks())
            .catch(err => console.log(err));
    }

    const onClickHandler = () => {
        document.querySelector('#input').focus();
        updateDashboardState();
    }

    const onKeyPressHandler = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            const date = new Date();
            let currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            let currentMinute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            insertNewTask(inputValue);
        }     
    }

    const onChangeHandler = e => setInputValue(e.target.value);

    useEffect(() => {
        getDashboardState(setIsListVisible);
        getAllTasks();
    }, []);

    return(
        <div className="todoList">
            <span className='sideButtons' onClick={onClickHandler}><GoChecklist /></span>
            <div id="list" className={isListVisible ? "fullOpacity" : ""}>
                <h5>Just do it!</h5>
                <input type="text" placeholder="New Task" id="input" onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={inputValue} />
                <div id='ulWrapper'>
                    <ul> 
                        {listItems.map((listItem, index) => <ListItem key={index} taskValue={listItem.Content} taskCompleted={listItem.Completed} />)}
                    </ul>
                </div>
            </div>
        </div>
    );
}