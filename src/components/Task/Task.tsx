import React from "react";

interface Props {
  task: {
    id: number;
    title: string;
    done: boolean;
  };
  doneTask: () => void;
  deleteTask: () => void;
}

const Task: React.FC<Props> = ({ task, doneTask, deleteTask }) => {

  const ActionBtn = () =>
    <div className="action-btn">
      {!task.done ? (
        <p onClick={doneTask}>✔️</p>
      ) : (
        <p onClick={deleteTask}>❌</p>
      )}
    </div>

  const className = 'task ' + (task.done ? 'task-done' : '')

  return (
    <div className={className}>
      <p>{task.title}</p>
      <ActionBtn></ActionBtn>
    </div>
  );
};

export default Task;