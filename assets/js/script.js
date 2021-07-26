document.addEventListener("DOMContentLoaded", function() {
    getUserName();

    inputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addNewBook();
        overlay.setAttribute("hidden", true);
        formSection.setAttribute("hidden", true);
        noScroll.classList.remove("no-scroll");
    });

    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadBookData();
        refreshDataFromBooks();
    }
});