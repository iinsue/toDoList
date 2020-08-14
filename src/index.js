// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const selectInput = document.querySelector(".js-input"),
  addInput = selectInput.querySelector("input"),
  penList = document.querySelector(".js-pending"),
  finList = document.querySelector(".js-finished");

const PEN_LS = "Pending";
const FIN_LS = "Finished";

let pendingList = [];
let finishedList = [];

function savePens() {
  localStorage.setItem(PEN_LS, JSON.stringify(pendingList));
}
function saveFins() {
  localStorage.setItem(FIN_LS, JSON.stringify(finishedList));
}

function passFin(event) {
  const btn = event.target;
  let li = btn.parentNode;
  const passToDo = pendingList.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  console.log(passToDo);
  const cleanToDo = pendingList.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingList = cleanToDo;
  // 버튼대체
  const replaceTarget = document.getElementById(li.id);
  const replaceBtn = replaceTarget.querySelector("button");

  const reBtn = document.createElement("button");
  reBtn.innerText = "🔺";
  reBtn.addEventListener("click", passPen);
  li.replaceChild(reBtn, replaceBtn);
  finList.appendChild(li);
  finishedList.push(passToDo[0]);
  saveFins();
  savePens();
}

function passPen(event) {
  const btn = event.target;
  let li = btn.parentNode;
  const passToDo = finishedList.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDo = finishedList.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  finishedList = cleanToDo;
  const replaceTarget = document.getElementById(li.id);
  const replaceBtn = replaceTarget.querySelector("button");

  const reBtn = document.createElement("button");
  reBtn.innerText = "🔻";
  reBtn.addEventListener("click", passFin);
  li.replaceChild(reBtn, replaceBtn);
  penList.appendChild(li);
  pendingList.push(passToDo[0]);
  saveFins();
  savePens();
}

function delPen(event) {
  const btn = event.target;
  const li = btn.parentNode;
  penList.removeChild(li);
  const cleanToDo = pendingList.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingList = cleanToDo;
  savePens();
}
function delFin(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const cleanToDo = finishedList.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedList = cleanToDo;
  saveFins();
}

function paintFin(obj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const passBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  passBtn.innerText = "🔺";
  passBtn.addEventListener("click", passPen);
  delBtn.innerText = "💥";
  delBtn.addEventListener("click", delFin);
  span.innerText = obj.text;
  li.appendChild(span);
  li.appendChild(passBtn);
  li.appendChild(delBtn);
  finList.appendChild(li);
}

function paintPen(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const passBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendingList.length + 1;
  passBtn.innerText = "🔻";
  passBtn.addEventListener("click", passFin);
  delBtn.innerText = "💥";
  delBtn.addEventListener("click", delPen);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(passBtn);
  li.appendChild(delBtn);
  penList.appendChild(li);
  li.id = newId;
  const taskObj = {
    id: newId,
    text: text
  };
  pendingList.push(taskObj);
  savePens();
}

function loadPending() {
  const loadTasks = localStorage.getItem(PEN_LS);
  if (loadTasks !== null) {
    const parsedTasks = JSON.parse(loadTasks);
    parsedTasks.forEach(function (toDo) {
      paintPen(toDo.text);
    });
  }
}

function loadFinished() {
  const loadFins = localStorage.getItem(FIN_LS);
  if (loadFins !== null) {
    const parsedTasks = JSON.parse(loadFins);
    parsedTasks.forEach(function (toDo) {
      paintFin(toDo);
    });
  }
}

function submitHandler(event) {
  event.preventDefault();
  const currentValue = addInput.value;
  paintPen(currentValue);
  addInput.value = "";
}

function init() {
  loadPending();
  loadFinished();
  selectInput.addEventListener("submit", submitHandler);
}

init();
