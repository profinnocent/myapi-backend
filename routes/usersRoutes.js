// const router = require("express").Router();
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

let users = [];

const getUsers = (req, res) => {
  res.status(200);
  res.json(users);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id == id);

  if (user != null) {
    res.json(todo);
  } else {
    res.send(`Todo with this id:${id} was not found.`);
  }
};

const addUser = (req, res) => {
  const d = new Date();
  const timestamp =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " - " +
    new Date().toLocaleTimeString();
  const user = {
    id: v4(),
    task: req.body.task,
    completed: false,
    createdAt: timestamp,
    lastUpdatedAt: "",
  };

  users.push(user);

  res.status(200);
  res.send("Todo created successfully");
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  let count = 0;
  const d = new Date();
  const updateTime =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " - " +
    new Date().toLocaleTimeString();

  if (task == null || task == "" || task == " ") {
    res.send("Please enter a valid task.");
  } else {
    users.map((user) => {
      if (user.id === id) {
        user.task = task;
        user.lastUpdatedAt = updateTime;
        count++;
      }
    });

    if (count === 1) {
      res.send("Todo updated successfully");
    } else {
      res.send(`Todo with this id:${id} was not found.`);
    }
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  let count = 0;

  users.forEach((user) => {
    if (user.id === id) {
      count++;
    }
  });

  if (count === 0) {
    return res.send(`Todo with this id:${id} was not found.`);
  } else {
    users = users.filter((user) => user.id !== id);
    res.send("Todo deleted successfully");
  }
};

//User Login & Reg

const loginUser = (req, res) => {

    bcrypt.compare(req.body.password, dbuser.password, (err, result) => {
        if(result == true){
    
        }else{
            res.status(403).send("Wrong login details. Failed to login.")
        }
    })

  const { id } = req.params;
  let count = 0;

  users.forEach((user) => {
    if (user.id === id) {
      count++;
    }
  });

  if (count === 0) {
    return res.send(`Todo with this id:${id} was not found.`);
  } else {
    users = users.filter((user) => user.id !== id);
    res.send("Todo deleted successfully");
  }
};


//
const registerUser = async (req, res) => {
//if(users.length != 0)

  let errmessage = "";
  let count = 0;
  const d = new Date();
  const timestamp = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " - " + new Date().toLocaleTimeString();
  
  console.log(req.body)

  // generate salt to hash password
  //const salt = await bcrypt.genSalt(10);

 // let hashpassword = await bcrypt.hash(req.body.password, 10);
    
  // let hashpassword = await bcrypt.hash(req.body.password, salt, (err) => {
  //   if (err) {
  //     const errmessage = "err403";
  //     console.log(err)
  //   }
  // });

  const user = {
    id: v4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phoneno: req.body.phoneno,
    email: req.body.email,
    password : req.body.password,
    isAuth: false,
    isLoggedin: false,
    createdAt: timestamp,
    lastUpdatedAt: "",
  };

  console.log(user);

  if(errmessage == "err403"){

    res.status(403).send("Password hash failed. Can not create User.");

  }else{

    users.map((dbuser) => {
      if (dbuser.email === user.email) {
        count++;
        //break;
      }
    });

    if (count === 1) {

      res.status(403).send("This user email is already registered. Pls choose a different email.");

    }else{

        users.push(user);

        res.status(200).send("User created successfully");
    
    }
  }
};

const resetUser = (req, res) => {
  const { id } = req.params;
  let count = 0;

  users.forEach((user) => {
    if (user.id === id) {
      count++;
    }
  });

  if (count === 0) {
    return res.send(`Todo with this id:${id} was not found.`);
  } else {
    users = users.filter((user) => user.id !== id);
    res.send("Todo deleted successfully");
  }
};

const userAuth = (req, res, next) => {
    if(req.header("auth") === "true"){
        next();
    }else{
        res.status(403);
        res.send("You are not authenticated to created user.");
    }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  resetUser,
  userAuth
};
