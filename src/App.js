import React from "react";
import Task from "./components/Task";
import TaskInput from "./components/TaskInput";
import store from "./store";
import { observer } from "mobx-react";

class App extends React.Component {
  addTask = task => {
    store.addTask(task);
  };

  doneTask = id => {
    store.markAsDone(id);
  };

  deleteTask = id => {
    store.deleteTask(id);
  };

  render() {
    const { tasks } = store;

    return (
      <div className="container">
        <div className="App">
          <h1 className="top">Активные задачи: {tasks.filter(task => !task.done).length}</h1>
          {tasks.map((task) => (
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

export default observer(App);