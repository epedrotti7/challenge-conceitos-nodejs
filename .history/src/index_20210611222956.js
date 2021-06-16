const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  const { username } = req.headers;
  const user = users.find(todos => todos.username === username);

  if (!user) {
    return res.status(400).json({ error: "User not found!" });
  }

  req.user = user;

  return next();


}

app.post('/users', (req, res) => {
  const { name, username } = req.body;

  const userAlreadyExists = users.some((user) => user.username === username);

  if (userAlreadyExists) {
    return res.status(400).json({ error: "Customer already exists!" });
  }

  const user = {
    name,
    username,
    id: uuidv4(),
    todos: []
  }

  users.push(user);

  return res.status(201).send(users);

});

app.use(checksExistsUserAccount);

app.get('/todos', (req, res) => {

  const { user } = req;

  return res.json(user.todos);

});

app.post('/todos', (req, res) => {
  const { title, deadline } = req.body;
});

app.put('/todos/:id', (req, res) => {
  // Complete aqui
});

app.patch('/todos/:id/done', (req, res) => {
  // Complete aqui
});

app.delete('/todos/:id', (req, res) => {
  // Complete aqui
});

module.exports = app;