// SmartTask - Task Details Page


const taskTitleElement =
    document.querySelector("#task-title");

const taskDescriptionElement =
    document.querySelector("#task-description");

const taskStatusElement =
    document.querySelector("#task-status");

const taskDetailDescriptionElement =
    document.querySelector("#task-detail-description");


// Get task ID from URL

const urlParams =
    new URLSearchParams(window.location.search);

const taskId =
    Number(urlParams.get("id"));


// Load tasks

function loadTask() {

    fetch("../data/tasks.json")

        .then(function (response) {

            return response.json();

        })

        .then(function (tasks) {

            const task =
                tasks.find(function (task, index) {

                    return index === taskId;

                });


            if (!task) {

                showTaskNotFound();

                return;

            }


            displayTask(task);

        })

        .catch(function (error) {

            console.error(
                "Failed to load task:",
                error
            );

        });

}


// Display task

function displayTask(task) {

    taskTitleElement.textContent =
        task.title;


    taskDescriptionElement.textContent =
        task.description;


    taskDetailDescriptionElement.textContent =
        task.description;


    taskStatusElement.textContent =
        getStatusText(task.status);


    taskStatusElement.classList.add(
        getStatusClass(task.status)
    );

}


// Get readable status

function getStatusText(status) {

    if (status === "completed") {

        return "Completed";

    }


    if (status === "in-progress") {

        return "In Progress";

    }


    return "Pending";

}


// Get status CSS class

function getStatusClass(status) {

    if (status === "completed") {

        return "task-status-completed";

    }


    if (status === "in-progress") {

        return "task-status-progress";

    }


    return "task-status-pending";

}


// Handle invalid task

function showTaskNotFound() {

    taskTitleElement.textContent =
        "Task Not Found";

    taskDescriptionElement.textContent =
        "The task you are looking for does not exist.";

    taskDetailDescriptionElement.textContent =
        "Please return to the Tasks page and choose another task.";

    taskStatusElement.textContent =
        "Not Found";

}


// Start

loadTask();