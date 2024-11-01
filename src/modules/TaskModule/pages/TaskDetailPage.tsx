import React from "react";
import { useParams } from "react-router-dom";
import store from "../store/store";

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const task = store.findTask(Number(id));

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.details}</p>
    </div>
  );
};

export default TaskDetailPage;