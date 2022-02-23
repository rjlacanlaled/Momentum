import User from "../model/user.js";
import {updateDisplay } from "../helpers/ui-utils.js";
export let user = new User();

export default function initRegistration() {
  const nameContainer = document.querySelector(".name-container");
  const emailContainer = document.querySelector(".email-container");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");

  nameInput.addEventListener("keydown", keypressHandler);
  emailInput.addEventListener("keydown", keypressHandler);

  if (user.name) updateDisplay(nameContainer, 'none');
  if (user.name && !user.email) updateDisplay(emailContainer, 'block');

  function checkInput(input) {
    if (input.id === "name") {
      if (!input.value.length) return;
      user.name = input.value;
      updateDisplay(nameContainer, "none");
      if (!user.email) updateDisplay(emailContainer, "block");
    } else {
      if (!isEmailValid(input.value)) return;
      user.email = input.value;
      updateDisplay(emailContainer, "none");
    }
  }

  function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function keypressHandler(event) {
    if (event.key !== "Enter") return;
    checkInput(event.target);
  }
}