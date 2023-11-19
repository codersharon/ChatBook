var socket = io();
let ID = prompt('Enter Your Name to join the chat')
if (ID == null) {
} else {
  document.title = 'Chatbook | ' + ID;
}

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");
let imgI = document.getElementById('file');
let videoI = document.getElementById('video');
let vbox = document.createElement('video');

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", ID, input.value);
    async function saveMess() {
    function reqListener() {
      console.log(this.response);
    }

    let request = {name:ID, mess:input.value}
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("POST", "https://ChatAPI.sharonsandeep.repl.co/addMess");
    req.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(request);
    req.send(data);
  }
    saveMess();
    // vbox.setAttribute('controls');
    input.value = "";
    imgI.value = "";
    videoI.value = "";
  };
});

imgI.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = reader.result;
    socket.emit("chat message", ID, input.value, image);
    // vbox.setAttribute('controls');
  });
  reader.readAsDataURL(this.files[0]);
});

videoI.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const video = reader.result;
    console.log(video);
    socket.emit("chat message", ID, input.value, "", video);
    // vbox.setAttribute('controls', '');
    videoI.value = "";
  });
  reader.readAsDataURL(this.files[0]);
});
socket.on('chat message', (ID, msg, photo, videosrc) => {
  let Textmessage = document.createElement('li');
  let displayTime = document.createElement('div');
  let pbox = document.createElement('img');
  vbox.src = videosrc;
  vbox.classList.add('media');
  pbox.alt = "";
  // pbox.style.backgroundImage = `url(${photo})`;
  let msgTime = new Date().getHours() + ":" + new Date().getMinutes();
  displayTime.textContent = msgTime;
  displayTime.classList.add('font-size-small');
  Textmessage.textContent = ID + ": " + msg;
  Textmessage.classList.add('media', 'radius-fine', 'navbar-dark', 'flex', 'flex-column', 'bg-white', 'font-size-medium', 'item-center', 'List-none');
  // Textmessage.style.width = "fit-content";
  Textmessage.style.margin = "2%";
  Textmessage.style.padding = "5px 15px";
  pbox.src = photo;
  pbox.style.margin = "2%";
  pbox.style.width = "500px";
  vbox.setAttribute('controls', '');
  Textmessage.append(displayTime, pbox);
  messages.append(Textmessage);
  // messages.append();
})

let Darkmode = document.getElementById('Darkmode');
let navbar = document.getElementById('nav');

Darkmode.addEventListener('click', () => {
  let Body = document.getElementById('body');
  if (Body.style.backgroundColor == "black") {
    Body.style.backgroundColor = "white";
    navbar.classList.remove('navbar-dark');
    navbar.classList.remove('navbar-dark');
    navbar.classList.add('bg-sand');
    form.classList.add('bg-sand');
    messages.classList.remove('bg-black');
    messages.classList.add('bg-white');
  } else {
    Body.style.backgroundColor = "black";
    navbar.classList.remove('bg-sand');
    form.classList.remove('bg-sand');
    navbar.classList.add('navbar-dark');
    form.classList.add('bg-black');
    messages.classList.remove('bg-white');
    messages.classList.add('bg-black');
  };
});