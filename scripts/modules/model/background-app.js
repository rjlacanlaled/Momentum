let ID = 0;

export default class BackgroundApp {
    constructor(backgrounds = []) {
        this.backgrounds = backgrounds;
        this.id = ++ID;
    }
}