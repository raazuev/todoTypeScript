// src/modules/TaskModule/pages/TaskPage.tsx
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { TaskInput } from '../../TaskModule';
import { TaskList } from '../../TaskModule';
import { ThemeToggle } from "../../CoreModule";
import { SearchBar } from "../../SearchModule";
import store from "../store/store";
import '../styles/TaskPage.module.sass';

const TasksPage: React.FC = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<string>("system-theme");

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

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <h1 className="top">Активные задачи: {store.activeTasks.length}</h1>
        <ThemeToggle toggleTheme={toggleTheme} />
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TaskInput addTask={addTask} />
      <TaskList searchTerm={searchTerm} /> {/* Передаем searchTerm */}
    </div>
  );
});

export default TasksPage;