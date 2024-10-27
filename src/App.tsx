import React from "react";
import Task from "./components/Task/Task";
import TaskInput from "./components/TaskInput/TaskInput";
import store from "./store/store";
import { observer } from "mobx-react";

interface ITask {
  id: number;
  title: string;
  done: boolean;
}

@observer
class App extends React.Component {
  addTask = (title: string) => {
    store.addTask(title);
  };

  doneTask = (id: number) => {
    store.markAsDone(id);
  };

  deleteTask = (id: number) => {
    store.deleteTask(id);
  };

  render() {
    return (
      <div className="container">
        <div className="App">
          <h1 className="top">
            Активные задачи: {store.tasks.filter(task => !task.done).length}
          </h1>
          {store.tasks.map((task) => (
            <Task
              doneTask={() => this.doneTask(task.id)}
              deleteTask={() => this.deleteTask(task.id)}
              task={task}
              key={task.id}
            />
          ))}
          <TaskInput addTask={this.addTask} />
        </div>
      </div>
    );
  }
}

export default App;