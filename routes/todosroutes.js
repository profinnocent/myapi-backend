// const router = require("express").Router();
const {v4} = require("uuid");

let todos = [];

const getTodos = (req, res) => {
    res.json(todos);
}

const getTodo = (req, res) => {
    const {id} = req.params;

    const todo = todos.find(todo => todo.id == id)

    if(todo != null){

    res.json(todo);

    }else{

        res.send(`Todo with this id:${id} was not found.`);

    }
}

const addTodos = (req, res) => {
    const d = new Date();
    const timestamp = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " - " + new Date().toLocaleTimeString();
    const todo = {
        id: v4(),
        task: req.body.task,
        completed: false,
        createdAt: timestamp,
        lastUpdatedAt: ""
    };

    todos.push(todo);

    res.status(200)
    res.send("Todo created successfully");
}

const updateTodo = (req, res) => {
    const {id} = req.params;
    const {task, completed} = req.body;
    let count = 0;
    const d = new Date();
    const updateTime = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " - " + new Date().toLocaleTimeString();

    if(task == null || task == "" || task == " "){

        res.send("Please enter a valid task.");

    }else{
        todos.map(todo => {
            if(todo.id === id){
                todo.task = task;
                todo.lastUpdatedAt = updateTime;
                count++;
            }
        })

        if(count === 1){
            res.send("Todo updated successfully");
        }else{
            res.send(`Todo with this id:${id} was not found.`);
        }

    }
    
}

const toggleTodo = (req, res) => {
    const {id} = req.params;
    const {completed} = req.body;
    let count = 0;
    const d = new Date();
    const updateTime = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " - " + new Date().toLocaleTimeString();

    if(completed === "true" || completed === "false"){

        todos.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                todo.lastUpdatedAt = updateTime;
                count++;
            }
        })

        if(count === 1){
            res.send("Todo toggled successfully");
        }else{
            res.send(`Todo with this id:${id} was not found.`);
        }

    }else{

        res.status(403).send("Please send a valid toggle request.");

    }
    
}

const deleteTodo = (req, res) => {
    const {id} = req.params;
    let count = 0;

    todos.forEach(todo => {
        if(todo.id === id){
            count++;
        }
    })

    if(count === 0){

        return res.send(`Todo with this id:${id} was not found.`);

    }else{

        todos = todos.filter(todo => todo.id !== id)
        res.send("Todo deleted successfully");
   
    }

}

const checkAuth = (req, res, next) => {
    if(req.header("auth") === "true"){
        next();
    }else{
        res.status(403);
        res.send("You are not authenticated.");
    }
}



module.exports = {getTodos, getTodo, addTodos, updateTodo, deleteTodo, toggleTodo, checkAuth}