// SmartTask - Analytics Page


const totalTasksElement =
    document.querySelector("#total-tasks");

const completedTasksElement =
    document.querySelector("#completed-tasks");

const inProgressTasksElement =
    document.querySelector("#in-progress-tasks");

const pendingTasksElement =
    document.querySelector("#pending-tasks");

const donutChartElement =
    document.querySelector("#donut-chart");

const donutTotalElement =
    document.querySelector("#donut-total");

const completedLegendElement =
    document.querySelector("#completed-legend");

const progressLegendElement =
    document.querySelector("#progress-legend");

const pendingLegendElement =
    document.querySelector("#pending-legend");

const completedBarElement =
    document.querySelector("#completed-bar");

const progressBarElement =
    document.querySelector("#progress-bar");

const pendingBarElement =
    document.querySelector("#pending-bar");

const completedBarValueElement =
    document.querySelector("#completed-bar-value");

const progressBarValueElement =
    document.querySelector("#progress-bar-value");

const pendingBarValueElement =
    document.querySelector("#pending-bar-value");

const completionRateElement =
    document.querySelector("#completion-rate");

const progressPercentageElement =
    document.querySelector("#progress-percentage");

const completionProgressElement =
    document.querySelector("#completion-progress");

const completionDescriptionElement =
    document.querySelector("#completion-description");


// Calculate analytics

function calculateAnalytics(tasks) {

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(function (task) {

            return task.status === "completed";

        }).length;


    const inProgressTasks =
        tasks.filter(function (task) {

            return task.status === "in-progress";

        }).length;


    const pendingTasks =
        tasks.filter(function (task) {

            return task.status === "pending";

        }).length;


    return {

        totalTasks: totalTasks,

        completedTasks: completedTasks,

        inProgressTasks: inProgressTasks,

        pendingTasks: pendingTasks

    };

}


// Calculate percentage

function calculatePercentage(value, total) {

    if (total === 0) {

        return 0;

    }


    return Math.round(
        (value / total) * 100
    );

}


// Update summary cards

function updateSummary(analytics) {

    totalTasksElement.textContent =
        analytics.totalTasks;


    completedTasksElement.textContent =
        analytics.completedTasks;


    inProgressTasksElement.textContent =
        analytics.inProgressTasks;


    pendingTasksElement.textContent =
        analytics.pendingTasks;

}


// Update donut chart

function updateDonutChart(analytics) {

    const completedPercentage =
        calculatePercentage(
            analytics.completedTasks,
            analytics.totalTasks
        );


    const progressPercentage =
        calculatePercentage(
            analytics.inProgressTasks,
            analytics.totalTasks
        );


    const completedEnd =
        completedPercentage;


    const progressEnd =
        completedPercentage +
        progressPercentage;


    donutChartElement.style.background =
        `conic-gradient(
            var(--color-success) 0% ${completedEnd}%,
            var(--color-info) ${completedEnd}% ${progressEnd}%,
            var(--color-warning) ${progressEnd}% 100%
        )`;


    donutTotalElement.textContent =
        analytics.totalTasks;


    completedLegendElement.textContent =
        analytics.completedTasks;


    progressLegendElement.textContent =
        analytics.inProgressTasks;


    pendingLegendElement.textContent =
        analytics.pendingTasks;

}


// Update bar chart

function updateBarChart(analytics) {

    const totalTasks =
        analytics.totalTasks;


    const completedPercentage =
        calculatePercentage(
            analytics.completedTasks,
            totalTasks
        );


    const progressPercentage =
        calculatePercentage(
            analytics.inProgressTasks,
            totalTasks
        );


    const pendingPercentage =
        calculatePercentage(
            analytics.pendingTasks,
            totalTasks
        );


    completedBarElement.style.width =
        `${completedPercentage}%`;


    progressBarElement.style.width =
        `${progressPercentage}%`;


    pendingBarElement.style.width =
        `${pendingPercentage}%`;


    completedBarValueElement.textContent =
        analytics.completedTasks;


    progressBarValueElement.textContent =
        analytics.inProgressTasks;


    pendingBarValueElement.textContent =
        analytics.pendingTasks;

}


// Update completion

function updateCompletion(analytics) {

    const completionRate =
        calculatePercentage(
            analytics.completedTasks,
            analytics.totalTasks
        );


    completionRateElement.textContent =
        `${completionRate}%`;


    progressPercentageElement.textContent =
        `${completionRate}%`;


    completionProgressElement.value =
        completionRate;


    completionDescriptionElement.textContent =
        `You have completed ${analytics.completedTasks} out of ${analytics.totalTasks} tasks.`;

}


// Display everything

function displayAnalytics(analytics) {

    updateSummary(analytics);

    updateDonutChart(analytics);

    updateBarChart(analytics);

    updateCompletion(analytics);

}


// Load data

function loadAnalytics() {

    fetch("../data/tasks.json")

        .then(function (response) {

            return response.json();

        })

        .then(function (tasks) {

            const analytics =
                calculateAnalytics(tasks);


            displayAnalytics(analytics);

        })

        .catch(function (error) {

            console.error(
                "Failed to load analytics:",
                error
            );

        });

}


// Start application

loadAnalytics();