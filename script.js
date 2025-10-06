async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();
  if (!message) return;

  // Mostrar mensaje del usuario
  const userMsg = document.createElement("p");
  userMsg.textContent = `🧑 Tú: ${message}`;
  chatBox.appendChild(userMsg);

  // Enviar al backend
  try {
   const response = await fetch("https://chat-gpt-frontend-ga2r.onrender.com/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message });
    });

    const data = await response.json();

    // Mostrar respuesta del bot
    const botMsg = document.createElement("p");
    botMsg.textContent = `🤖 Bot: ${data.reply}`;
    chatBox.appendChild(botMsg);
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "🤖 Bot: Error al conectar con el servidor.";
    chatBox.appendChild(errorMsg);
  }

  input.value = "";
}
