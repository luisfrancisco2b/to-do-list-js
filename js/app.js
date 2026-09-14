// Elements Selection
const toDoForm = document.querySelector("#to-do-form");
const editForm = document.querySelector("#edit-form");

const toDoInput = document.querySelector("#to-do-input");
const editInput = document.querySelector("#edit-input");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const toDoList = document.querySelector("#to-do-list");

// Stores the original title of the task being edited, used to find and updated it later
let oldInputValue;

// Functions

// Creates and renders a new task element based on the given text
const saveData = (text) => {
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
    }
  });
};

// Events

// Handles the form submission to add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on form submit

  const toDoInputValue = toDoInput.value;

  if (toDoInputValue.trim()) {
    saveData(toDoInputValue);
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
  }

  // Removes the task from the DOM when the remove button is clicked
  if (targetEl.classList.contains("to-do-remove")) {
    parentEl.remove();
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
