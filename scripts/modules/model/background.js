let ID = 0;

export default class Background {
    constructor(name, url, photographer) {
        this.id = ++ID;
        this.name = name;
        this.url = url;
        this.photographer = photographer
    }
}