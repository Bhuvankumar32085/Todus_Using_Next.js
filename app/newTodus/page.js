"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Edit, Trash2, Plus } from "lucide-react";
import Cookies from "js-cookie";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const getTodos = async () => {
    const res = await fetch("http://localhost:3000/route");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
    const token = Cookies.get("token");
    console.log(token);
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const res = await fetch("http://localhost:3000/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo.trim() }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTodos(data.data);
      console.log("Todo added", data.data);
      setNewTodo("");
    } else {
      console.log("Failed to add todo");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:3000/route/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(data.data);
    }
  };

  // Toggle Complete
  const toggleTodo = async (id, completed) => {
    const res = await fetch(`http://localhost:3000/route/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(data.data);
    }
  };

  // Start Editing
  const startEdit = async (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  // Save Edited Todo
  const saveEdit = async (id, title) => {
    const res = await fetch(`http://localhost:3000/route/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(data.data);
      setEditId(null);
      setEditText("");
    } else {
      console.error("Failed to update todo");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-lg mb-10 p-4 bg-gray-900 rounded-2xl shadow-md">
        <h1 className="text-2xl font-extrabold tracking-wide text-white mb-4 sm:mb-0">
          ✨ Modern Todo App
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold text-white shadow-md"
        >
          LogOut
        </button>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-8 w-full max-w-lg">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What do you want to do?"
          className="flex-1 px-4 py-3 rounded-2xl text-white  focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="w-full max-w-lg space-y-3">
        <AnimatePresence>
          {Array.isArray(todos) &&
            todos.map((todo, index) => (
              <motion.li
                key={todo._id || index} // fallback key
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-between items-center bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl shadow-md"
              >
                {/* Editing mode */}
                {editId === todo._id ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg text-black outline-none"
                    />
                    <button
                      onClick={() => saveEdit(editId, editText)}
                      className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg font-semibold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => toggleTodo(todo._id)}
                      className={`flex-1 cursor-pointer text-lg capitalize ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "hover:text-blue-400 transition"
                      }`}
                    >
                      {todo.title}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleTodo(todo._id, todo.completed)}
                        className="text-green-400 hover:text-green-500"
                      >
                        <CheckCircle size={22} />
                      </button>
                      <button
                        onClick={() => startEdit(todo._id, todo.title)}
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <Edit size={22} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
