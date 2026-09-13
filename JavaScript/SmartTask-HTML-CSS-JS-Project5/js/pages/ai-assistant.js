// SmartTask - AI Assistant Page


const chatContainer =
    document.querySelector("#chat-container");

const chatForm =
    document.querySelector("#chat-form");

const chatInput =
    document.querySelector("#chat-input");

const quickActionButtons =
    document.querySelectorAll(".quick-action");


let tasks = [];


// Load tasks

function loadTasks() {

    fetch("../data/tasks.json")

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            tasks = data;

        })

        .catch(function (error) {

            console.error(
                "Failed to load tasks:",
                error
            );

        });

}


// Add message to chat

function addMessage(message, sender) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "message"
    );


    if (sender === "user") {

        messageElement.classList.add(
            "user-message"
        );

    } else {

        messageElement.classList.add(
            "assistant-message"
        );

    }


    const avatar =
        document.createElement("div");

    avatar.classList.add(
        "message-avatar"
    );


    avatar.textContent =
        sender === "user"
            ? "You"
            : "AI";


    const content =
        document.createElement("div");

    content.classList.add(
        "message-content"
    );


    const name =
        document.createElement("strong");

    name.textContent =
        sender === "user"
            ? "You"
            : "SmartTask AI";


    const text =
        document.createElement("p");

    text.textContent =
        message;


    content.appendChild(name);

    content.appendChild(text);

    messageElement.appendChild(avatar);

    messageElement.appendChild(content);


    chatContainer.appendChild(
        messageElement
    );


    chatContainer.scrollTop =
        chatContainer.scrollHeight;

}


// Generate response

function generateResponse(question) {

    const normalizedQuestion =
        question.toLowerCase();


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


    if (
        normalizedQuestion.includes("how many") &&
        normalizedQuestion.includes("task")
    ) {

        if (
            normalizedQuestion.includes("completed")
        ) {

            return `You have completed ${completedTasks} tasks.`;

        }


        if (
            normalizedQuestion.includes("progress")
        ) {

            return `You currently have ${inProgressTasks} tasks in progress.`;

        }


        if (
            normalizedQuestion.includes("pending")
        ) {

            return `You have ${pendingTasks} pending tasks.`;

        }


        return `You currently have ${totalTasks} tasks: ${completedTasks} completed, ${inProgressTasks} in progress, and ${pendingTasks} pending.`;

    }


    if (
        normalizedQuestion.includes("completed")
    ) {

        return `You have ${completedTasks} completed tasks.`;

    }


    if (
        normalizedQuestion.includes("pending")
    ) {

        return `You have ${pendingTasks} pending tasks.`;

    }


    if (
        normalizedQuestion.includes("progress")
    ) {

        return `You currently have ${inProgressTasks} tasks in progress.`;

    }


    if (
        normalizedQuestion.includes("productivity") ||
        normalizedQuestion.includes("percentage") ||
        normalizedQuestion.includes("completion")
    ) {

        const completionRate =
            totalTasks === 0
                ? 0
                : Math.round(
                    (completedTasks /
                        totalTasks) * 100
                );


        return `Your current completion rate is ${completionRate}%. Keep going! 💪`;

    }


    return "I can help you with your task statistics. Try asking how many tasks you have, how many are completed, pending, or in progress.";

}


// Handle question

function handleQuestion(question) {

    if (!question.trim()) {

        return;

    }


    addMessage(
        question,
        "user"
    );


    const response =
        generateResponse(question);


    setTimeout(function () {

        addMessage(
            response,
            "assistant"
        );

    }, 400);

}


// Form submit

chatForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const question =
            chatInput.value.trim();


        handleQuestion(question);


        chatInput.value = "";

        chatInput.focus();

    }
);


// Quick actions

quickActionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;


                handleQuestion(question);

            }
        );

    }
);


// Start

loadTasks();