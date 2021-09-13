const socket = io();

let user_name;
let textArea = document.querySelector("textarea");
let messageArea = document.querySelector(".message_area");
var joinAudio = new Audio("/sound/sound2.mp3");
var messageAudio = new Audio("/sound/sound1.mp3");

// Run prompt in Loop until to Accept Name from User
do {
  user_name = prompt("Please Enter Your Name:");
} while (!user_name);

// Function ==> Set Scrolling Message Part
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

// #########################################################
// <<<==== Create div section in which user name store ====>>>
function appendJoinMessage(user_name, position) {
  let mainDiv = document.createElement("div");
  let className = position;
  mainDiv.classList.add(className, "message", "new_user");
  // Create single chat section
  let markup = `
      <p><b>${user_name}</b> - Joined the Chat</p>
      `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Working ==> Emit New user join message
socket.emit("new_user_joined", user_name);
// Working ==> Lisen and display new user Join
socket.on("user_joined", (msg) => {
  // Function call
  appendJoinMessage(msg, "outgoing");
  scrollToBottom();
  joinAudio.play();
});

// ################################################################
// <<<==== Create div section in which chat Message are store =====>>>
function appendMessage(msg, position) {
  let mainDiv = document.createElement("div");
  let className = position;
  mainDiv.classList.add(className, "message");
  // Create single chat section
  let markup = `
    <h4 style="text-transform: capitalize;">${msg.user}:&nbsp;</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// <<<==== Create Function to Send Message to Server and Browser ====>>
function sendMessage(message) {
  let msg = {
    user: user_name,
    message: message.trim(),
  };
  //Function call
  appendMessage(msg, "incoming");
  textarea.value = "";
  scrollToBottom();
  // Message send to server
  socket.emit("message", msg);
}

// Working ==> Textarea Message Send to Server and Browser
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    // Function call
    sendMessage(e.target.value);
  }
});

// Working ==> Recieve Message from socket.io
socket.on("message", (msg) => {
  // Function call
  appendMessage(msg, "outgoing");
  messageAudio.play();
  scrollToBottom();
});

// ###############################################################
// <<<==== Create div section in which Disjoined user name store ====>>>
// function appendDisconnectMessage(user_name, position) {
//   let mainDiv = document.createElement("div");
//   let className = position;
//   mainDiv.classList.add(className, "message", "new_user");
//   let markup = `
//       <p><b>${user_name}</b> - Disconnect the Chat</p>
//       `;
//   mainDiv.innerHTML = markup;
//   messageArea.appendChild(mainDiv);
// }

// socket.on("left", (user_name) => {
//   appendDisconnectMessage(user_name, "outgoing");
//   scrollToBottom();
// });
