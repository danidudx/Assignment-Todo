import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleCompletion } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (newTodo.title && newTodo.description) {
      addTodo({ ...newTodo, id: Date.now(), completed: false });
      setNewTodo({ title: '', description: '' });
      setSuccessMessage('Todo added successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Todo List</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

      <div className="list-group mt-3">
        {todos.map((todo) => (
          <div key={todo.id} className="list-group-item">
            <h5>{todo.title}</h5>
            <p>{todo.description}</p>
            <button className="btn btn-success me-2" onClick={() => toggleCompletion(todo.id)}>
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h4>Add a new Todo</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;
