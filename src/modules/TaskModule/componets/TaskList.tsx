import React from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import Task from "./Task";
import TaskInput from "./TaskInput";
import { Task as TaskType } from "../store/store";
import styles from '../styles/TaskList.module.sass';

const TaskList: React.FC<{ searchTerm: string }> = observer(({ searchTerm }) => {
  return (
    <div className={styles.taskSection}>
      {store.tasks.filter(task => task.title.includes(searchTerm)).map(task => (
        <Task
          key={task.id}
          task={task}
          level={0}
          doneTask={store.markAsDone.bind(store)}
          deleteTask={store.deleteTask.bind(store)}
        />
      ))}
    </div>
  );
});

export default TaskList;