const socket = io("ws://localhost:3500");
const msgInput = document.querySelector("input");
const activityContainer = document.querySelector(".activity");

function sendMessage(e) {
  e.preventDefault();
  let inputVal = msgInput.value;
  if (inputVal) {
    socket.emit("message", inputVal);
    msgInput.value = "";
  }
  msgInput.focus();
}

const form = document.querySelector("form");
form.addEventListener("submit", sendMessage);

// Listen for socket messages
socket.on("message", (data) => {
  console.log("data in form from socket is", data);
  const li = document.createElement("li");
  li.textContent = data;
  const ul = document.querySelector("ul");
  ul.append(li);
  activityContainer.textContent = "";
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;
socket.on("activity", (name) => {
  activityContainer.textContent = `${name} is typing...`;

  activityTimer = setTimeout(() => {
    activityContainer.textContent = "";
    clearTimeout(activityTimer);
  }, 3000);
});
