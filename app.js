const express = require('express');
const morgan = require('morgan');

let bodyParser = require('body-parser');

// add your code here
   let items = [
        {
            todoItemId: 0,
            name: 'an item',
            priority: 3,
            completed: false
        },
        {
            todoItemId: 1,
            name: 'another item',
            priority: 2,
            completed: false
        },
        {
            todoItemId: 2,
            name: 'a done item',
            priority: 1,
            completed: true
        }
    ];
// create an express instance    
const app = express();

// apply middleware
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded - this line is required for setting up post requests to server
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json - this line is required for setting up post requests to server (type of data it will be ingesting)
app.use(bodyParser.json());

// route handler for requests to /
app.get('/', function(req, res) {
   res.json({"status": "ok"});
});

app.get('/api/TodoItems', function(req, res) {
   res.json(items);
});

app.post('/api/TodoItems', function(req, res) {
  // logic to add to the fixture  (in a fully functional API, you would add logic here)
   res.status(201).json(req.body);
});

app.get('/api/TodoItems/:id', function(req, res) {
       const id = parseInt(req.params.id);
       const item = items.find(todo => todo.todoItemId === id);

    if(item) {
        res.status(200).json(item);
    } else {
        res.json({error: 'Todo item not found'}).status(404);
    }
});



app.put('/api/TodoItems/', function(req, res) {
   res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(todo => todo.todoItemId === id);

    if (itemIndex > -1) {
        const deletedItem = items.splice(itemIndex, 1)[0];
        res.json(deletedItem);
    } else {
        res.status(404).json({ error: 'Todo item not found' });
    }
});

module.exports = app;
