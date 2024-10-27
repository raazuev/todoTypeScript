import React from "react";
import { ITask } from "../../store/store";

interface TaskDetailsProps {
  task: ITask;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <div className="task-details">
      <h3>{task.title}</h3>
      <p>{task.details}</p> {}
    </div>
  );
};

export default TaskDetails;