import React, { useState } from "react";
import Task from "./components/Task/Task";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import store from "./store/store";
import { observer } from "mobx-react";
import { ITask } from "./store/store";

const App: React.FC = observer(() => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const addTask = (title: string) => {
    store.addTask(title);
  };

  const doneTask = (id: number) => {
    store.markAsDone(id);
  };

  const deleteTask = (id: number) => {
    store.deleteTask(id);
  };

  const addSubtask = (parentId: number, title: string) => {
    store.addTask(title); 
  };

  const handleTaskClick = (task: ITask) => {
    setSelectedTask(task);
  };

  return (
    <div className="container">
      <div className="App">
        <h1 className="top">Активные задачи: {store.tasks.filter(task => !task.done).length}</h1>
        {store.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            level={0} 
            doneTask={doneTask}
            deleteTask={deleteTask}
            addSubtask={addSubtask}
            onTaskClick={handleTaskClick} 
          />
        ))}
        <TaskInput addTask={addTask} />
      </div>
    </div>
  );
});

export default App;