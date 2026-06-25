import { useState, useEffect } from "react";
import "../styles/Todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

        // Get existing tasks from localStorage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Check if the new task already exists (case-insensitive)
  const isDuplicate = storedTasks.some(
    (t) => t.toLowerCase() === task.toLowerCase()
  );

  if (isDuplicate) {
    alert("⚠️ Task already exists!");
    return;
  }

    if (editIndex !== null) {
        
    
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditIndex(null);
    } else {
      
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    setTask(tasks[index]);   // load the task into input
    setEditIndex(index);     // remember which task is being edited
  };

  return (
    <div className="todo-container">
      <h2>My Todo List</h2>

      <input
        className="todo-input"
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="add-btn" onClick={addOrUpdateTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul className="task-list">
        {tasks.map((item, index) => (
          <li key={index}>
            {item}
            <button className="edit-btn" onClick={() => editTask(index)}>
              ✏️ Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
      
      <style>
        {
            `
            .edit-btn {
            background-color:#4274D9;
            color:#ffff;
            padding:5px 5px;
            margin:0px 2px 0px 7px;
            border-radius:10px;
            border:none

        }
             .delete-btn {
            background-color:red;
            color:#ffff;
            padding:5px 5px;
            margin:0px 2px 0px 7px;
            border-radius:10px;
            border:none

        }
            `
        }
      </style>
    </div>
  );
}

export default Todo;
