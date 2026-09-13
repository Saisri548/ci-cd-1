async function loadTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.title}
            ${task.completed ? "✅" : "❌"}
            <button onclick="toggleTask(${task.id})">
                Toggle
            </button>
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");

    const title = input.value.trim();

    if (!title) {
        return;
    }

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    input.value = "";

    loadTasks();
}

async function toggleTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: "PUT"
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
