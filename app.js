const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

function readTasks() {
    const data = fs.readFileSync("tasks.json", "utf8");
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

app.get("/api/tasks", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.post("/api/tasks", (req, res) => {
    const tasks = readTasks();

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
    const tasks = readTasks();

    const task = tasks.find(
        task => task.id === parseInt(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    task.completed = !task.completed;

    writeTasks(tasks);

    res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const tasks = readTasks();

    const filteredTasks = tasks.filter(
        task => task.id !== parseInt(req.params.id)
    );

    writeTasks(filteredTasks);

    res.json({
        message: "Task deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
