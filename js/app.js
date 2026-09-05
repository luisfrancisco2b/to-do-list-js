// Elements Selection
const toDoForm = document.querySelector("#to-do-form");
const editForm = document.querySelector("#edit-form");

const toDoInput = document.querySelector("#to-do-input");
const editInput = document.querySelector("#edit-input");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const toDoList = document.querySelector("#to-do-list");

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

// Events

// Handles the form submission to add a new task
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on form submit

  const toDoInputValue = toDoInput.value;

  if (toDoInputValue.trim()) {
    saveData(toDoInputValue);
  }
});
