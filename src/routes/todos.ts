import { Router } from 'express';
import { Todo } from '../models/todo';

const router = Router();

type RequestBody = { text: string };
type RequestParams = { id: string };

let todos: Todo[] = [];
router.get('/', (req,res,next) => {     
   return res.status(200).json({ todos: todos});

});

router.post('/todo', (req,res,next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    return res.status(200).json({ todo: newTodo});
});

router.delete('/todo-delete/:id', (req,res,next) => {
   const params = req.params as RequestParams;
    
    todos = todos.filter(item => item.id !== params.id)
    res.status(200).json({ message:'Deleted successfully', todos: todos});

});

router.put('/todo-edit/:id', (req,res,next) => {
    const params = req.params as RequestParams;
    const index = todos.findIndex(item => item.id === params.id);
    if(index >= 0) {
        todos[index] = { id: todos[index].id, text:req.body.text};
        return res.status(200).json({ message: 'updated successfully', todos: todos})
    } else {
        res.status(404).json({ message: 'todo not found'});
    }
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text:req.body.text
    };
    todos.push(newTodo);

})



export default router;
