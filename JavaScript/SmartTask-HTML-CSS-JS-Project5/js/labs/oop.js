// SmartTask - OOP Lab

class Task {
    constructor(title, description, status = "pending") {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    getSummary() {
        return `${this.title} - ${this.status}`;
    }

    complete() {
        this.status = "completed";
    }

    isCompleted() {
        return this.status === "completed";
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}


// Create Task objects
const task1 = new Task(
    "Learn JavaScript",
    "Review JavaScript Essentials 2",
    "in-progress"
);

const task2 = new Task(
    "Practice CSS",
    "Build responsive layouts",
    "completed"
);

const task3 = new Task(
    "Build SmartTask",
    "Continue building the project"
);


// Access object properties
console.log(task1.title);
console.log(task1.status);


// Call object methods
console.log(task1.getSummary());


// Change task status
task1.complete();

console.log(task1);
console.log(task1.isCompleted());


// Update status using a method
task3.updateStatus("in-progress");

console.log(task3);


// Create multiple tasks
const tasks = [task1, task2, task3];

console.log(tasks);


// Use array methods with objects
const completedTasks = tasks.filter(function (task) {
    return task.isCompleted();
});

console.log("Completed tasks:", completedTasks);


// Map task summaries
const taskSummaries = tasks.map(function (task) {
    return task.getSummary();
});

console.log("Task summaries:", taskSummaries);


// Find a specific task
const foundTask = tasks.find(function (task) {
    return task.title === "Practice CSS";
});

console.log("Found task:", foundTask);