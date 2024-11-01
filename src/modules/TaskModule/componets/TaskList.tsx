// src/modules/TaskModule/components/TaskList.tsx
import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import Task from "./Task";
import { Task as TaskType } from "../store/store";
import styles from '../styles/TaskList.module.sass';

const TaskList: React.FC<{ searchTerm: string }> = observer(({ searchTerm }) => {
  return (
    <div className={styles.taskSection}>
      <h2>Задачи</h2>
      {store.tasks.filter(task => task.title.includes(searchTerm)).map(task => (
        <Task
          key={task.id}
          task={task}
          level={0}
          doneTask={store.markAsDone.bind(store)} // Привязываем контекст
          deleteTask={store.deleteTask.bind(store)} // Привязываем контекст
        />
      ))}
    </div>
  );
});

export default TaskList;