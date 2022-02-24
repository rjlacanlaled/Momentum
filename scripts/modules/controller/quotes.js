import DateTime from "../model/date-time-interval.js";
import { generateRandomNumber } from "../helpers/math.js";
import { updateDisplay } from "../helpers/ui-utils.js";
import Quote from "../model/quote.js";
import Quotes from "../model/quotes.js";

export default function initQuotes() {
  let quoteIndex = -1;

  const quotesApp = new Quotes([
    new Quote("The bad news is time flies. The good news is you’re the pilot.", "Michael Altshuler"),
    new Quote("You define your own life. Don’t let other people write your script.", "Oprah Winfrey"),
    new Quote("You are never too old to set another goal or to dream a new dream.", "Malala Yousafzai"),
  ]);

  const quoteContainer = document.querySelector(".quote-container");
  const quoteDescription = document.querySelector(".quote-description");
  const quoteInputs = document.querySelector(".quote-inputs");
  const addQuoteButton = document.querySelector(".quote-buttons > button");
  const addQuoteForm = document.querySelector(".quote-inputs > form");

  quoteDescription.addEventListener(DateTime.getEvent(), updateQuote);
  addQuoteButton.addEventListener("click", addQuoteClickHandler);
  addQuoteForm.addEventListener('submit', addQuoteFormSubmitHandler);

  const timeInterval = new DateTime(5000, [quoteDescription]);
  timeInterval.notifyTimeIntervalListeners();
  updateDisplay(quoteContainer, "flex");

  function addQuoteClickHandler(event) {
    quoteInputs.style.display =
      quoteInputs.style.display === "none" || quoteInputs.style.display === ""
        ? "block"
        : "none";

    addQuoteButton.textContent = addQuoteButton.textContent === "+" ? "-" : "+";
  }

  function addQuoteFormSubmitHandler(event) {
      event.preventDefault();
      const quote = document.querySelector('#quoteId');
      const author = document.querySelector('#quoteAuthorId');
      quotesApp.quotes.push(new Quote(quote.value, author.value));
      quote.value = '';
      author.value = '';
  }

  function updateQuote(event) {
    quoteIndex = generateRandomNumber(quotesApp.quotes.length, quoteIndex);
    event.target.textContent = `"${quotesApp.quotes[quoteIndex].quote}" - ${quotesApp.quotes[quoteIndex].author}`;
  }
}
