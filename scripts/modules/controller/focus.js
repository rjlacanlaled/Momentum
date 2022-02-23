import { getDigitsFromString } from "../helpers/input.js";
import {
  createOption,
  optionExists,
  toggleClass,
  updateDisplay,
} from "../helpers/ui-utils.js";
import TodoListApp from "../model/todo-list-app.js";

export default function initFocus(todoListApp) {
  const listDoneClass = "list-done";
  const focusContainer = document.querySelector(".focus-container");
  const focusSelection = document.querySelector("#focusSelection");
  const mainFocusText = document.querySelector("#mainFocusText");

  todoListApp.addEventListener(focusSelection);

  focusSelection.addEventListener(
    TodoListApp.getEvent(),
    todoListAppDataChangeHandler
  );

  updateDisplay(focusContainer, "block");
  updateFocusSelectionOptions();
  focusSelection.addEventListener("input", inputChangeHandler);

  // Event Handlers

  function inputChangeHandler(event) {
      console.log('here first');
    if (event.target.value == "empty") {
      updateDisplay(mainFocusText, "block");
    } else {
      updateDisplay(mainFocusText, "none");
      focusSelection.dispatchEvent(new Event(TodoListApp.getEvent()));  
    }
  }

  function todoListAppDataChangeHandler(event) {
    updateFocusSelectionOptions();
    if (event.target.value == "empty" || !event.target.value) {
      if (!event.target.value) {
        event.target.value = "empty";
      }
      updateDisplay(mainFocusText, "block");
    } else {
      const todoList = todoListApp.getTodoList(
        getDigitsFromString(focusSelection.value)
      );

      if (
      (todoList.isDone() && !focusSelection.classList.contains(listDoneClass)) ||
      (!todoList.isDone() && focusSelection.classList.contains(listDoneClass))) {
        toggleClass(focusSelection, listDoneClass);
      }
  }
}

  // UI Helpers

  function updateFocusSelectionOptions() {
    const originalOptionValue = focusSelection.value;
    createOptions();
    focusSelection.value = originalOptionValue;
    if (optionExists(focusSelection.options, "empty")) return;

    const option = createOption("", "empty");
    focusSelection.add(option, undefined);
  }

  function createOptions() {
    resetFocusListSelectionOptions();
    if (todoListApp.todoLists.length < 1) return;
    todoListApp.todoLists.forEach((list) => {
      console.log("here");
      const option = createOption(`${list.name}`, `listOption${list.id}`);
      focusSelection.add(option, undefined);
    });
  }

  function resetFocusListSelectionOptions() {
    while (focusSelection.options.length > 1) focusSelection.remove(1);
  }
}
