const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addMessage(text, className){

const msg = document.createElement("div");
msg.className = "message " + className;
msg.textContent = text;

chat.appendChild(msg);

chat.scrollTop = chat.scrollHeight;

}

async function sendMessage(){

const text = input.value.trim();

if(!text) return;

addMessage(text,"user");

input.value="";

const res = await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:text})
});

const data = await res.json();

addMessage(data.reply,"ai");

}

input.addEventListener("keypress",function(e){
if(e.key==="Enter"){
sendMessage();
}
});

    const errorMsg = document.createElement("div");
    errorMsg.innerText = "server error";

    chatBox.appendChild(errorMsg);

  }

}
