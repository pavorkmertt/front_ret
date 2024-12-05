const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
};

// Middleware для обработки JSON
app.use(cors);
app.use(express.json());

// Подключение к MongoDB
mongoose.connect("mongodb+srv://lockdawnwest:JVfy4aGE13CYwPwk@cluster0.yf04z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Схема и модель задачи
const taskSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    symptom: { type: String, required: true },
    description: String,
    resolved: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// Маршрут для получения всех заданий
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

// Маршрут для добавления нового задания
app.post("/new", async (req, res) => {
    const { firstName, lastName, email, description, symptom, resolved } = req.body;

    const task = new Task({
        firstName,
        lastName,
        email,
        description,
        symptom,
        resolved,
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: "Error adding task", error: err.message });
    }
});

// Маршрут для редактирования задания
app.put("/edit-task/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Error updating task", error: err.message });
    }
});

// Маршрут для удаления задания
app.delete("/delete-task/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (err) {
        res.status(400).json({ message: "Error deleting task", error: err.message });
    }
});

app.get("/get-task/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Error fetching task", error: err.message });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
