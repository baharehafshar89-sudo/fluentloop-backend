const chat = document.getElementById("chat");

function addMessage(text, cls){
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send(){

  const input = document.getElementById("input");
  const message = input.value;

  if(!message) return;

  addMessage(message,"user");

  input.value="";

  const res = await fetch("/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:message
    })
  });

  const data = await res.json();

  addMessage(data.reply,"ai");
}
