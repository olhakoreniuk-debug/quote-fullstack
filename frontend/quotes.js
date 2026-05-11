const API_URL = "http://127.0.0.1:3000/";

const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");

const quoteForm = document.querySelector("#quote-form");
const quoteInput = document.querySelector("#quote-input");
const authorInput = document.querySelector("#author-input");
const formMessage = document.querySelector("#form-message");

async function showRandomQuote() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not fetch quote");
    }

    const data = await response.json();

    quoteElement.textContent = data.quote;
    authorElement.textContent = data.author;
  } catch (error) {
    quoteElement.textContent = "Sorry, something went wrong.";
    authorElement.textContent = "";
    console.error(error);
  }
}

async function addNewQuote(event) {
  event.preventDefault();

  const newQuote = {
    quote: quoteInput.value,
    author: authorInput.value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuote),
    });

    if (!response.ok) {
      throw new Error("Could not add quote");
    }

    formMessage.textContent = "Quote added successfully.";
    quoteForm.reset();

    showRandomQuote();
  } catch (error) {
    formMessage.textContent = "Sorry, the quote was not added.";
    console.error(error);
  }
}

newQuoteButton.addEventListener("click", showRandomQuote);
quoteForm.addEventListener("submit", addNewQuote);

showRandomQuote();