import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el backend está activo
app.get('/', (req, res) => {
  res.send('🚀 Backend activo y escuchando.');
});

// Ruta principal del chatbot
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: 'No he recibido ningún mensaje.' });
  }

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: userMessage }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error al conectar con Groq:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Hubo un problema al generar la respuesta con Groq.' });
  }
});

// Puerto de escucha
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
