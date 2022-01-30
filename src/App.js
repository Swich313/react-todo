import React, {useState, useRef, useEffect} from "react";
import TodoList from "./components/TodoList"
// import { v4 as uuidv4 } from 'uuid'
import "./App.css"
import axios from "axios";


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
 const [todos, setTodos] = useState([])
 const todoNameRef = useRef()
 const todoDescription = useRef()

const posts = async () => {
    return axios.get('http://localhost:4000/posts')
}

useEffect(() => {
    posts().then((data) => {
        setTodos(data.data)
    })
}, []);

// useEffect(() => {
//   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
//   posts().then(data => console.log(data.data))
//   if (storedTodos) setTodos(storedTodos)
// }, []);

// useEffect(() => {
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
// }, [todos]);

 function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(item => {
    if (item._id === id){
      item.complete = !item.complete
      setTodos(newTodos)
    }
  })
 }

 async function handleAddTodo (e) {
   const title = todoNameRef.current.value
   const description = todoDescription.current.value
   const sata = await axios.post('http://localhost:4000/posts', {title, description})
   if (title === '') {return} 
    setTodos(prevTodo => {
      return [...prevTodo, sata.data]
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
        <textarea ref={todoDescription}/>
      <div className="btn-wrapper">
        <button onClick={handleAddTodo} className='green'>Add todo</button>
        <button onClick={handleDeleteTodos} className='red'>Clear completed todos</button>
      </div>
      <div className='left-todo'>
          {todos.filter(item => !item.complete).length} plans left to do</div>
      </div>
      
    </>
    
  )
}

export default App;
