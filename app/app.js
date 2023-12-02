function sendMessage(e) {
  console.log("submitting", e);
  e.preventDefault();
  const inputText = document.querySelector("input");
  if (inputText.value) {
    const list = document.querySelector("ul");
    const newListItem = document.createElement("li");
    newListItem.innerText = inputText.value;

    list.appendChild(newListItem);
    inputText.value = "";
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", sendMessage);
