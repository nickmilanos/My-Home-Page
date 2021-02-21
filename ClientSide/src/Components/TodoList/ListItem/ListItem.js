import React, {useState} from 'react';
import {TrashCan} from './TrashCan';
import {updateTaskCompletion} from '../../../AJAXServices';

export function ListItem({taskCompleted, taskValue, day, month, year, hour, minute}) {
    let [taskIsCompleted, setTaskIsCompleted] = useState(taskCompleted);
    let [isTrashCanVisible, setIsTrashCanVisible] = useState(false);

    const clickItem = e => {
        updateTaskCompletion(taskValue, taskIsCompleted, setTaskIsCompleted);
    };
    const mouseEnterItem = () => setIsTrashCanVisible(true);
    const mouseLeaveItem = () => setIsTrashCanVisible(false);

    return(
        <li onClick={clickItem} onMouseEnter={mouseEnterItem} onMouseLeave={mouseLeaveItem} className="fadeIn">
            {isTrashCanVisible && <TrashCan taskValue={taskValue} />}
            <span id="taskValue" className={taskIsCompleted ? 'green': ''}>{taskValue}</span> 
            {taskIsCompleted && <i className="fas fa-check-circle" />}
            <span className="dateTime">{day}.{month}.{year} {hour}:{minute}</span>
        </li>
    );
}