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

function addBook() {
  let name = window.prompt("Name of book: ");
  let author = window.prompt("Author: ");
  let pages = window.prompt("Pages");
  let pagesRead = window.prompt("Pages read: ");

  myLibrary.push(new Book(name, author, pages, pagesRead));
}

myLibrary.push(
  new Book("7 Habits of highly effective people", "Dale Carnegie", 275, 0)
);
myLibrary.push(
  new Book("How to win friends and influence people", "Dale Carnegie", 300, 0)
);
myLibrary.push(new Book("Hunger Games", "Katniss Everdeen", 199, 0));

function renderBook(book) {
  const { title, author, pages, pagesRead } = book;
  console.log(book);
  document.getElementById("bookshelf").innerHTML +=
    '<div class="book">' +
    "Name: " +
    title +
    "Author: " +
    author +
    "Pages: " +
    pages +
    "Pages read: " +
    pagesRead +
    "</div>";
}

function renderBooks() {
  console.log("rendering books");
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
    renderBook(myLibrary[i]);
  }
}

/* If you’re using constructors to make your objects it is best to define functions on the prototype of that object. Doing so means that a single instance of each function will be shared between all of the Student objects. If we declare the function directly in the constructor like we did when they were first introduced that function would be duplicated every time a new Student is created. In this example, that wouldn’t really matter much, but in a project that is creating thousands of objects, it really can make a difference. */
