// SmartTask - Tasks Page


const tasksListElement = document.querySelector("#tasks-list");

const taskFormSection = document.querySelector("#task-form-section");

const openTaskFormButton = document.querySelector("#open-task-form");

const cancelTaskFormButton = document.querySelector("#cancel-task-form");

const taskForm = document.querySelector("#task-form");

const taskTitleInput = document.querySelector("#task-title");

const taskDescriptionInput = document.querySelector("#task-description");

const taskStatusInput = document.querySelector("#task-status");

const taskSearchInput = document.querySelector("#task-search-input");


// Store tasks in memory
let tasks = [];

function searchTasks(searchTerm) {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    const filteredTasks = tasks.filter(function (task) {
        return task.title.toLowerCase().includes(normalizedSearchTerm);
    });

    renderTasks(filteredTasks);
}

// Load tasks from JSON

function loadTasks() {
    const savedTasks = localStorage.getItem("smartTaskTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
        return;
    }

    fetch("../data/tasks.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            tasks = data;

            localStorage.setItem(
                "smartTaskTasks",
                JSON.stringify(tasks)
            );

            renderTasks();
        })
        .catch(function (error) {
            console.error("Failed to load tasks:", error);
        });
}


// Create one task card
function createTaskElement(task, index) {

    const taskCard = document.createElement("article");

    taskCard.classList.add("task-card");


    const taskHeader = document.createElement("div");

    taskHeader.classList.add("task-card-header");


    const taskTitle = document.createElement("h3");

    taskTitle.textContent = task.title;


    const taskStatus = document.createElement("span");

    taskStatus.classList.add("task-status");


    if (task.status === "completed") {

        taskStatus.classList.add("task-status-completed");

        taskStatus.textContent = "Completed";

    } else if (task.status === "in-progress") {

        taskStatus.classList.add("task-status-progress");

        taskStatus.textContent = "In Progress";

    } else {

        taskStatus.classList.add("task-status-pending");

        taskStatus.textContent = "Pending";

    }


    taskHeader.appendChild(taskTitle);

    taskHeader.appendChild(taskStatus);


    const taskDescription = document.createElement("p");

    taskDescription.textContent = task.description;


    const taskActions = document.createElement("div");

    taskActions.classList.add("task-actions");


    const completeButton = document.createElement("button");

    completeButton.type = "button";

    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", function () {

        updateTaskStatus(index, "completed");

    });


    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-task");

    deleteButton.addEventListener("click", function () {

        deleteTask(index);

    });

    const detailsButton = document.createElement("button");

    detailsButton.type = "button";

    detailsButton.textContent = "View Details";

    detailsButton.addEventListener("click", function () {

        window.location.href =
            `task-details.html?id=${index}`;

    });


    taskActions.appendChild(detailsButton);

    taskActions.appendChild(completeButton);

    taskActions.appendChild(deleteButton);


    taskCard.appendChild(taskHeader);

    taskCard.appendChild(taskDescription);

    taskCard.appendChild(taskActions);


    return taskCard;

}


// Display all tasks
function renderTasks(tasksToRender = tasks) {
    tasksListElement.innerHTML = "";

    tasksToRender.forEach(function (task) {
        const originalIndex = tasks.indexOf(task);

        const taskElement = createTaskElement(task, originalIndex);

        tasksListElement.appendChild(taskElement);
    });
}

function debounce(callback, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            callback(...args);
        }, delay);
    };
}


// Add new task
function addTask(title, description, status) {
    const newTask = {
        title: title,
        description: description,
        status: status
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
}


// Update task status
function updateTaskStatus(index, newStatus) {
    tasks[index].status = newStatus;

    saveTasks();
    renderTasks();
}


// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}


// Open form
openTaskFormButton.addEventListener(
    "click",
    function () {

        taskFormSection.hidden = false;

        taskTitleInput.focus();

    }
);


// Close form
cancelTaskFormButton.addEventListener(
    "click",
    function () {

        taskForm.reset();

        taskFormSection.hidden = true;

    }
);


// Submit form
taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title = taskTitleInput.value.trim();

        const description =
            taskDescriptionInput.value.trim();

        const status =
            taskStatusInput.value;


        addTask(
            title,
            description,
            status
        );


        taskForm.reset();

        taskFormSection.hidden = true;

    }
);

const debouncedSearch = debounce(function (searchTerm) {
    searchTasks(searchTerm);
}, 300);

taskSearchInput.addEventListener("input", function () {
    debouncedSearch(taskSearchInput.value);
});

// Start application
loadTasks();

function saveTasks() {
    localStorage.setItem(
        "smartTaskTasks",
        JSON.stringify(tasks)
    );
}