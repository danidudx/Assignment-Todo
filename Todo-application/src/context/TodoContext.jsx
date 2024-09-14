import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);

  // Load todos from localStorage based on user email
  useEffect(() => {
    if (user?.email) {
      const savedTodos = localStorage.getItem(`todos_${user.email}`);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, [user]);

  // Save todos whenever there is a change
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = (todo) => setTodos([...todos, todo]);
  const editTodo = (updatedTodo) =>
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, editTodo, deleteTodo, toggleCompletion }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
