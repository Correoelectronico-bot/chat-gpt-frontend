function enviarMensaje() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const mensaje = input.value.trim();
  if (mensaje === "") return;

  const respuesta = `🤖 Bot: Has dicho "${mensaje}"`;

  const mensajeUsuario = document.createElement("p");
  mensajeUsuario.textContent = `🧑 Tú: ${mensaje}`;

  const mensajeBot = document.createElement("p");
  mensajeBot.textContent = respuesta;

  chatBox.appendChild(mensajeUsuario);
  chatBox.appendChild(mensajeBot);

  input.value = "";
}
