import { makeObservable, observable, action } from "mobx";

class Store {
  tasks = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      markAsDone: action,
      deleteTask: action
    });
  }

  addTask(title) {
    this.tasks.push({ id: this.tasks.length, title, done: false });
  }

  markAsDone(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex].done = true;
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

const store = new Store();
export default store;