// Book Constructor
function Book(title, author, serial) {
  this.title = title;
  this.author = author;
  this.serial = serial;
}

// UI Constructor
function UI() {}

// Add To Book
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // Create tr Element
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}<td>
  <td>${book.serial}<td>
  <td><a href='#' class='btn btn-outline-danger' id='delete'>Delete</a><td>`;
  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, ClassName) {
  // Create Element
  const div = document.createElement("div");
  // Append ClassName
  div.className = `alert alert-${ClassName}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");
  // Get Form
  const row = document.querySelector(".row");
  // Insert Alert
  container.insertBefore(div, row);

  // TimeOut After 2 Seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("serial").value = "";
};

// Delete Book
UI.prototype.deleteBookItem = function (target) {
  if (target.id === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    serial = document.getElementById("serial").value;

  // Instantiate Book
  const book = new Book(title, author, serial);

  // Instantiate UI
  const ui = new UI();

  // Add Book To List
  if (title === "" || author === "" || serial === "") {
    ui.showAlert("Please add to book in the list.", "warning");
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert("Book Add Successfully", "success");
  }

  e.preventDefault();
});

// Event Listener For Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //  Instantiate  UI
  ui = new UI();
  ui.deleteBookItem(e.target);

  ui.showAlert("Deleted Successfully", "danger");

  e.preventDefault();
});
