
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display Tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task} <button onclick="deleteTask(${index})">Delete</button>`;
    taskList.appendChild(taskItem);
  });
}

// Add Task
function addTask() {
  const taskInput = document.getElementById("task").value;
  if (taskInput) {
    tasks.push(taskInput);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    document.getElementById("task").value = "";
  }
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Initialize Task List
displayTasks();

// Pomodoro Timer
let timer;
let minutes = 25;
let seconds = 0;
const timerDisplay = document.getElementById("timer");

// Start Pomodoro
function startPomodoro() {
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        alert("Time's up! Take a break.");
        resetPomodoro();
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Stop Pomodoro
function stopPomodoro() {
  clearInterval(timer);
}

// Reset Pomodoro
function resetPomodoro() {
  clearInterval(timer);
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
}
