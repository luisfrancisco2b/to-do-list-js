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

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("to-do-finish");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  toDo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("to-do-edit");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  toDo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("to-do-remove");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  toDo.appendChild(removeBtn);

  toDoList.appendChild(toDo);

  toDoInput.value = "";
  toDoInput.focus();
};

// Events
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const toDoInputValue = toDoInput.value;

  if (toDoInputValue) {
    saveData(toDoInputValue);
  }
});
