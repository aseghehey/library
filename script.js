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

function resetForm(formArray) {
  formArray.forEach((input) => (input.value = ""));
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
  readBtn.textContent = "Read Status";
  readBtn.classList.add(`${readBtnClass}`);
  readBtn.classList.add("btn");
  title.textContent = book.title;
  author.textContent = book.author;
  numPage.textContent = `${book.numPages} pages`;
  removeBtn.textContent = "Remove";
  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(numPage);
  bookDiv.appendChild(readBtn);
  bookDiv.appendChild(removeBtn);
  books.appendChild(bookDiv);
};

const submitForm = (e) => {
  e.preventDefault();
  const title = bookForm.querySelector("#title");
  const author = bookForm.querySelector("#author");
  const np = bookForm.querySelector("#pages");
  const cbx = bookForm.querySelector("#checkbox");
  library.addBook(title.value, author.value, np.value, cbx.checked);
  closeModal();
  resetForm([title, author, np]);
};

const modifyLibrary = (e) => {
  // to toggle read or remove
  const action = e.target;
  const currentBookTitle = action.parentElement.children[0].textContent;
  if (action.textContent == "Remove") {
    // remove
    resetLibrary();
    library.removeBook(currentBookTitle);
    for (let book of library.getBooks()) {
      displayBook(book);
    }
  } else if (action.textContent == "Read Status") {
    // toggle read
    let removeBtnRead = false;
    e.target.classList.forEach((className) => {
      if (className === "btn-read") {
        removeBtnRead = true;
      }
    });

    const classToAdd = removeBtnRead ? "btn-not-read" : "btn-read";
    if (removeBtnRead) {
      e.target.classList.remove("btn-read");
    } else {
      e.target.classList.remove("btn-not-read");
    }

    e.target.classList.add(classToAdd);
    library.updateBook(currentBookTitle);
  }
};

addBookBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
bookForm.addEventListener("submit", submitForm);
books.addEventListener("click", modifyLibrary);
window.addEventListener("keydown", (e) => {
  if (e.key == "Escape"){
    closeModal();
  }
});