const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

// Add a new task
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const description = taskInput.value.trim();
    if (description) {
        tasks.push({ description, completed: false });
        taskInput.value = "";
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.sort((a, b) => a.completed - b.completed);

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));

        const taskDescription = document.createElement("span");
        taskDescription.textContent = task.description;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "&#x1F5D1;";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(taskDescription);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
