import { useEffect, useState } from "react";
import Axios from "axios"
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import AddTodo from "./AddTodo"
import UpdateTodo from "./UpdateTodo";
const DeleteTodo= ({Id, onDelete})=>{
    const handleDelete= async()=>{
        const{data:responseData}= await Axios.delete(`http://localhost:1234/Todos/`, {
            data:{id:Id}
        })
        console.log(responseData)
        if (onDelete) onDelete()
    }
    return<div>
        <Button onClick={handleDelete} aria-label="Cancel" icon="pi pi-trash" className="delete"/>
    </div>
}
const UpdateComplete= ({Id, onComplete})=>{
    const handleComplete= async()=>{
        const{data:responseData}= await Axios.put(`http://localhost:1234/Todos/complete/${Id}`, {
         })
        console.log(responseData)
        if (onComplete) onComplete()
        
    }
    return<div>
        <Button onClick={handleComplete} icon="pi pi-check" className="complete"/>
    </div>
}
const TodoList=()=>{
    const [todos, setTodos]= useState([])
    const fetchTodos= async()=>{
        const {data}= await Axios.get("http://localhost:1234/Todos/")
        setTodos(data)
    }
    useEffect(()=>{
        fetchTodos()
    }, [])
    if(todos.length===0) return <h2>no todos</h2>
    return <>
    <div>
        <AddTodo onAdd={fetchTodos} />
        {todos.map((todo, index)=>{
            return <div style={{ backgroundColor: '#Fde6a1'}} className="item">
                {todo.title}
                <br/>
                <UpdateTodo onUpdate={fetchTodos} Id={todo._id} />
                <DeleteTodo onDelete={fetchTodos} Id={todo._id}/>
                <UpdateComplete onComplete={fetchTodos} Id={todo._id}/>
                </div>
        })}
    </div>
    </>
}
export default TodoList