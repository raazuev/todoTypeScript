import React, { useState } from "react";
import { observer } from "mobx-react";
import { ITask } from "../../store/store";

interface TaskProps {
  task: ITask;
  level: number;
  doneTask: (id: number) => void;
  deleteTask: (id: number) => void;
  addSubtask: (parentId: number, title: string) => void;
  onTaskClick: (task: ITask) => void;
}

const Task: React.FC<TaskProps> = observer(({ task, level, doneTask, deleteTask, addSubtask, onTaskClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleAddSubtask = () => {
    if (subtaskTitle) {
      addSubtask(task.id, subtaskTitle);
      setSubtaskTitle("");
    }
  };

  return (
    <div className="task" style={{ marginLeft: level * 20 }}>
      <span onClick={() => onTaskClick(task)}>{task.title}</span>
      <button onClick={() => doneTask(task.id)}>Завершить</button>
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
      <button onClick={toggleExpand}>{isExpanded ? "▲" : "▼"}</button>
      {isExpanded && (
        <>
          <input
            type="text"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            placeholder="Добавить подзадачу"
          />
          <button onClick={handleAddSubtask}>Добавить подзадачу</button>
          <div className="subtasks">
            {task.subtasks?.map((subTask: ITask) => (
              <Task
                key={subTask.id}
                task={subTask}
                level={level + 1}
                doneTask={doneTask}
                deleteTask={deleteTask}
                addSubtask={addSubtask}
                onTaskClick={onTaskClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});


export default Task;