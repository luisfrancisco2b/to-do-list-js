// Elements Selection
const toDoForm = document.querySelector("#to-do-form");
const editForm = document.querySelector("#edit-form");

const toDoInput = document.querySelector("#to-do-input");
const editInput = document.querySelector("#edit-input");

const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const toDoList = document.querySelector("#to-do-list");

// Functions

// Function to save input data
const saveData = (text) => {
  const toDo = document.createElement("div");
  toDo.classList.add("to-do");

  const toDoTitle = document.createElement("h3");
  toDoTitle.innerText = text;

  toDo.appendChild(toDoTitle);

  console.log(toDo);
};

// Events
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const toDoInputValue = toDoInput.value;

  if (toDoInputValue) {
    saveData(toDoInputValue);
  }
});
