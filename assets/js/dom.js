const READ_BOOK_ID = "readBook";
const UNREAD_BOOK_ID = "unreadBook";
const BOOK_ITEMID = "bookId";

const closeButton = document.querySelector(".close_button");
const overlay = document.querySelector(".overlay");
const formSection = document.querySelector(".form_section");
const navLinkAddNewBook = document.querySelector(".nav_new_book");
const noScroll = document.querySelector("body");

function checkBoxValue() {
    const checkBox = document.querySelector("#isCompleted");
    if (checkBox.checked) {
        return true;
    } else {
        return false;
    }
}

function makeNewBook(judul, penulis, year, isCompleted) {
    const textTitle = document.createElement("h4");
    textTitle.innerText = judul;
    const textAuthor = document.createElement("p");
    textAuthor.innerText = penulis;
    const textYear = document.createElement("p");
    textYear.classList.add("book_year");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("detail_container");
    textContainer.append(textTitle, textAuthor, textYear);

    const bookContainer = document.createElement("article");
    bookContainer.classList.add("book_container");
    bookContainer.append(textContainer);

    isCompleted
        ?
        bookContainer.append(createUnreadButton()) :
        bookContainer.append(createReadButton());

    bookContainer.append(createDeleteButton());

    return bookContainer;
}

function addNewBook() {
    const unreadBook = document.getElementById(UNREAD_BOOK_ID);
    const readBook = document.getElementById(READ_BOOK_ID);

    const bookTitle = document.querySelector("#inputTitle").value;
    const bookAuthor = document.querySelector("#inputAuthor").value;
    const bookYear = document.querySelector("#inputYear").value;
    const isCompleted = checkBoxValue();

    const makeUnreadBook = makeNewBook(bookTitle, bookAuthor, bookYear, false);
    const makeReadBook = makeNewBook(bookTitle, bookAuthor, bookYear, true);

    const bookObject = composeBookObject(
        bookTitle,
        bookAuthor,
        bookYear,
        isCompleted
    );

    if (isCompleted) {
        readBook.append(makeReadBook);
        makeReadBook[BOOK_ITEMID] = bookObject.id;
    } else {
        unreadBook.append(makeUnreadBook);
        makeUnreadBook[BOOK_ITEMID] = bookObject.id;
    }
    books.push(bookObject);
    updateDataToStorage();
}

function createButton(buttonClass, buttonName, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonClass);
    button.innerText = buttonName;
    button.addEventListener("click", function() {
        eventListener(event);
    });
    return button;
}

function createReadButton() {
    return createButton("green", "Tandai Sudah Selesai", function(event) {
        markBookComplete(event.target.parentElement);
    });
}

function createUnreadButton() {
    return createButton("blue", "Tandai Belum Selesai", function(event) {
        markBookUncomplete(event.target.parentElement);
    });
}

function deletePopUpButton() {
    const confirmButton = document.querySelector("#confirmButton");
    const cancelButton = document.querySelector("#cancelButton");
    const deletePopUp = document.querySelector(".delete_pop_up");

    confirmButton.addEventListener("click", function() {
        deletePopUp.style.display = "none";
        overlay.setAttribute("hidden", true);
        noScroll.classList.remove("no-scroll");
        deleteBook(event.target.parentElement);
        location.reload();
    });

    cancelButton.addEventListener("click", function() {
        deletePopUp.style.display = "none";
        overlay.setAttribute("hidden", true);
        noScroll.classList.remove("no-scroll");
    });
}

function createDeleteButton() {
    return createButton("red", "Hapus Buku", function() {
        const deletePopUp = document.querySelector(".delete_pop_up");
        deletePopUp.style.display = "flex";
        noScroll.classList.add("no-scroll");
        overlay.style.top = 0;
        overlay.removeAttribute("hidden");
        deletePopUpButton();
    });
}

function markBookComplete(taskElement) {
    const readBook = document.getElementById(READ_BOOK_ID);
    taskTitle = taskElement.querySelector(".detail_container > h4").innerText;
    taskAuthor = taskElement.querySelector(".detail_container > p").innerText;
    taskYear = taskElement.querySelector(".book_year").innerText;

    const complete = makeNewBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    complete[BOOK_ITEMID] = book.id;

    readBook.append(complete);
    taskElement.remove();
    updateDataToStorage();
}

function markBookUncomplete(taskElement) {
    const unreadBook = document.getElementById(UNREAD_BOOK_ID);
    taskTitle = taskElement.querySelector(".detail_container > h4").innerText;
    taskAuthor = taskElement.querySelector(".detail_container > p").innerText;
    taskYear = taskElement.querySelector(".book_year").innerText;

    const unComplete = makeNewBook(taskTitle, taskAuthor, taskYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    unComplete[BOOK_ITEMID] = book.id;

    unreadBook.append(unComplete);
    taskElement.remove();
    updateDataToStorage();
}

function deleteBook(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

navLinkAddNewBook.addEventListener("click", function() {
    overlay.removeAttribute("hidden");
    formSection.removeAttribute("hidden");
    noScroll.classList.add("no-scroll");
});

closeButton.addEventListener("click", function() {
    overlay.setAttribute("hidden", true);
    formSection.setAttribute("hidden", true);
    noScroll.classList.remove("no-scroll");
});