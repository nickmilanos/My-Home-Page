import React, {useEffect} from 'react';
import TrashCan from './TrashCan';

export default function ListItem(props) {
    const clickItem = e => {
        e.currentTarget.querySelector('.fas.fa-check-circle').classList.toggle('displayInlineBlock');
        e.currentTarget.querySelector('#taskValue').classList.toggle('green');
        let isCompleted = e.currentTarget.querySelector('#taskValue').classList.contains('green') ? true : false;
            fetch('/markTaskCompletedUncompleted', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    taskContent: props.taskValue,
                    completed: isCompleted
                })
            })
            .then(res => res.json())
            .then(data => console.log(data.responseMessage));
    };
    const mouseEnterItem = e => {
        e.currentTarget.querySelector('.fas.fa-times').classList.toggle('fullOpacity');
    };
    const mouseLeaveItem = e => {
        e.currentTarget.querySelector('.fas.fa-times').classList.toggle('fullOpacity');
    };

    useEffect(() => {
        if(props.taskCompleted) {
            document.querySelector('#taskValue').classList.add('green');
            document.querySelector('.fas.fa-check-circle').classList.add('displayInlineBlock');
        }  
    }, []);

    return(
        <li onClick={clickItem} onMouseEnter={mouseEnterItem} onMouseLeave={mouseLeaveItem} className="fadeIn">
            <TrashCan taskValue={props.taskValue}/>
            <span id="taskValue">{props.taskValue}</span> 
            <span className="dateTime">{props.day}.{props.month}.{props.year} {props.hour}:{props.minute}</span>
            <i className="fas fa-check-circle" />
        </li>
    );
}