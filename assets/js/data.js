const storageKey = "BOOK_SHELF";
const userNameKey = "USER_NAME";

let books = [];

function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser Kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveBookData() {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(storageKey, parsedData);
}

function loadBookData() {
    const serializedData = localStorage.getItem(storageKey);

    let bookData = JSON.parse(serializedData);

    bookData !== null ? (books = bookData) : "";
}

function updateDataToStorage() {
    isStorageExist ? saveBookData() : "";
}

function composeBookObject(title, author, releaseBook, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year: parseInt(releaseBook),
        isCompleted,
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId) return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;
        index++;
    }
    return -1;
}

function refreshDataFromBooks() {
    const unreadBook = document.getElementById(UNREAD_BOOK_ID);
    const readBook = document.getElementById(READ_BOOK_ID);

    for (book of books) {
        const newBook = makeNewBook(
            book.title,
            book.author,
            book.year,
            book.isCompleted
        );
        newBook[BOOK_ITEMID] = book.id;

        book.isCompleted ? readBook.append(newBook) : unreadBook.append(newBook);
    }
}

function searchBook() {
    const bookDatas = document.querySelectorAll(".detail_container");
    const inputSearchBook = document
        .querySelector("#inputSearchBook")
        .value.toLowerCase();

    for (bookData of bookDatas) {
        const title = bookData.childNodes[0].innerText.toLowerCase();

        title.includes(inputSearchBook) ?
            (bookData.parentElement.style.display = "") :
            (bookData.parentElement.style.display = "none");
    }
}

function getUserName() {
    if (isStorageExist()) {
        const userName = document.querySelector("#userName");
        if (localStorage.getItem(userNameKey) === null) {
            const inputUserName = prompt("Input UserName Anda!");
            localStorage.setItem(userNameKey, inputUserName);
            userName.innerText = localStorage.getItem(userNameKey);
        } else {
            userName.innerText = localStorage.getItem(userNameKey);
        }
    }
}