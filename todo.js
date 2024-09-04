document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);

        taskItem.appendChild(deleteBtn);
        taskItem.addEventListener('click', toggleTask);

        document.getElementById('todo-list').appendChild(taskItem);

        taskInput.value = '';
    }
}

function deleteTask(event) {
    event.stopPropagation();
    event.target.parentElement.remove();
}

function toggleTask(event) {
    event.target.classList.toggle('completed');
}
