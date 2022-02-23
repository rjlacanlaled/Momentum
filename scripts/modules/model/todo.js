let ID = 0;

export default class Todo {
    constructor(description, isDone) {
        this.id = ++ID;
        this.description = description;
        this.isDone = isDone;
    }
}