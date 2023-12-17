const socket = io("ws://localhost:3500");
function sendMessage(e) {
  console.log("submitting", e);
  e.preventDefault();
  const inputElem = document.querySelector("input");
  let inputVal = inputElem.value;
  if (inputVal) {
    socket.emit("message", inputVal);
    // const list = document.querySelector("ul");
    // const newListItem = document.createElement("li");
    // newListItem.innerText = inputVal;
    // console.log("ws readystate", socket.readyState);
    // list.appendChild(newListItem);
    inputElem.value = "";
  }
  inputElem.focus();
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
});
