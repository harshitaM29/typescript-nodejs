"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    return res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    return res.status(200).json({ todo: newTodo });
});
router.delete('/todo-delete/:id', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(item => item.id !== params.id);
    res.status(200).json({ message: 'Deleted successfully', todos: todos });
});
router.put('/todo-edit/:id', (req, res, next) => {
    const params = req.params;
    const index = todos.findIndex(item => item.id === params.id);
    if (index >= 0) {
        todos[index] = { id: todos[index].id, text: req.body.text };
        return res.status(200).json({ message: 'updated successfully', todos: todos });
    }
    else {
        res.status(404).json({ message: 'todo not found' });
    }
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
});
exports.default = router;
