import { makeAutoObservable } from "mobx";

export interface ITask {
  id: number;
  title: string;
  details: string;
  done: boolean;
  subtasks?: ITask[];
}

class Store {
  tasks: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title: string, details: string="") {
    this.tasks.push({ id: this.tasks.length, title, details, done: false, subtasks: [] });
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