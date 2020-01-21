import React from 'react';
import {GoChecklist} from 'react-icons/go';

export default class TodoList extends React.Component{
    render(){
        return(
            <div id="todoListContainer">
                <span><GoChecklist /></span>
            </div>
        );
    }
    


}