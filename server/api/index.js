const express = require('express');

const router = express.Router();

let todos = {};

router
  .route('/todos')
  .get((req, res) => {
    let result = [];
    for (let id in todos) {
      result.push(todos[id]);
    }
    res.json(result);
  })
  .post((req, res) => {
    todos[req.body.id] = req.body;
    res.json(todos[req.body.id]);
  });

router
  .route('/todos/:todoId')
  .get((req, res) => res.json(todos[req.params.todoId]))
  .put((req, res) => {
    todos[req.params.id] = req.body;
    return todos[req.params.todoId];
  })
  .delete((req, res) => {
    delete todos[req.params.id];
    res.json({ status: 0 });
  });

module.exports = router;
