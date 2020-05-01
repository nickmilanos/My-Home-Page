import React from 'react';

export function TrashCan(props) {
    const clickOnTrashCan = e => {
        const targetedTrashCan = e.currentTarget;
        e.stopPropagation();
        fetch('/deleteATask', {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: 'DELETE',
            body: JSON.stringify({taskToDelete: props.taskValue})
        })
        .then(res => res.json())
        .then(res => {
            targetedTrashCan.parentNode.remove();
            console.log(res.responseMessage);
        })
        .catch(err => console.log(err));
    };

    return(
        <i className="fas fa-times" onClick={clickOnTrashCan}/>
    );
}