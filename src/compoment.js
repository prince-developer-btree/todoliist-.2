import React, { useState } from "react";

function TodoList() {
  // Step 2a: Start with some tasks
  const [todos, setTodos] = useState([
    { text: "Buy groceries", completed: false },
    { text: "Finish homework", completed: false },
    { text: "Call mom", completed: false }
  ]);

  // Step 2b: Function to toggle checkbox
  const toggleTodo = (index) => {
    const newTodos = [...todos]; // copy list
    newTodos[index].completed = !newTodos[index].completed; // flip true/false
    setTodos(newTodos); // update state
  };

  return (
    <div>
      <h2>My To-Do List</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            {/* Task text */}
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
