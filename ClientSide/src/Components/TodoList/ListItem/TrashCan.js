import React from 'react';
import {ajaxCall} from '../../../AJAXCallWrapper';
import {apiEndpoints} from '../../../Constants';

export function TrashCan(props) {
    const deleteTask = () => ajaxCall("DELETE", apiEndpoints.deleteTaskURL, {taskToDelete: props.taskValue})

    const onClickHandler = (e) => {
        const targetedTrashCan = e.currentTarget;
        e.stopPropagation();
        deleteTask()
            .then(() => targetedTrashCan.parentNode.remove())
            .catch(err => console.log(err));
    };

    return(
        <i className="fas fa-times" onClick={onClickHandler}/>
    );
}