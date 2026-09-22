// Elements Selection
const toDoForm = document.querySelector("#to-do-form");
const editForm = document.querySelector("#edit-form");

const toDoInput = document.querySelector("#to-do-input");
const editInput = document.querySelector("#edit-input");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const toDoList = document.querySelector("#to-do-list");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

// Stores the original title of the task being edited, used to find and updated it later
let oldInputValue;

// Functions

// Creates and renders a new task element based on the given text
const saveTodo = (text, done = 0, save = 1) => {
  const toDo = document.createElement("div");
  toDo.classList.add("to-do");

  const toDoTitle = document.createElement("h3");
  toDoTitle.innerText = text;

  toDo.appendChild(toDoTitle);

  // Button to mark the task as done
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("to-do-finish");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  toDo.appendChild(doneBtn);

  // Button to edit the task
  const editBtn = document.createElement("button");
  editBtn.classList.add("to-do-edit");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  toDo.appendChild(editBtn);

  // Button to remove the task
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("to-do-remove");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  toDo.appendChild(removeBtn);

  // Utilizando dados da localStorage
  if (done) {
    toDo.classList.add("done");
  }

  if (save) {
    saveTodosLocalStorage({ text, done });
  }

  // Append the new task to the visible list
  toDoList.appendChild(toDo);

  // Clears the input and keeps focus to the next task
  toDoInput.value = "";
  toDoInput.focus();
};

// Toggles between the normal view (task list + add form)
// and the edit view
const toggleForms = () => {
  editForm.classList.toggle("hide");
  toDoList.classList.toggle("hide");
  toDoForm.classList.toggle("hide");
};

// Finds the task whose title matches the old value and updates it with the new text
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".to-do");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      upadteTodoLocalStorage(oldInputValue, text);
    }
  });
};

// Filters the visible tasks based on the search text, matching against each task's title
const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".to-do");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    const normalizedSearch = search.toLowerCase();

    // Reset visiblity before checking, otherwise previously hidden tasks would stay hidden
    todo.style.display = "flex";

    if (!todoTitle.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

// Filters the visible tasks based on the selected option (all, done and todo)
const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".to-do");

  // Show every tasks, regardless of status
  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    // Show only the tasks marked as done
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none"),
      );
      break;

    // Show only the tasks that are still pending
    case "to-do":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none"),
      );
      break;

    // Fallback in case filterValure doesn't match any known option
    default:
      break;
  }
};

// Events

// Handles the form submission to add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on form submit

  const toDoInputValue = toDoInput.value;

  if (toDoInputValue.trim()) {
    saveTodo(toDoInputValue);
  }
});

// Event delegation
// Hanlde clicks on tasks aciton buttons (finish, edit and remove) using
// event delegation, since the elements are create dynamically
document.addEventListener("click", (e) => {
  const targetEl = e.target;

  // Finds the closest parent ""div" (the task containe) from the clicked element
  const parentEl = targetEl.closest("div");

  let toDoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    toDoTitle = parentEl.querySelector("h3").innerText;
  }
  // Toggles the "done" state when the finish button is clicked
  if (targetEl.classList.contains("to-do-finish")) {
    parentEl.classList.toggle("done");

    updateTodoStatusLocalStorage(toDoTitle);
  }

  // Removes the task from the DOM when the remove button is clicked
  if (targetEl.classList.contains("to-do-remove")) {
    parentEl.remove();

    // Also removes it from localStorage to keep data in sync
    removeTodoLocalStorage(toDoTitle);
  }

  // Opens the edit form and fills it with the clicked task's data
  // Kept inside this "if" so it only runs when the edit button itself is clicked,
  // not on every click that happens inside the edit form afterwards
  if (targetEl.classList.contains("to-do-edit")) {
    toggleForms();

    editInput.value = toDoTitle;
    oldInputValue = toDoTitle;
  }
});

// Handles the cancel button, closing the edit form without saving changes
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

// Handles the edit form submission, updating the task and closing the edit view
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

// Search event

// Filters the task list in real time as the user types
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

// Clears the search field and manually trigger "keyup" to make all tasks
// visible again, since changing .value via code doesn't fire the event on its own
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

// Re-filters the tasks list whenever the selected option changes
filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

// Local Storage

// Gets the saved tasks from localStorage, or an empty array if none exist yet
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

// Adds a new task to the saved list and updates the localStorage
const saveTodosLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

// Load todos

// Recreates each saved task on the screen when the page loads,
// without saving them again (save = 0 avoids duplication saving localStorage data)
const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

// Remove todos

// Removes a task from localStorage by filtering out the one matching the given text
const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null,
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const upadteTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null,
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

// Runs on page load, rendering any tasks previously saved in localStorage
loadTodos();
