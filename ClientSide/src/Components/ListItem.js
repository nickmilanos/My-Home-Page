import React, {useState} from 'react';
import {TrashCan} from './TrashCan';

export function ListItem(props) {
    let [taskCompleted, setTaskCompleted] = useState(props.taskCompleted);
    let [isTrashCanVisible, setIsTrashCanVisible] = useState(false);
    const clickItem = e => {
        setTaskCompleted(!taskCompleted);
        //fetch('/markTaskCompletedUncompleted', {
        //    method: 'PUT',
        //    headers: {
        //        "Content-Type": "application/json;charset=utf-8"
        //    },
        //    body: JSON.stringify({
        //        taskContent: props.taskValue,
        //        completed: !taskCompleted
        //    })
        //})
        //.then(res => res.json())
        //.then(data => console.log(data.responseMessage));
    };
    const mouseEnterItem = _ => setIsTrashCanVisible(true);
    const mouseLeaveItem = _ => setIsTrashCanVisible(false);

    return(
        <li onClick={clickItem} onMouseEnter={mouseEnterItem} onMouseLeave={mouseLeaveItem} className="fadeIn">
            {isTrashCanVisible ? <TrashCan taskValue={props.taskValue} /> : null}
            <span id="taskValue" className={taskCompleted ? 'green': ''}>{props.taskValue}</span> 
            {taskCompleted ? <i className="fas fa-check-circle" /> : null}
            <span className="dateTime">{props.day}.{props.month}.{props.year} {props.hour}:{props.minute}</span>
        </li>
    );
}