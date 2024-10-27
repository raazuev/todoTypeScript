import React from "react";
import { Link } from "react-router-dom";
import { ITask } from "../../store/store";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <Link to={`/task/${task.id}`}>{task.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
