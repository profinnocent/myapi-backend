// const router = require("express").Router();
const {v4} = require("uuid");

let todos = [];

const getTodos = (req, res) => {
    res.json(todos);
}

const getTodo = (req, res) => {
    const {id} = req.params;

    const todo = todos.find(todo => todo.id == id)
    res.json(todo);
}

const addTodos = (req, res) => {
    const timestamp = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();
    const todo = {
        id: v4(),
        task: req.body.task,
        completed: false,
        createdAt: timestamp,
        lastUpdatedAt: ""
    };

    todos.push(todo);

    res.status(200)
    res.json(todos);
}

const updateTodo = (req, res) => {
    const {id} = req.params;
    const {task, completed} = req.body;
    const updateTime = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();

    if(task == null || task == "" || task == " "){

        res.send("Please enter a valid task.");

    }else{
        todos.map(todo => {
            if(todo.id === id){
                todo.task = task;
                todo.lastUpdatedAt = updateTime;
                res.json(todos);
            }
        })
    }
    
}

const toggleTodo = (req, res) => {
    const {id} = req.params;
    const {completed} = req.body;
    const updateTime = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();

    if(completed === "true" || completed === "false"){

        todos.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                todo.lastUpdatedAt = updateTime;
                res.json(todos);
            }
        })

    }else{

        res.status(403).send("Please send a valid toggle request.");

    }
    
}

const deleteTodo = (req, res) => {
    const {id} = req.params;

    todos = todos.filter(todo => todo.id !== id)
    res.json(todos);
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