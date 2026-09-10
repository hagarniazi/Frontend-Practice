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

fetch("../data/tasks.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Total Tasks

        const totalTasksFromData = data.length;

        totalTasksElement.textContent = totalTasksFromData;

        // Completed Tasks

        const completedTasksFromData = data.filter(function (task) {
            return task.status === "completed";
        });

        const completedTasksCountFromData = completedTasksFromData.length;

        completedTasksElement.textContent = completedTasksCountFromData;

        // In Progress Tasks

        const inProgressTasksFromData = data.filter(function (task) {
            return task.status === "in-progress";
        });

        const inProgressTasksCountFromData = inProgressTasksFromData.length;

        inProgressTasksElement.textContent = inProgressTasksCountFromData;

        // Progress

        progressElement.value = completedTasksCountFromData;

        progressElement.max = totalTasksFromData;

        const progressPercentageFromData =
            (completedTasksCountFromData / totalTasksFromData) * 100;

        progressPercentageElement.textContent = `${progressPercentageFromData}%`;

        progressDescriptionElement.textContent =
            `You have completed ${completedTasksCountFromData} out of ${totalTasksFromData} tasks.`;

        // Recent Tasks

        recentTasksContainer.innerHTML = "";

        data.slice(0, 3).forEach(function (task) {
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

            recentTasksContainer.appendChild(taskItem);
        });
    })
    .catch(function (error) {
        console.error("Failed to load tasks:", error);
    });