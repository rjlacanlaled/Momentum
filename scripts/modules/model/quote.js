let ID;

export default class Quote {
    constructor(quote, author) {
        this.id = ID++;
        this.quote = quote;
        this.author = author;
    }
}