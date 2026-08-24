            // DOM Elements

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const tasksContainer = document.querySelector(".tasks");

const clearCompletedButton = document.getElementById("clear-completed");

const allButton = document.getElementById("all");
const activeButton = document.getElementById("active");
const completedButton = document.getElementById("completed");

const tasksLeft = document.querySelector(".task-stats span");


            // Tasks Data

let tasks = [];


            // Local Storage

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}


            // Update Tasks Left

function updateTasksLeft() {

    const activeTasks =
        document.querySelectorAll(".task:not(.completed)");

    tasksLeft.textContent = activeTasks.length;
}


            // Filter Tasks

function filterTasks(filter) {

    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach((task) => {

        if (filter === "all") {
            task.style.display = "flex";
        }

        if (filter === "active") {

            task.style.display =
                task.classList.contains("completed")
                    ? "none"
                    : "flex";
        }

        if (filter === "completed") {

            task.style.display =
                task.classList.contains("completed")
                    ? "flex"
                    : "none";
        }

    });
}


            // Active Filter

function setActiveFilter(button) {

    document
        .querySelectorAll(".filters button")
        .forEach((btn) => {

            btn.classList.remove("active");
        });

    button.classList.add("active");
}


            // Create Task Element

function createTask(taskData) {

    const task = document.createElement("div");

    task.classList.add("task");

    if (taskData.completed) {
        task.classList.add("completed");
    }


    // Checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;

    checkbox.addEventListener("change", () => {

        taskData.completed = checkbox.checked;

        task.classList.toggle(
            "completed",
            checkbox.checked
        );

        saveTasks();
        updateTasksLeft();
    });


    // Task Text
    const taskText = document.createElement("span");

    taskText.textContent = taskData.text;


    // Edit Button
    const editButton = document.createElement("button");

    editButton.classList.add("edit");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {

        const newTask = prompt(
            "Enter new task:",
            taskData.text
        );

        if (newTask === null) {
            return;
        }

        if (newTask.trim() === "") {
            return;
        }

        taskData.text = newTask.trim();

        taskText.textContent = taskData.text;

        saveTasks();
    });


    // Delete Button
    const deleteButton = document.createElement("button");

    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {

        tasks = tasks.filter((task) => {
            return task !== taskData;
        });

        saveTasks();

        task.remove();

        updateTasksLeft();
    });


    // Add Elements
    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(editButton);
    task.appendChild(deleteButton);


    // Add Task to Page
    tasksContainer.appendChild(task);
}


            // Render Tasks

function renderTasks() {

    tasksContainer.innerHTML = "";

    tasks.forEach((taskData) => {
        createTask(taskData);
    });

    updateTasksLeft();
}


            // Add Task

function addTask() {

    if (taskInput.value.trim() === "") {
        return;
    }

    const newTask = {

        id: Date.now(),

        text: taskInput.value.trim(),

        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    createTask(newTask);

    updateTasksLeft();

    taskInput.value = "";
}


            // Add Task Button

addTaskButton.addEventListener("click", () => {

    addTask();
});


            // Enter Key

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        addTask();
    }
});


            // Clear Completed Tasks

clearCompletedButton.addEventListener("click", () => {

    tasks = tasks.filter((task) => {

        return !task.completed;
    });

    saveTasks();

    renderTasks();
});


            // Filter Buttons

allButton.addEventListener("click", () => {

    filterTasks("all");

    setActiveFilter(allButton);
});


activeButton.addEventListener("click", () => {

    filterTasks("active");

    setActiveFilter(activeButton);
});


completedButton.addEventListener("click", () => {

    filterTasks("completed");

    setActiveFilter(completedButton);
});


            // Load Saved Tasks

loadTasks();

renderTasks();

setActiveFilter(allButton);