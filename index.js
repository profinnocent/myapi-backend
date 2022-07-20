//Call express packages
const express = require("express");
const app = express();

//Run dotenv config
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

//Allow access from other specified domains
const cors = require("cors");

//For all domains
app.use(cors("*"));

//For one domain
//app.use(cors("https://prof-todos.netlify.app"));

//For mu;tiple domain
//app.use(cors({origin: ["https://prof-todos.netlify.app","https://netlify.app"}));


//Josn parser
app.use(express.json());

//For url encoded data
app.use(express.urlencoded({extended: true}))

//Route controllers
const {getTodos, getTodo, addTodos, updateTodo, deleteTodo, checkAuth, toggleTodo} = require("./routes/todosroutes");
const {getUsers, getUser, addUser, updateUser, deleteUser, loginUser, registerUser, resetUser, userAuth} = require("./routes/usersRoutes")

//Todo Routes
app.get("/todos", checkAuth, getTodos);

app.get("/todos/:id", checkAuth, getTodo);

app.post("/todos", checkAuth, addTodos);

app.put("/todos/:id", checkAuth, updateTodo);

app.put("/todos/toggle/:id", checkAuth, toggleTodo);


app.delete("/todos/:id", checkAuth, deleteTodo);

//Users DB routes
app.get("/users", getUsers);

app.get("/users/:id", getUser);

app.post("/users", addUser);

app.put("/users/:id", updateUser);

app.delete("/users/:id", deleteUser);

//Login & Reg route
app.post("/login", loginUser);

app.post("/register", registerUser);

app.post("/reset", resetUser);


app.listen(PORT, () => {
    console.log(`Sever is running at port ${HOST}:${PORT}` );
})