const EVENT_TYPE = "timeInterval";

export default class DateTime {
  constructor(interval, timeIntervalListeners) {
    this.date = this.getCurrentDateTime();
    this.interval = parseInt(interval);
    this.delay = this.interval - (this.date % this.interval);
    this.timeIntervalListeners = timeIntervalListeners;
    this.event = new Event(EVENT_TYPE);
    setTimeout(this.start.bind(this), this.delay);
  }

  getCurrentDateTime() {
    return new Date();
  }

  start() {
    this.getTimeForInterval();
    setInterval(this.getTimeForInterval.bind(this), this.interval);
  }

  getTimeForInterval() {
      this.date = this.getCurrentDateTime();
      this.notifyTimeIntervalListeners();
  }

  notifyTimeIntervalListeners() {
    this.timeIntervalListeners.forEach((listener) => {
      listener.dispatchEvent(this.event);
    });
  }

  static getEvent() {
    return EVENT_TYPE;
  }
}
