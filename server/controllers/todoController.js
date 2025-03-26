const Todo= require("../models/Todo")
const createNewTodo= async(req, res)=>{
    const{title,tags,completed}= req.body
    if(!title){
        return res.status(400).json({message: 'title is required'})
    }

    const todo= await Todo.create({title,tags,completed})
    if(todo){
        return res.status(201).json({ message: 'New todo created'})
    }
    else{
        return res.status(400).json({ message: 'Invalid todo'})
    }
}

const getAllTodos= async(req,res)=>{
    const todos=await Todo.find().lean()
    if(!todos?.length){
        return res.status(400).json({message: 'No todos found'})
    }
    res.json(todos)
}


const updateTodo= async(req,res)=>{
    const {id, title,tags}= req.body
    if(!id&&(!title||!tags)){
        return res.status(400).json({message: 'fields are required'})
    }
    const todo= await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({ message: 'Todo not found'})
    }
    todo.title= title
    todo.tags=tags
    const updateTodo= await todo.save()
    res.json(`${updateTodo.title}update`)
}

const deleteTodo= async(req,res)=>{
    const{id}=req.body
    const todo= await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({ message: 'Todo not found'})
    }
    const result= await todo.deleteOne()
    const reply= `Todo ${result.title} ID ${result.id} deleted`
    res.json(reply)
}
const getTodoById= async(req,res)=>{
    const {id}= req.params
    const todo=await Todo.findById(id).lean()
    if(!todo){
        return res.status(400).json({ message: 'Todo not found'})
    }
    res.json(todo)
}

const updateTodoComplete = async (req, res) => {
    const { id } = req.params
    const todo=await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({ message: 'Todo not found'})
    }
    todo.completed= !todo.completed
    const updateTodo= await todo.save()
    res.json(`'${updateTodo.title}'update`)
}
/*const updateTodoComplete = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id).exec();

    if (!todo) {
        return res.status(400).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json({ message: `'${updatedTodo.title}' updated` });
};*/

module.exports = {
    getAllTodos,
    createNewTodo,
    getTodoById,
    updateTodo,
    updateTodoComplete,
    deleteTodo
    }