import React from "react";
import { observer } from "mobx-react";
import store from "../../store/store";
import Task from "../Task/Task";
import { ITask } from "../../store/store";

interface TaskListProps {
  tasks: ITask[];
  doneTask: (id: number) => void;
  deleteTask: (id: number) => void;
  addSubtask: (parentId: number, title: string) => void;
  onTaskClick: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = observer(({ tasks, doneTask, deleteTask, addSubtask, onTaskClick }) => {
  const activeTasks = tasks.filter(task => !task.done);
  const completedTasks = tasks.filter(task => task.done);

  return (
    <div className="task-section">
      <div className="active-tasks">
        <h2>Активные задачи</h2>
        {activeTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            level={0} 
            doneTask={doneTask}
            deleteTask={deleteTask}
            addSubtask={addSubtask}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      <div className="completed-tasks">
        <h2>Завершенные задачи</h2>
        {completedTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            level={0}
            doneTask={doneTask}
            deleteTask={deleteTask}
            addSubtask={addSubtask}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      <div className="deleted-tasks">
        <h2>Удаленные задачи</h2>
        {}
      </div>
    </div>
  );
});

export default TaskList;