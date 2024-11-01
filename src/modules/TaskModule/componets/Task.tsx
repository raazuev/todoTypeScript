import React, { useState } from "react";
import { observer } from "mobx-react";
import { Task as TaskType } from "../store/store";
import styles from '../styles/Task.module.sass';

interface TaskProps {
  task: TaskType;
  level: number;
  doneTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = observer(({ task, level, doneTask, deleteTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDetails, setNewDetails] = useState(task.details);
  const [subtaskInput, setSubtaskInput] = useState("");

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCheckboxChange = () => {
    doneTask(task.id);
    if (task.subtasks) {
      task.subtasks.forEach(subtask => doneTask(subtask.id));
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      task.title = newTitle;
      task.details = newDetails;
    }
    setIsEditing(!isEditing);
  };

  const handleAddSubtask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && subtaskInput) {
      task.subtasks?.push({
        id: Date.now(),
        title: subtaskInput,
        details: "",
        done: false,
        isSelected: false,
        subtasks: [],
      });
      setSubtaskInput("");
    }
  };

  return (
    <div className={styles.task} style={{ marginLeft: `${level * 20}px` }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEdit}
          />
          <input
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
            placeholder="Детали задачи..."
            onBlur={handleEdit}
          />
        </>
      ) : (
        <>
          <span onClick={toggleExpand}>{task.title}</span>
          {task.details && <span className={styles.details}>( {task.details} )</span>}
        </>
      )}
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
      <button onClick={handleEdit}>{isEditing ? "Сохранить" : "Редактировать"}</button>
      {isExpanded && (
        <div className={styles.subtasks}>
          {task.subtasks?.map(subtask => (
            <Task key={subtask.id} task={subtask} level={level + 1} doneTask={doneTask} deleteTask={deleteTask} />
          ))}
          <input
            placeholder="Добавить подзадачу..."
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={handleAddSubtask}
          />
        </div>
      )}
    </div>
  );
});

export default Task;