const addBookForm = document.getElementById("addBookForm");
const addBookBtn = document.getElementById("addBookBtn");
const bookList = document.getElementById("bookList");
const addBookModal = document.getElementById("addBookModal");
const overlay = document.getElementById("overlay");
const errorMSg = document.getElementById("errorMsg");

let myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function duplicateCheck(title) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) return true;
    }
    return false;
}

function deleteBook(title) {
    myLibrary = myLibrary.filter((book) => book.title !== title);
}

function getBook(title) {
    return myLibrary.find((book) => book.title === title);
}

function openForm() {
    addBookForm.style.display = "block";
}

function closeForm() {
    addBookForm.style.display = "none";
}

function creatBookCard(book) {
    const bookCard = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('h2');
    const pages = document.createElement('h3');
    const statusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card');
    statusBtn.classList.add('statusBtn', 'cardBtn');
    removeBtn.classList.add('removeBtn', 'cardBtn');
    statusBtn.onclick = changeStatus;
    removeBtn.onclick = removeBook;

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = "Remove";
    statusBtn.textContent = book.status;
    if (statusBtn.textContent === "Read") statusBtn.style.backgroundColor = "green";

    bookCard.append(title, author, pages, statusBtn, removeBtn);
    bookList.appendChild(bookCard);
}

function updateBookList() {
    bookList.innerHTML = '';
    for (let book of myLibrary) {
        creatBookCard(book);
    }
}

function getBookInput() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let status = "Not read yet";
    if (document.getElementById('status').checked) status = "Read";
    return new Book(title, author, pages, status);
}

const addBook = (e) => {
    e.preventDefault();
    const newBook = getBookInput();
    if (duplicateCheck(newBook.title)) {
        errorMSg.textContent = 'This book already exists in the library';
        errorMsg.classList.add('active');
        return;
    }
    addBookToLibrary(newBook);
    updateBookList();
    closeAddBookModal();
}

function openAddBookModal() {
    addBookForm.reset();
    addBookModal.classList.add('active');
    overlay.classList.add('active');
}

function closeAddBookModal() {
    addBookModal.classList.remove('active');
    overlay.classList.remove('active');
    errorMSg.classList.remove('active');
    errorMSg.textContent = '';
}

addBookBtn.onclick = openAddBookModal;
addBookForm.onsubmit = addBook;
overlay.onclick = closeAddBookModal;

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '');
    deleteBook(title);
    updateBookList();
}

const changeStatus = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '');
    const book = getBook(title);
    if (book.status === "Not read yet") book.status = "Read";
    else book.status = "Not read yet";
    updateBookList();
}

let harryPotter = new Book("Harry Potter", "J. K. Rowling", 1000, "Read");
addBookToLibrary(harryPotter);
let theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, "Not read yet");
addBookToLibrary(theHobbit);
updateBookList();