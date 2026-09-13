// SmartTask - Tasks Page


const tasksListElement = document.querySelector("#tasks-list");

const taskFormSection = document.querySelector("#task-form-section");

const openTaskFormButton = document.querySelector("#open-task-form");

const cancelTaskFormButton = document.querySelector("#cancel-task-form");

const taskForm = document.querySelector("#task-form");

const taskTitleInput = document.querySelector("#task-title");

const taskDescriptionInput = document.querySelector("#task-description");

const taskStatusInput = document.querySelector("#task-status");


// Store tasks in memory
let tasks = [];


// Load tasks from JSON
function loadTasks() {

    fetch("../data/tasks.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            tasks = data;

            renderTasks();

        })
        .catch(function (error) {

            console.error(
                "Failed to load tasks:",
                error
            );

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


    taskActions.appendChild(completeButton);

    taskActions.appendChild(deleteButton);


    taskCard.appendChild(taskHeader);

    taskCard.appendChild(taskDescription);

    taskCard.appendChild(taskActions);


    return taskCard;

}


// Display all tasks
function renderTasks() {

    tasksListElement.innerHTML = "";


    tasks.forEach(function (task, index) {

        const taskElement = createTaskElement(
            task,
            index
        );

        tasksListElement.appendChild(taskElement);

    });

}


// Add new task
function addTask(title, description, status) {

    const newTask = {

        title: title,

        description: description,

        status: status

    };


    tasks.push(newTask);

    renderTasks();

}


// Update task status
function updateTaskStatus(index, newStatus) {

    tasks[index].status = newStatus;

    renderTasks();

}


// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

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


// Start application
loadTasks();