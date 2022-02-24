import { getDigitsFromString } from "../helpers/input.js";
import {
  createCheckbox,
  createImage,
  createLabel,
  createList,
  createOption,
  optionExists,
  toggleClass,
  updateDisplay,
} from "../helpers/ui-utils.js";
import TodoListApp, {
  MAX_TODO_DESCRIPTION,
  MAX_TODO_LIST_TITLE,
} from "../model/todo-list-app.js";
import TodoList from "../model/todo-list.js";
import Todo from "../model/todo.js";

export let todoListApp = new TodoListApp();

// TODO-ITEM TEMPLATE

export default function initTodo() {
  const addNewTodoListText = "+ Manage TodoList";
  const addNewTodoListId = "newTodoListSelection";
  const listItemVisibleClass = "todo-item-shown";
  const listClass = "not-todo";
  const todoDone = "todo-done";
  const todoActiveClass = "todo-active";
  const todoButton = document.querySelector("#todoButton");
  const todoItemContainer = document.querySelector(".todo-items");
  const todoSelection = document.querySelector(".todo-items > select");
  const todoItemListContainer = document.querySelector(".todo-lists > ul");
  const newInputBox = document.querySelector("#newInput");

  newInputBox.addEventListener("keypress", newInputEnterKeyHandler);
  newInputBox.addEventListener("input", inputTypeHandler);
  todoButton.addEventListener("click", todoButtonClickHandler);
  todoSelection.addEventListener("input", todoSelectionChangeHandler);

  updateTodoListSelection();
  todoSelection.dispatchEvent(new Event("input"));

  // Event handlers

  function newInputEnterKeyHandler(event) {
    if (event.key !== "Enter") return;
    if (!event.target.value.trim()) return;
    todoSelection.value === addNewTodoListId
      ? addNewList(event.target.value)
      : addNewTodo(event.target.value);
    event.target.value = "";
  }

  function inputTypeHandler(event) {
    if (
      event.target.value.length > todoSelection.value === addNewTodoListId
        ? MAX_TODO_LIST_TITLE
        : MAX_TODO_DESCRIPTION
    ) {
      event.target.value = event.target.value.substring(
        0,
        todoSelection.value === addNewTodoListId
          ? MAX_TODO_LIST_TITLE
          : MAX_TODO_DESCRIPTION
      );
    }
  }

  function todoButtonClickHandler(event) {
    let isItemVisible = todoItemContainer.style.display === "block";
    updateDisplay(todoItemContainer, isItemVisible ? "none" : "block");

    isItemVisible = todoItemContainer.style.display === "block";

    if (isItemVisible && !todoItemContainer.classList.contains(todoActiveClass))
      toggleClass(todoItemContainer, todoActiveClass);
    if (!isItemVisible && todoItemContainer.classList.contains(todoActiveClass))
      toggleClass(todoItemContainer, todoActiveClass);
  }

  function todoSelectionChangeHandler(event) {
    if (event.target.value === addNewTodoListId) return renderListTitles();
    renderTodoList();
  }

  function checkboxChangeHandler(event) {
    const todoListId = getDigitsFromString(todoSelection.value);
    const todoList = todoListApp.getTodoList(todoListId);
    const todo = todoList.getTodo(getDigitsFromString(event.target.id));
    todoListApp.setIsDone(todoListId, todo.id, event.target.checked);
    const label = document.querySelector(
      `#todoLabel${getDigitsFromString(event.target.id)}`
    );
    toggleClass(label, todoDone);
  }

  function trashIconClickHandler(event) {
    todoSelection.value === addNewTodoListId
      ? removeList(event.target.id)
      : removeTodo(event.target.id);
    event.target.value = "";
  }

  // UI Helpers

  function updateTodoListSelection() {
    if (todoListApp.todoLists.length > 0) updateListTitleSelection();
    if (optionExists(todoSelection.options, addNewTodoListId)) return;
    const option = createOption(addNewTodoListText, addNewTodoListId);
    todoSelection.add(option, undefined);
  }

  function updateListTitleSelection() {
    todoListApp.todoLists.forEach((list) => {
      if (optionExists(todoSelection.options, `listOption${list.id}`)) return;
      const option = createOption(`${list.name}`, `listOption${list.id}`);
      todoSelection.add(option, undefined);
    });
  }

  function updateListTitleItem(list, index) {
    const item = getTodoItemList()[index];
    const label = getListLabel(index + 1);
    const trashIcon = getListTrashIcon(index + 1);
    label.textContent = list.name;
    trashIcon.id = `todoTrashIcon${list.id}`;
    toggleClass(item, listItemVisibleClass);
  }

  function createNewListTitleItem(list) {
    const checkbox = createCheckbox({ class: listClass });
    checkbox.addEventListener("input", checkboxChangeHandler);

    const label = createLabel({
      id: `todoList${list.id}`,
      for: `todoList${list.id}`,
      text: list.name,
    });

    const trashIcon = createImage({
      src: "assets/trash-icon.svg",
      classList: ["fa", "fa-trash"],
      id: `todoTrashIcon${list.id}`,
    });
    trashIcon.addEventListener("click", trashIconClickHandler);

    const listItem = createList({ class: listItemVisibleClass });
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(trashIcon);

    return listItem;
  }

  function createNewTodoItem(todo) {
    const checkbox = createCheckbox({
      id: `todoCheckbox${todo.id}`,
      name: `todoCheckbox${todo.id}`,
      isChecked: todo.isDone,
    });

    checkbox.addEventListener("input", checkboxChangeHandler);

    const label = createLabel({
      id: `todoLabel${todo.id}`,
      for: `todoLabel${todo.id}`,
      text: todo.description,
    });

    const trashIcon = createImage({
      src: "assets/trash-icon.svg",
      classList: ["fa", "fa-trash"],
      id: `todoTrashIcon${todo.id}`,
    });
    trashIcon.addEventListener("click", trashIconClickHandler);

    const listItem = createList({ class: listItemVisibleClass });
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(trashIcon);

    return listItem;
  }

  function updateTodoItem(todo, index) {
    const item = getTodoItemList()[index];
    const label = getListLabel(index + 1);
    const checkbox = getListCheckbox(index + 1);
    const trashIcon = getListTrashIcon(index + 1);

    checkbox.id = `todoCheckbox${todo.id}`;
    checkbox.name = `todoCheckbox${todo.id}`;
    checkbox.checked = todo.isDone;

    label.textContent = todo.description;
    if (todo.isDone) toggleClass(label, todoDone);
    label.id = `todoLabel${todo.id}`;
    label.name = `todoLabel${todo.id}`;

    trashIcon.id = `todoTrashIcon${todo.id}`;

    toggleClass(item, listItemVisibleClass);
    toggleClass(checkbox, listClass);
  }

  function renderListTitles() {
    resetListItemData();
    newInputBox.placeholder = "New List";
    const todoItemList = getTodoItemList();
    todoListApp.todoLists.forEach((list, index) => {
      if (todoItemList[index]) return updateListTitleItem(list, index);
      todoItemListContainer.appendChild(createNewListTitleItem(list));
    });
  }

  function renderTodoList() {
    resetListItemData();
    newInputBox.placeholder = "New Todo";
    const todoItemList = getTodoItemList();
    todoListApp
      .getTodoList(getDigitsFromString(todoSelection.value))
      .list.forEach((todo, index) => {
        if (todoItemList[index]) return updateTodoItem(todo, index);
        todoItemListContainer.appendChild(createNewTodoItem(todo));
      });
  }

  function resetListItemData() {
    const todoItemList = getTodoItemList();
    if (!todoItemList) return;
    todoItemList.forEach((item, index) => {
      if (item.classList.contains(listItemVisibleClass))
        toggleClass(item, listItemVisibleClass);
      const checkbox = getListCheckbox(index + 1);
      checkbox.checked = false;
      const label = getListLabel(index + 1);
      if (label.classList.contains(todoDone)) toggleClass(label, todoDone);
      if (!checkbox.classList.contains(listClass))
        toggleClass(checkbox, listClass);
    });
  }

  function resetTodoListSelection() {
    while (todoSelection.options.length > 1) todoSelection.remove(1);
  }

  // UI Getters

  function getTodoItemList() {
    return document.querySelectorAll(".todo-lists > ul > li");
  }

  function getListLabel(index) {
    return document.querySelector(
      `.todo-lists > ul > li:nth-of-type(${index}) > label`
    );
  }

  function getListCheckbox(index) {
    return document.querySelector(
      `.todo-lists > ul > li:nth-of-type(${index}) > input`
    );
  }

  function getListTrashIcon(index) {
    return document.querySelector(
      `.todo-lists > ul > li:nth-of-type(${index}) > .fa`
    );
  }

  // Model Helpers

  function addNewTodo(value) {
    const todoList = todoListApp.getTodoList(
      getDigitsFromString(todoSelection.value)
    );
    todoListApp.addNewTodo(todoList.id, new Todo(value, false));
    renderTodoList();
  }

  function addNewList(value) {
    todoListApp.addNewList(new TodoList(value, []));
    updateListTitleSelection();
    renderListTitles();
  }

  function removeTodo(id) {
    const todoList = todoListApp.getTodoList(
      getDigitsFromString(todoSelection.value)
    );
    todoListApp.removeTodo(todoList.id, getDigitsFromString(id));
    renderTodoList();
  }

  function removeList(id) {
    todoListApp.removeList(getDigitsFromString(id));
    resetTodoListSelection();
    updateListTitleSelection();
    renderListTitles();
  }
}
