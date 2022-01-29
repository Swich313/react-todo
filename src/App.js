import React, {useState, useRef, useEffect} from "react";
import TodoList from "./components/TodoList"
import { v4 as uuidv4 } from 'uuid'
import "./App.css"


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
 const [todos, setTodos] = useState([])
 const todoNameRef = useRef()

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, []);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos]);

 function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(item => {
    if (item.id === id){
      item.complete = !item.complete
      setTodos(newTodos)
    }
  })
 }

 function handleAddTodo (e) {
   const name = todoNameRef.current.value
   if (name === '') {return} 
    setTodos(prevTodo => {
      return [...prevTodo, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
 }

function handleDeleteTodos () {
  const newTodos = todos.filter(item => !item.complete)
  setTodos(newTodos)
}


return (
    <>
      <div className="list-wrapper">
      <h1 className="heading">Don't Forget To...</h1>
      <TodoList todoList={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" className="input-form" placeholder="What are you planning to do?"/>
      <div className="btn-wrapper">
      <button onClick={handleAddTodo} className='green'>Add todo</button>
      <button onClick={handleDeleteTodos} className='red'>Clear completed todos</button>
      </div>
      <div className='left-todo'>{todos.filter(item => !item.complete).length} plans left to do</div>
      </div>
      
    </>
    
  )
}

export default App;
