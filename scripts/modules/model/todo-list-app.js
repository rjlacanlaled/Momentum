const EVENT_TYPE = "todoListAppDataChange";
export const MAX_TODO_DESCRIPTION = 500;
export const MAX_TODO_LIST_TITLE = 24;

export default class TodoListApp {
  constructor(todoLists = [], eventListeners = []) {
    this.todoLists = todoLists;
    this.event = new Event(EVENT_TYPE);
    this.eventListeners = eventListeners;
  }

  getTodoList(id) {
    for (let i = 0; i < this.todoLists.length; i++) {
      if (this.todoLists[i].id == id) return this.todoLists[i];
    }
    return false;
  }

  setIsDone(todoListId, todoId, isDone) {
    const todo = this.getTodoList(todoListId).getTodo(todoId);
    if (todo.isDone === isDone) return;
    todo.isDone = isDone;
    this.notifyEventListeners();
  }

  addNewList(newList) {
    if (!newList) return;
    this.todoLists.push(newList);
    this.notifyEventListeners();
  }

  addNewTodo(todoListId, todo) {
    const todoList = this.getTodoList(todoListId);
    if (!todoList) return;
    todoList.list.push(todo);
    this.notifyEventListeners();
  }

  removeTodo(todoListId, todoId) {
    console.log(todoId, todoListId);
    const todoList = this.getTodoList(todoListId);
    console.log(todoList);
    if (!todoList) return;
    for (const [index, todo] of todoList.list.entries()) {
      if (todo.id == todoId) {
        console.log("removing!");
        todoList.list.splice(index, 1);
        this.notifyEventListeners();
        return;
      }
    }
    return false;
  }

  removeList(todoListId) {
    console.log(todoListId);
    for (const [index, todoList] of this.todoLists.entries()) {
      if (todoList.id == todoListId) {
        this.todoLists.splice(index, 1);
        this.notifyEventListeners();
        return;
      }
    }
    return false;
  }

  addEventListener(listener) {
    if (!listener) return;
    this.eventListeners.push(listener);
  }

  notifyEventListeners() {
    if (this.eventListeners.length < 1) return;
    this.eventListeners.forEach((listener) => {
      listener.dispatchEvent(this.event);
    });
  }

  static getEvent() {
    return EVENT_TYPE;
  }
}
