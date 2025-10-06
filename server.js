// server.js
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configura tu API key de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // asegúrate de tener esta variable en tu entorno
});

// Endpoint del chatbot
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: 'No he recibido ningún mensaje.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error al conectar con OpenAI:', error);
    res.status(500).json({ reply: 'Hubo un problema al generar la respuesta.' });
  }
});

// Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
