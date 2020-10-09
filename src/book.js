import "./book.css";

let myLibrary = [];

/*
  Constructor for Book object
  Input:
    String title: title of book
    String author: author of book
    int pages: number of pages in book
    int pagesRead: number of pages read so far
*/
function Book(title, author, pages, pagesRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.pagesRead = pagesRead;
}

Book.prototype.info = function () {
  return (
    "Title: " +
    this.title +
    "\n" +
    "Author: " +
    this.author +
    "\n" +
    "Pages: " +
    this.pages +
    "\n" +
    "HasRead: " +
    this.pagesRead
  );
};

/*
  Adds a book to the bookshelf
  **clears modal and renders book as well....
*/
const addBookButton = document.getElementById("add-book-form");
addBookButton.addEventListener("submit", (e) => {
  e.preventDefault();
  submitModal();
});

/*
  Checks for modal input errors and returns a new book according to input values of form
*/
function submitModal() {
  let title = document.getElementById("title-input-field").value;
  let author = document.getElementById("author-input-field").value;
  let pages = document.getElementById("pagestotal-input-field").value;
  let pagesRead = document.getElementById("pagesread-input-field").value;
  let addOrEdit = document.getElementById("form-val").innerText;
  console.log("add-book-button clicked");
  console.log(addOrEdit);
  if (
    title.length === 0 ||
    author.length === 0 ||
    pages.length === 0 ||
    pagesRead.length === 0
  ) {
    console.log("fill out all fields!");
    document.getElementById("message-region").innerHTML =
      "Fill out all fields!";
  } else if (pages < pagesRead) {
    document.getElementById("message-region").innerHTML =
      "Pages read must be less than total pages!";
    document.getElementById("pagestotal-input-field").value = "";
    document.getElementById("pagesread-input-field").value = "";
  } else if (addOrEdit === "a") {
    console.log("adding modal");
    let book = addBook(title, author, pages, pagesRead);
    renderBook(book, myLibrary.length - 1);
    clearModal();
  } else {
    console.log("submitting modal");
    myLibrary[addOrEdit] = new Book(title, author, pages, pagesRead);

    let bookID = "#book-" + addOrEdit;
    let progress = Math.floor((pagesRead / pages) * 100);

    document.querySelector(bookID + " h2").innerText = title;
    document.querySelector(bookID + " p").innerText = author;
    document.querySelector(bookID + " h4").innerText = pagesRead + "/" + pages;
    document.querySelector(bookID + " .progress-bar.bg-warning").style.width =
      progress + "%";

    clearModal();
  }
}

function clearModal() {
  document.getElementById("title-input-field").value = "";
  document.getElementById("author-input-field").value = "";
  document.getElementById("pagestotal-input-field").value = "";
  document.getElementById("pagesread-input-field").value = "";
  document.getElementById("message-region").innerHTML = "";
  document.getElementById("form-val").innerText = "a";
  $("#addbook-modal").modal("hide");
}

function addBook(title, author, pages, pagesRead) {
  console.log("adding " + title + " to bookshelf...");
  let book = new Book(title, author, pages, pagesRead);
  myLibrary.push(book);
  return book;
}

function addRemoveHandler(i) {
  console.log("adding r-handler for book-" + i);
  const removeBookButton = document.getElementById("remove-" + i);
  removeBookButton.addEventListener("click", () => {
    console.log("deleting book- " + i);
    myLibrary.splice(i, 1);
    console.log(myLibrary);
    document.getElementById("book-" + i).remove();
    renderBooks();
  });
}

function editBookHandler(i) {
  console.log("adding e-handler for book-" + i);
  const editBookButton = document.getElementById("edit-" + i);
  editBookButton.addEventListener("click", () => {
    console.log("editing book- " + i);
    document.getElementById("form-val").innerText = i;

    const { title, author, pages, pagesRead } = myLibrary[i];

    //set modal presets
    document.getElementById("title-input-field").value = title;
    document.getElementById("author-input-field").value = author;
    document.getElementById("pagesread-input-field").value = pagesRead;
    console.log(pages);
    document.getElementById("pagestotal-input-field").value = pages;

    $("#addbook-modal").modal();
  });
}

/*
  Renders a particular book onto DOM
  Input:
    Book book: Book object
*/
function renderBook(book, i) {
  const { title, author, pages, pagesRead } = book;

  let progress = Math.floor((pagesRead / pages) * 100);
  console.log(progress);

  let bookDom = document.getElementById("books");

  var bookHtml =
    "<div id='book-" +
    i +
    "'class='book col-md-4 mx-3 my-3 p-0 border border-dark'>" +
    '<h2 id="booktitle" class="px-3 pt-5">' +
    title +
    "</h2>" +
    '<p id="book-author" class="author mb-0 text-muted">' +
    author +
    "</p>" +
    '<div id="book-buttons">' +
    '<button id="edit-' +
    i +
    '" type="button" class="btn btn-outline-primary btn-sm mr-2">Edit</button>' +
    '<button id="remove-' +
    i +
    '" type="button" class="btn btn-danger btn-sm">Delete</button>' +
    "</div>" +
    '<h4 class="pages mb-2">' +
    pagesRead +
    "/" +
    pages +
    " pages</h4>" +
    '<div id="progress-bar" class="progress rounded-0">' +
    "<div " +
    'class="progress-bar bg-warning"' +
    'style="width: ' +
    progress +
    '%"' +
    'role="progressbar"' +
    'aria-valuenow="25"' +
    'aria-valuemin="0"' +
    'aria-valuemax="100"' +
    "></div>" +
    "</div>" +
    "</div>";

  bookDom.insertAdjacentHTML("beforeend", bookHtml);

  addRemoveHandler(i);
  editBookHandler(i);
}

function renderBooks() {
  console.log("rendering books");
  document.getElementById("books").innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    renderBook(myLibrary[i], i);
  }
}

/* If you’re using constructors to make your objects it is best to define functions on the prototype of that object. Doing so means that a single instance of each function will be shared between all of the Student objects. If we declare the function directly in the constructor like we did when they were first introduced that function would be duplicated every time a new Student is created. In this example, that wouldn’t really matter much, but in a project that is creating thousands of objects, it really can make a difference. */
