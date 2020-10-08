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
*/

const addBookButton = document.getElementById("add-book-form");
addBookButton.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title-input-field").value;
  let author = document.getElementById("author-input-field").value;
  let pages = document.getElementById("pagestotal-input-field").value;
  let pagesRead = document.getElementById("pagesread-input-field").value;

  console.log("add-book-button clicked");
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
  } else {
    addBook(title, author, pages, pagesRead);
    clearModal();
    $("#addbook-modal").modal("hide");
  }
});

function clearModal() {
  document.getElementById("title-input-field").value = "";
  document.getElementById("author-input-field").value = "";
  document.getElementById("pagestotal-input-field").value = "";
  document.getElementById("pagesread-input-field").value = "";
  document.getElementById("message-region").innerHTML = "";
}

function addBook(title, author, pages, pagesRead) {
  console.log("adding " + title + " to bookshelf...");
  myLibrary.push(new Book(title, author, pages, pagesRead));
  renderBooks();
}

function addRemoveHandler(i) {
  const removeBookButton = document.getElementById("remove-" + i);
   removeBookButton.addEventListener("click", (e) => {
    console.log("clicked " + myLibrary[i].title);
    myLibrary.splice(i, 1);
    document.getElementById("book-" + i).remove();
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

  document.getElementById("books").innerHTML +=
    "<div id='book-" +
    i +
    "'class='book col-md-4 mx-3 my-3 p-0 border border-dark'>" +
    '<h2 class="px-3 pt-5">' +
    title +
    "</h2>" +
    '<p class="author mb-0 text-muted">' +
    author +
    "</p>" +
    '<div id="book-buttons">' +
    '<button type="button" class="btn btn-outline-primary btn-sm mr-2">Edit</button>' +
    '<button id=remove-"' +
    i +
    '" type="button" class="btn btn-danger btn-sm">Delete</button>' +
    "</div>" +
    '<h4 id="pages" class="mb-2">' +
    pagesRead +
    "/" +
    pages +
    " pages</h4>" +
    '<div id="progress-bar" class="progress rounded-0">' +
    "<div " +
    'class="progress-bar bg-warning w-"' +
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
}

function renderBooks() {
  console.log("rendering books");
  document.getElementById("books").innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    renderBook(myLibrary[i], i);
    addRemoveHandler(i);
  }
}

/* If you’re using constructors to make your objects it is best to define functions on the prototype of that object. Doing so means that a single instance of each function will be shared between all of the Student objects. If we declare the function directly in the constructor like we did when they were first introduced that function would be duplicated every time a new Student is created. In this example, that wouldn’t really matter much, but in a project that is creating thousands of objects, it really can make a difference. */
