// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint del chatbot
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;

  // Aquí puedes conectar con una API real como OpenAI si lo deseas.
  // Por ahora, responderemos con lógica básica:
  let reply = '';

  if (!userMessage) {
    reply = 'No he recibido ningún mensaje.';
  } else if (userMessage.toLowerCase().includes('capital de francia')) {
    reply = 'La capital de Francia es París.';
  } else {
    reply = `Recibí tu mensaje: "${userMessage}". ¿Puedes ser más específico?`;
  }

  res.json({ reply });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
