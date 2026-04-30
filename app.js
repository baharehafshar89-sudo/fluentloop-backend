const apiUrl = "https://fluentloop-backend.onrender.com/chat";

async function sendMessage() {

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  const userMsg = document.createElement("div");
  userMsg.innerText = message;
  chatBox.appendChild(userMsg);

  input.value = "";

  try {

    const res = await fetch(apiUrl,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await res.json();

    const aiMsg = document.createElement("div");
    aiMsg.innerText = data.reply || "no response";

    chatBox.appendChild(aiMsg);

  } catch(err){

    const errorMsg = document.createElement("div");
    errorMsg.innerText = "server error";

    chatBox.appendChild(errorMsg);

  }

}
