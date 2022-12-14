const express = require('express')
const app = express()
const path = require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const { Todo } = require("./models");

app.get('/', function (request, response) {
  response.render("index"); // index refers to index.ejs
})

app.get('/todos', function (request, response) {
  console.log('Processing list of all Todos ...')
  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
})

app.get('/todos/:id', function (request, response) {
  console.log('Looking for Todo with ID: ', request.params.id)
  // First, we have to query our database to get details of a Todo with a specific ID.
  // Then, we have to respond back:
  // response.send(todo)
})

app.post('/todos', async function (request, response) {
  console.log('Creating new Todo: ', request.body)
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);   
  } catch (error) {
    console.log(error)
    return response.status(422).json(error);    
  }
})

app.put('/todos/:id/markAsCompleted', async function (request, response) {
  console.log('We have to update a Todo with ID: ', request.params.id)
  const todo = await Todo.findByPk(request.params.id)
  try {
    const updatedTodo = await todo.markAsCompleted()
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error)
    return response.status(422).json(error);   
  }
})

app.delete('/todos/:id', function (request, response) {
  console.log('We have to delete a Todo with ID: ', request.params.id)
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with some simplete message like "To-Do deleted successfully":
  // response.send("Todo deleted successfully")
})

app.listen(3000, () => {
  console.log("Started at port: ", 3000)
})