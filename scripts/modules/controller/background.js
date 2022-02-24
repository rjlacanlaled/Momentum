import Background from "../model/background.js";
import BackgroundApp from "../model/background-app.js";
import { generateRandomNumber } from "../helpers/math.js";

export default function initBackground() {
    const container = document.querySelector('.container');

    let backgroundIndex = -1;

    const backgroundImageApp = new BackgroundApp([
        new Background('brazil', 'https://images.unsplash.com/photo-1630422808562-d8014c43e771?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80', 'unsplash'),
        new Background('chile', 'https://images.unsplash.com/photo-1478827217976-7214a0556393?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', 'unsplash'),
        new Background('china', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1875&q=80', 'unsplash'),
        new Background('mountain', 'https://images.unsplash.com/photo-1564858763975-d99de59ee4bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80', 'unsplash')
    ]);

    updateBackground();

    setInterval(updateBackground, 5000);

    function updateBackground() {
        backgroundIndex = generateRandomNumber(backgroundImageApp.backgrounds.length, backgroundIndex);
        container.style.backgroundImage = `url(${backgroundImageApp.backgrounds[backgroundIndex].url})`;
    }
}