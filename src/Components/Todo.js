import React from 'react';

export default class Todo extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    render(){
        return(
            <div id="todoContainer">
                <div id="todoList">
                    <div id="header">
                        <h4>Todo List</h4>
                    </div>
                    <div id="todoMainBody">
                        <input type="text" /> 
                    </div>
                </div>
            </div>
        );
    }
}
