import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleCompletion } =
    useContext(TodoContext);
  const { logout } = useContext(AuthContext);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (newTodo.title && newTodo.description) {
      addTodo({ ...newTodo, id: Date.now(), completed: false });
      setNewTodo({ title: "", description: "" });
      setSuccessMessage("Todo added successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-5xl">
        {/* Todo List */}
        <div className="flex-grow pr-4 md:w-2/3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Todo List
            </h1>
            <button
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {successMessage && (
            <div
              className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-300"
              role="alert"
            >
              {successMessage}
            </div>
          )}
          {todos.length > 0 ? (
            <div className="space-y-4">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {todo.title}
                  </h5>
                  <p className="text-gray-700 dark:text-gray-400">
                    {todo.description}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      className={`text-white font-medium rounded-lg text-sm px-4 py-2 ${
                        todo.completed
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() => toggleCompletion(todo.id)}
                    >
                      {todo.completed
                        ? "Mark as Incomplete"
                        : "Mark as Complete"}
                    </button>
                    <button
                      className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-400">
              There's nothing yet added.
            </p>
          )}
        </div>

        {/* Add Todo Form */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow dark:bg-gray-800">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add a new Todo
          </h4>
          <input
            type="text"
            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <textarea
            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <button
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
