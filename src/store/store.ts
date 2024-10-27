import { makeAutoObservable } from "mobx";

export interface ITask {
  id: number;
  title: string;
  details: string;
  done: boolean;
  isSelected: boolean;
  subtasks?: ITask[];
}

class Store {
  tasks: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTasks(); // Загружаем задачи из localStorage
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
    const newTask: ITask = {
      id: Date.now(), // Используем уникальный идентификатор
      title,
      details,
      done: false,
      isSelected: false,
      subtasks: [],
    };
    this.tasks.push(newTask);
    this.saveTasks(); // Сохраняем задачи в localStorage
  }

  markAsDone(id: number) {
    const task = this.findTask(id);
    if (task) {
      task.done = true;
      this.saveTasks(); // Сохраняем изменения в localStorage
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks(); // Сохраняем изменения в localStorage
  }

  updateTask(id: number, title: string, details: string) {
    const task = this.findTask(id);
    if (task) {
      task.title = title;
      task.details = details;
      this.saveTasks(); // Сохраняем изменения в localStorage
    }
  }

  selectTask(id: number) {
    const task = this.findTask(id);
    if (task) {
      task.isSelected = !task.isSelected;
      this.updateSubtaskSelection(task.subtasks, task.isSelected); // Обновляем подзадачи
      this.updateParentSelection(task); // Обновляем родительские задачи
      this.saveTasks(); // Сохраняем изменения в localStorage
    }
  }

  private updateParentSelection(task: ITask) {
    const parentTask = this.findParentTask(task.id);
    if (parentTask) {
      const allSubtasksSelected = parentTask.subtasks?.every(subtask => subtask.isSelected) ?? true; // Если subtasks нет, считаем, что все выбраны
      parentTask.isSelected = allSubtasksSelected; // Устанавливаем состояние выделения для родительской задачи
      this.updateParentSelection(parentTask); // Рекурсивно обновляем родительские задачи
    }
  }

  private findParentTask(id: number, tasks: ITask[] = this.tasks): ITask | undefined {
    for (let task of tasks) {
      if (task.subtasks) {
        if (task.subtasks.some(subtask => subtask.id === id)) {
          return task; // Родительская задача
        }
        const result = this.findParentTask(id, task.subtasks);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }

  public findTask(id: number, tasks: ITask[] = this.tasks): ITask | undefined {
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

  private updateSubtaskSelection(subtasks: ITask[] | undefined, isSelected: boolean) {
    if (subtasks) {
      subtasks.forEach(subtask => {
        subtask.isSelected = isSelected; // Устанавливаем состояние выделения для подзадач
        this.updateSubtaskSelection(subtask.subtasks, isSelected); // Рекурсивно обновляем подзадачи
      });
    }
  }
}

const store = new Store();
export default store;