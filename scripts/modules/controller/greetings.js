import { updateDisplay } from "../helpers/ui-utils.js";
import DateTime from "../model/date-time-interval.js";

export default function initGreetings(user) {
  const greetingsContainer = document.querySelector(".greetings-container");
  const greetingTimeContainer = document.querySelector(".greeting-time-text");
  const nameContainer = document.querySelector("#nameInput");

  const timeInterval = new DateTime(1000 * 60 * 60, [greetingTimeContainer]);

  greetingTimeContainer.addEventListener(DateTime.getEvent(), hourChangeHandler);
  greetingTimeContainer.dispatchEvent(new Event(DateTime.getEvent()));
  
  nameContainer.addEventListener("keydown", keypressHandler);
  nameContainer.addEventListener("focusout", focusOutHandler);
  nameContainer.addEventListener("input", inputChangeHandler);

  nameContainer.textContent = user.name;
  updateDisplay(greetingsContainer, "block");

  function updateName(newName) {
    console.log(newName);
    if (newName.length < 1) {
      nameContainer.textContent = user.name;
    } else {
      user.name = newName;
    }
    nameContainer.blur();
  }
  // Event handlers

  function keypressHandler(event) {
    if (event.key !== "Enter") return;
    updateName(event.target.textContent);
  }

  function focusOutHandler(event) {
    updateName(event.target.textContent);
  }

  function inputChangeHandler(event) {
    event.target.textContent = event.target.textContent.substring(0, 12);
  }

  function hourChangeHandler(event) {

    const hr = timeInterval.date.getHours();
    let greetingTimeText = '';

    if (hr >= 3 && hr < 12) {
      greetingTimeText = 'morning';
    } else if (hr >= 12 && hr < 6) {
      greetingTimeText = 'afternoon';
    } else {
      greetingTimeText = 'evening';
    }

    event.target.textContent = `Good ${greetingTimeText},`;
  }
}
