import { makeAutoObservable } from "mobx";

interface ITask {
  id: number;
  title: string;
  done: boolean;
}

class Store {
  tasks: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title: string) {
    this.tasks.push({ id: this.tasks.length, title, done: false });
  }

  markAsDone(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.done = true;
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

const store = new Store();
export default store;