export default class Greeting {
    constructor(timePeriod) {
        this.timePeriod = timePeriod;
    }

    getGreeting() {
        return `Good ${this.timePeriod === 'am' ? 'morning' : 'evening'}, `;
    }
}