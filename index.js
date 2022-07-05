//Run dotenv config
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");
const app = express();

//Josn parser
app.use(express.json());

//Route controllers
const {getTodos, getTodo, addTodos, updateTodo, deleteTodo, checkAuth, toggleTodo} = require("./routes/todosroutes");

//Create get route
app.get("/todos", checkAuth, getTodos);

app.get("/todos/:id", checkAuth, getTodo);

app.post("/todos", checkAuth, addTodos);

app.put("/todos/:id", checkAuth, updateTodo);

app.put("/todos/toggle/:id", checkAuth, toggleTodo);


app.delete("/todos/:id", checkAuth, deleteTodo);


app.listen(PORT, () => {
    console.log(`Sever is running at port ${HOST}:${PORT}` );
})