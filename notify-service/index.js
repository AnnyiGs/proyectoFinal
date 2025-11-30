const express = require("express");
const app = express();
app.use(express.json());

// Endpoint simple para probar el servicio
app.post("/notify", (req, res) => {
    const { message } = req.body;

    console.log("📩 Notificación recibida:", message);

    // Simulación de envío
    return res.json({
        status: "ok",
        delivered: true,
        receivedMessage: message
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 Notify Service running on port ${PORT}`);
});
