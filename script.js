const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    taskInput.value = "";
    saveData();
    updateProgress();
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }

    saveData();
    updateProgress();
}, false);

function updateProgress() {
    const tasks = document.querySelectorAll("#taskList li");
    const total = tasks.length;
    const completed = document.querySelectorAll("#taskList li.checked").length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";
    progressText.textContent = `${percent}% Completed`;
}

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
    updateProgress();
}

showTask();
