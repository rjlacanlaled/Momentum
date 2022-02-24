import Background from "../model/background.js";
import BackgroundApp from "../model/background-app.js";
import { generateRandomNumber } from "../helpers/math.js";

export default function initBackground() {
  const container = document.querySelector(".container");

  let backgroundIndex = -1;
  let backgroundInterval = 1000 * 30;

  const backgroundImageApp = new BackgroundApp([
    new Background("main", "./assets/main-background.jpg", "unsplash"),
    new Background("brazil", "./assets/brazil.jpeg", "unsplash"),
    new Background("chile", "./assets/chile.jpeg", "unsplash"),
    new Background("forest", "./assets/forest.jpg", "unsplash"),
    new Background("snow-mountain", "./assets/snow-mountain.jpg", "unsplash"),
    new Background("desert-night", "./assets/desert-night.jpg", "unsplash"),
  ]);

  updateBackground();

  setInterval(updateBackground, backgroundInterval);

  function updateBackground() {
    backgroundIndex = generateRandomNumber(
      backgroundImageApp.backgrounds.length,
      backgroundIndex
    );
    container.style.backgroundImage = `url(${backgroundImageApp.backgrounds[backgroundIndex].url})`;
  }
}
