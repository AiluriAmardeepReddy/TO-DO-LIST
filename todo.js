let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let todoUserInput = document.getElementById("todoUserInput");

todoUserInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        onAddTodo();
    }
});

let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue.trim() === "") {
        document.getElementById("validationMsg").style.display = "block";
        return;
    } else {
        document.getElementById("validationMsg").style.display = "none";
    }

    todoCount++;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
    todoList.splice(deleteIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

    let editIcon = document.createElement("i");
    editIcon.classList.add("far", "fa-edit", "delete-icon"); 
    editIcon.onclick = function () {
        let newText = prompt("Edit your task", todo.text);
        if (newText !== null && newText.trim() !== "") {
            labelElement.textContent = newText;
            todo.text = newText;
        }
    };
    deleteIconContainer.appendChild(editIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    let searchValue = searchInput.value.toLowerCase();

    for (let todo of todoList) {
        let todoId = "todo" + todo.uniqueNo;
        let todoElement = document.getElementById(todoId);

        if (todo.text.toLowerCase().includes(searchValue)) {
            todoElement.style.display = "flex";
        } else {
            todoElement.style.display = "none";
        }
    }
});
