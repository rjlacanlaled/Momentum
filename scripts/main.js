import initTime from "./modules/controller/time.js";
import initGreetings from "./modules/controller/greetings.js";
import initQuotes from "./modules/controller/quotes.js";
import initRegistration, { user } from "./modules/controller/registration.js";
import initFocus from "./modules/controller/focus.js";
import initTodo, { todoListApp } from "./modules/controller/todo.js";
import initBackground from "./modules/controller/background.js";

user.name = "rj";
user.email = "rjlacanlaled@gmail.com";

initBackground();
initRegistration();
const waitForRegistration = setInterval(initApp, 250);

function initApp() {
  if (!user.name || !user.email) return;
  clearInterval(waitForRegistration);
  initTime();
  initGreetings(user);
  initQuotes();
  initTodo();
  initFocus(todoListApp);
}