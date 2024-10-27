import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./components/Task/Task";
import TaskInput from "./components/TaskInput/TaskInput";
import SearchBar from "./components/Search/SearchBar";
import TaskList from "./components/List/TaskList"; // Импортируем компонент для списка задач
import TaskDetails from "./components/List/TaskDetails"; // Импортируем компонент для деталей задачи
import store from "./store/store";
import { observer } from "mobx-react";
import { ITask } from "./store/store";
import "./sass/main.sass";

const App: React.FC = observer(() => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<string>("system-theme"); // Состояние для темы

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark-theme" : "light-theme");
    setTheme(currentTheme);
    document.body.className = currentTheme;

    prefersDarkScheme.addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark-theme" : "light-theme";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.body.className = newTheme;
    });
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const addTask = (title: string) => {
    store.addTask(title);
  };

  const doneTask = (id: number) => {
    store.markAsDone(id);
  };

  const deleteTask = (id: number) => {
    store.deleteTask(id);
  };

  const addSubtask = (parentId: number, title: string) => {
    store.addTask(title); 
  };

  const handleTaskClick = (task: ITask) => {
    setSelectedTask(task);
  };

  const filteredTasks = store.tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.subtasks && task.subtasks.some(subtask =>
      subtask.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <Router>
      <div className={`container ${theme}`}>
        <div className="App">
          <div className="header">
            <h1 className="top">Активные задачи: {filteredTasks.filter(task => !task.done).length}</h1>
            <div className="theme-toggle">
              <button onClick={() => toggleTheme("light-theme")}>Светлая</button>
              <button onClick={() => toggleTheme("dark-theme")}>Темная</button>
              <button onClick={() => toggleTheme("system-theme")}>Системная</button>
            </div>
          </div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <Routes>
            <Route path="/" element={<TaskList tasks={filteredTasks} doneTask={doneTask} deleteTask={deleteTask} addSubtask={addSubtask} onTaskClick={handleTaskClick} />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
          <TaskInput addTask={addTask} />
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              level={0} 
              doneTask={doneTask}
              deleteTask={deleteTask}
              addSubtask={addSubtask}
              onTaskClick={handleTaskClick} 
            />
          ))}
        </div>
      </div>
    </Router>
  );
});

export default App;