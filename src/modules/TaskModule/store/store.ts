import { makeAutoObservable } from "mobx";

export interface Task {
  id: number;
  title: string;
  details: string;
  done: boolean;
  isSelected: boolean;
  subtasks?: Task[];
}

class Store {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(title: string, details: string = "") {
    const newTask: Task = {
      id: Date.now(),
      title,
      details,
      done: false,
      isSelected: false,
      subtasks: [],
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  markAsDone(id: number) {
    const task = this.findTask(id);
    if (task) {
      task.done = true;
      this.saveTasks();
    }
  }

  deleteTask(id: number) {
    const taskToDelete = this.findTask(id);
    if (taskToDelete) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
    }
  }  

  findTask(id: number, tasks: Task[] = this.tasks): Task | undefined {
    for (let task of tasks) {
      if (task.id === id) {
        return task;
      }
      if (task.subtasks) {
        const found = this.findTask(id, task.subtasks);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  get activeTasks() {
    return this.tasks.filter(task => !task.done);
  }

  get completedTasks() {
    return this.tasks.filter(task => task.done);
  }
}

const store = new Store();
export default store;