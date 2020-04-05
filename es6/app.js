// Book Constructor Class
class Book {
  constructor(title, author, serial) {
    this.title = title;
    this.author = author;
    this.serial = serial;
  }
}

class UI {
  // Add To Book
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.serial}</td>
        <td><a href='#' class='delete'>X</a></td>
        `;

    list.appendChild(row);
  }

  // Show Alert
  showAlert(message, className) {
    // Create div Element
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const row = document.querySelector(".row");
    container.insertBefore(div, row);

    // setTimeout showAlert
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Deleted Book Item For List
  deleteBookItem(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showAlert("Deleted Successfully", "danger");
    }
  }

  // Clear Input Fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("serial").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      // Add to book
      ui.addBookToList(book);
    });
  }

  static removeBook(serial) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.serial === serial) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Dom Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Add Event Listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    serial = document.getElementById("serial").value;

  // Instantiate Book Constructor Class
  const book = new Book(title, author, serial);

  // Instantiate UI Class
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || serial === "") {
    ui.showAlert("Field The Input", "warning");
  } else {
    // Add Book To List
    ui.addBookToList(book);

    // Add Book To LS
    Store.addBook(book);

    // Show add alert
    ui.showAlert("Add Successfully", "success");

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener For Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  ui = new UI();

  ui.deleteBookItem(e.target);

  // Remove Form LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Delete Show Alert

  e.preventDefault();
});
