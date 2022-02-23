import DateTime from "../model/date-time-interval.js";
import { generateRandomNumber } from "../helpers/math.js";
import { updateDisplay } from "../helpers/ui-utils.js";
import Quote from "../model/quote.js";
import Quotes from "../model/quotes.js";

export default function initQuotes() {
    const quotesApp = new Quotes([
        new Quote('Quote number 1', 'rj'),
        new Quote('Quote number 2', 'rj'),
        new Quote('Quote number 3', 'rj')
    ])
    
    const quoteContainer = document.querySelector('.quote-container');
    let quoteIndex = -1;

    const timeInterval = new DateTime(5000, [quoteContainer]);  
    quoteContainer.addEventListener(DateTime.getEvent(), updateQuote);
    timeInterval.notifyTimeIntervalListeners();
    updateDisplay(quoteContainer, 'block'); 


    function updateQuote(event) {
        quoteIndex = generateRandomNumber(quotesApp.quotes.length, quoteIndex);
        event.target.textContent = `"${quotesApp.quotes[quoteIndex].quote}" - ${quotesApp.quotes[quoteIndex].author}`;
    }
}