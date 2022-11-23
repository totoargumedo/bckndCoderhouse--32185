const socket = io();

socket.on("messagesAll", (data) => {
  loadChatTable(data);
});

const buttonChat = document.getElementById("buttonChat");

function loadChatTable(data) {
  const chat = data;
  let html = "";
  chat.reverse().forEach((element) => {
    html += `<tr>
        <th scope="row" class="text-center align-middle"><img
            width="30"
            src="${element.avatar}"
            alt="${element.email}"
          /></th>
        <td class="align-middle">${element.email}</td>
        <td class="align-middle">${element.timestamp}hs</td>
        <td class="align-middle">${element.textChat}</td>
      </tr>`;
  });
  document.getElementById("tableBody").innerHTML = html;
}

buttonChat.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    avatar: document.querySelector('input[name="avatar"]').value,
    email: document.querySelector('input[name="email"]').value,
    textChat: document.querySelector('input[name="textChat"]').value,
    timestamp: new Date().getHours(),
  };

  document.querySelector('input[name="textChat"]').value = "";
  document.querySelector('input[name="textChat"]').focus();
  socket.emit("newMessage", data);
});
