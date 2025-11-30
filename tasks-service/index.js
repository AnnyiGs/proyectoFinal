const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Base de datos simple (en memoria)
let tasks = [];

// Crear una tarea
app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "El título es obligatorio." });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    // Llamar a notify-service
    try {
        await axios.post("http://notify-service:3002/notify", {
            message: `Nueva tarea creada: ${title}`
        });
    } catch (err) {
        console.error("❌ Error comunicando con notify-service:", err.message);
    }

    return res.json({
        status: "Task created",
        task: newTask
    });
});

// Listar tareas
app.get("/tasks", (req, res) => {
    return res.json(tasks);
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`📝 Tasks Service running on port ${PORT}`);
});
