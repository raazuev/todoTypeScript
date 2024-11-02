import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { TaskInput } from '../../TaskModule';
import { TaskList } from '../../TaskModule';
import { ThemeToggle } from "../../CoreModule";
import { SearchBar } from "../../SearchModule";
import store from "../store/store";
import styles from '../styles/TaskPage.module.sass';

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
      <div className={styles.header}>
        <h1>Список задач</h1>
        <ThemeToggle toggleTheme={toggleTheme} />
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <h2 className="top">Активные задачи: {store.activeTasks.length}</h2>
      <TaskInput addTask={addTask} />
      <TaskList searchTerm={searchTerm} />
    </div>
  );
});

export default TasksPage;