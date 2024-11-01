import React, { useState } from "react";
import styles from '../styles/TaskInput.module.sass';

interface Props {
  addTask: (title: string, details?: string) => void;
}

const TaskInput: React.FC<Props> = ({ addTask }) => {
  const [input, setInput] = useState("");
  const [details, setDetails] = useState("");

  const handleAddTask = () => {
    if (input) {
      addTask(input, details);
      setInput("");
      setDetails("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className={styles.taskInput}>
      <input
        placeholder="Название задачи..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
};

export default TaskInput;