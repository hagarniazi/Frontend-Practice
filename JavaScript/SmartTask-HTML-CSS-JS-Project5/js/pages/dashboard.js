
// SmartTask - Dashboard

const totalTasksElement = document.querySelector(
    ".summary-card:nth-child(1) .summary-value",
);

const completedTasksElement = document.querySelector(
    ".summary-card:nth-child(2) .summary-value",
);

const inProgressTasksElement = document.querySelector(
    ".summary-card:nth-child(3) .summary-value",
);

const progressElement = document.querySelector(".progress-card progress");

const progressDescriptionElement = document.querySelector(".progress-info p");

const progressPercentageElement = document.querySelector(
    ".progress-stats span:nth-child(2)",
);

const recentTasksContainer = document.querySelector(".recent-tasks-list");


function updateTotalTasks(tasks) {
    const totalTasks = tasks.length;

    totalTasksElement.textContent = totalTasks;

    return totalTasks;
}


function updateCompletedTasks(tasks) {
    const completedTasks = tasks.filter(function (task) {
        return task.status === "completed";
    });

    const completedTasksCount = completedTasks.length;

    completedTasksElement.textContent = completedTasksCount;

    return completedTasksCount;
}


function updateInProgressTasks(tasks) {
    const inProgressTasks = tasks.filter(function (task) {
        return task.status === "in-progress";
    });

    const inProgressTasksCount = inProgressTasks.length;

    inProgressTasksElement.textContent = inProgressTasksCount;

    return inProgressTasksCount;
}


function updateProgress(completedTasks, totalTasks) {
    progressElement.value = completedTasks;

    progressElement.max = totalTasks;

    const progressPercentage =
        (completedTasks / totalTasks) * 100;

    progressPercentageElement.textContent = `${progressPercentage}%`;

    progressDescriptionElement.textContent =
        `You have completed ${completedTasks} out of ${totalTasks} tasks.`;
}


function createTaskElement(task) {
    const taskItem = document.createElement("article");

    taskItem.classList.add("task-item");

    const taskInfo = document.createElement("div");

    taskInfo.classList.add("task-info");

    taskItem.appendChild(taskInfo);

    const taskTitle = document.createElement("h3");

    taskTitle.textContent = task.title;

    taskInfo.appendChild(taskTitle);

    const taskDescription = document.createElement("p");

    taskDescription.textContent = task.description;

    taskInfo.appendChild(taskDescription);

    const taskStatus = document.createElement("span");

    taskStatus.classList.add("task-status");

    if (task.status === "in-progress") {
        taskStatus.classList.add("task-status-progress");
        taskStatus.textContent = "In Progress";
    } else if (task.status === "completed") {
        taskStatus.classList.add("task-status-completed");
        taskStatus.textContent = "Completed";
    } else if (task.status === "pending") {
        taskStatus.classList.add("task-status-pending");
        taskStatus.textContent = "Pending";
    }

    taskItem.appendChild(taskStatus);

    return taskItem;
}


function updateRecentTasks(tasks) {
    recentTasksContainer.innerHTML = "";

    tasks.slice(0, 3).forEach(function (task) {
        const taskElement = createTaskElement(task);

        recentTasksContainer.appendChild(taskElement);
    });
}


fetch("../data/tasks.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Dashboard Summary

        const totalTasks = updateTotalTasks(data);

        const completedTasks = updateCompletedTasks(data);

        updateInProgressTasks(data);

        // Progress

        updateProgress(
            completedTasks,
            totalTasks
        );

        // Recent Tasks

        updateRecentTasks(data);
    })
    .catch(function (error) {
        console.error("Failed to load tasks:", error);
    });

