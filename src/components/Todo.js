import React from 'react'
import "./Todo.css"

export default function Todo(props) {
const {todo, toggleTodo} = props;   
    function handleTodoClick () {
        toggleTodo(todo._id)
    }
    return (
        <div className="list" >
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.title}
            </label>
            
        </div>
    )
}
