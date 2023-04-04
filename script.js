class Book {
  constructor(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
  }

  toggleRead() {
    this.hasRead = !this.hasRead;
  }

  info() {
    const readStr = this.hasRead ? "have read" : "have not read";
    return `Book ${this.title} by ${this.author} with ${this.numPages} number of pages which I ${readStr}`;
  }
}

class Library {
  constructor() {
    this.library = [];
  }
  addBook(title, author, nPages, hasRead) {
    const newBook = new Book(title, author, nPages, hasRead);
    this.library.push(newBook);
    displayBook(newBook);
  }

  removeBook(title) {
    this.library = this.library.filter((book) => book.title !== title);
  }

  getBooks() {
    return this.library;
  }

  updateBook(title) {
    const book = this.getBook(title);
    book.toggleRead();
    return book.hasRead;
  }

  getBook(title) {
    return this.library.find((book) => book.title === title);
  }
}
const library = new Library();
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBookBtn = document.querySelector(".btn-open");
const books = document.querySelector(".library");
const bookForm = document.querySelector("#form");

function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

const resetLibrary = () => {
  books.innerHTML = "";
};

const displayBook = (book) => {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  const title = document.createElement("h2");
  const author = document.createElement("p");
  const numPage = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  removeBtn.classList.add("btn");
  removeBtn.classList.add("btn-remove");
  const readBtnClass = book.hasRead ? "btn-read" : "btn-not-read";
  readBtn.classList.add(`${readBtnClass}`);
  readBtn.classList.add("btn");

  readBtn.textContent = book.hasRead ? "Read" : "Not Read";
  title.textContent = book.title;
  author.textContent = book.author;
  numPage.textContent = `${book.numPages} pages`;
  removeBtn.textContent = "Remove";

  readBtn.onclick = updateRead;
  removeBtn.onclick = removeBook;

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(numPage);
  bookDiv.appendChild(readBtn);
  bookDiv.appendChild(removeBtn);
  books.appendChild(bookDiv);
};

const addBookForm = (e) => {
  e.preventDefault();
  const title = bookForm.querySelector("#title");
  const author = bookForm.querySelector("#author");
  const np = bookForm.querySelector("#pages");
  const cbx = bookForm.querySelector("#checkbox");
  library.addBook(title.value, author.value, np.value, cbx.checked);
  closeModal();
  bookForm.reset();
};

const updateRead = (e) => {
  const title = e.target.parentElement.children[0].textContent;
  library.updateBook(title);
  resetLibrary();
  populateLibrary();
};

const populateLibrary = () => {
  for (let book of library.getBooks()) {
    displayBook(book);
  }
};

const removeBook = (e) => {
  const currentBookTitle = e.target.parentElement.children[0].textContent;
  resetLibrary();
  library.removeBook(currentBookTitle);
  populateLibrary();
};

const escapeModal = (e) => {
  if (e.key == "Escape") {
    closeModal();
  }
};

addBookBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
bookForm.addEventListener("submit", addBookForm);
window.addEventListener("keydown", escapeModal);