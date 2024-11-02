import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import store from "../store/store";
import Task from "./Task";
import TaskInput from "./TaskInput";
import styles from '../styles/TaskList.module.sass';

const TaskList: React.FC<{ searchTerm: string }> = observer(({ searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const filteredTasks = store.tasks.filter(task => task.title.includes(searchTerm));
    if (filteredTasks.length > 5) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [searchTerm, store.tasks.length]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredTasks = store.tasks.filter(task => task.title.includes(searchTerm));
  const tasksToShow = isExpanded ? filteredTasks : filteredTasks.slice(0, 5);

  return (
    <div className={styles.taskSection}>
      {filteredTasks.length === 0 ? ( 
        <h2 className={styles.noTasks}>Нет задач</h2>
      ) : (
        <>
          {tasksToShow.map(task => (
            <Task
              key={task.id}
              task={task}
              level={0}
              doneTask={store.markAsDone.bind(store)}
              deleteTask={store.deleteTask.bind(store)}
            />
          ))}
          {filteredTasks.length > 5 && (
            <button onClick={toggleExpand} className={styles.toggleButton}>
              {isExpanded ? "Свернуть" : "Развернуть"} все задачи
            </button>
          )}
        </>
      )}
    </div>
  );
});

export default TaskList;