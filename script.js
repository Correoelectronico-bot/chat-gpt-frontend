async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("p");
  userMsg.textContent = `🧑 Tú: ${message}`;
  chatBox.appendChild(userMsg);

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  const botMsg = document.createElement("p");
  botMsg.textContent = `🤖 Bot: ${data.reply}`;
  chatBox.appendChild(botMsg);

  input.value = "";
}
