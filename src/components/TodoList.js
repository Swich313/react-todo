import React from 'react'
import Todo from './Todo'

export default function TodoList({todoList, toggleTodo}) {
    return (
       todoList.map(i =>{
        return <Todo  key={i._id} todo={i} toggleTodo={toggleTodo} />
             
       })
       
    )
}
