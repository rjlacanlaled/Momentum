import DateTime from "../model/date-time-interval.js";
import { updateDisplay } from "../helpers/ui-utils.js";

export let dateTime;

export default function initTime() {
  const TIME_INTERVAL = 1000 * 1;
  const timeLabel = document.querySelector(".time-container");
  dateTime = new DateTime(TIME_INTERVAL, [timeLabel]);

  updateDisplay(timeLabel, 'block');

  timeLabel.addEventListener(DateTime.getEvent(), updateTime);
  dateTime.notifyTimeIntervalListeners();

  function updateTime(event) {
    event.target.textContent = dateTime.date.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}).replace(/[A-Z]+/g, '');
  }
}