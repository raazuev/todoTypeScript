import store from "../store/store";

describe("Store", () => {
  beforeEach(() => {
    // Сбрасываем задачи перед каждым тестом
    store.tasks = [];
  });

  test("добавление задачи", () => {
    store.addTask("Тестовая задача");
    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0].title).toBe("Тестовая задача");
  });

  test("завершение задачи", () => {
    store.addTask("Тестовая задача");
    const taskId = store.tasks[0].id;
    store.markAsDone(taskId);
    expect(store.tasks[0].done).toBe(true);
  });

  test("удаление задачи", () => {
    store.addTask("Тестовая задача");
    const taskId = store.tasks[0].id;
    store.deleteTask(taskId);
    expect(store.tasks.length).toBe(0);
  });

  test("поиск задачи", () => {
    store.addTask("Тестовая задача");
    const taskId = store.tasks[0].id;
    const foundTask = store.findTask(taskId);
    expect(foundTask).toBeDefined();
    expect(foundTask?.title).toBe("Тестовая задача");
  });
});