let ID = 0;

export default class TodoList {
  constructor(name, list = []) {
    this.id = ++ID;
    this.name = name.toLowerCase();
    this.list = list;
  }

  addTodo(todo) {
    this.list.push(todo);
  }

  getTodo(id) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) return this.list[i];
    }
    return false;
  }

  isDone() {
    if (this.list.length < 1) return;
    for (let i = 0; i < this.list.length; i++) {
      if (!this.list[i].isDone) return false;
    }
    return true;
  }
}
