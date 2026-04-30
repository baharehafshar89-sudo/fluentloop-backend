
const chat = document.getElementById("chat");

async function send(){

const input = document.getElementById("input");
const text = input.value;

if(!text) return;

addMessage("user", text);
input.value = "";

const res = await fetch("https://fluentloop-backend.onrender.com/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:text})
});

const data = await res.json();

addMessage("ai", data.reply);

}

function addMessage(role,text){

const div = document.createElement("div");
div.className = "message " + role;
div.innerText = text;

chat.appendChild(div);
chat.scrollTop = chat.scrollHeight;

}
