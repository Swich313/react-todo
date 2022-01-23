import React from 'react'

export default function Todo(props) {
const {todo, toggleTodo} = props;   
    function handleTodoClick () {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name}
            </label>
            
        </div>
    )
}
