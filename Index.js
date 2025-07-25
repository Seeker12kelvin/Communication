import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js"
import {getDatabase,
        ref,
        push,
        onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-d90a4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDtb = ref(database, "Texts")

const finputEl = document.getElementById("User")
const inputEl = document.getElementById("Input")
const outputEl = document.getElementById("ul-list")
const buttonEl = document.getElementById("Button")
const greenEl = document.querySelector("li")
let messages = []

outputEl.style.display = 'none'

buttonEl.addEventListener("click", handleAddMessage) 

function handleAddMessage() {
    const value = inputEl.value.trim()
    if (!value) {
        alert("You need to write something!")
        return
    }
    messages.push(value)
    renderMessages(messages)
    push(referenceInDtb, value)
    inputEl.value = ""
    outputEl.style.display = 'flex'
}

function renderMessages(objectVal) {
    outputEl.innerHTML = ""
    for (let i = 0; i < objectVal.length; i++) {
        outputEl.innerHTML += `<li class="green-box">${objectVal[i]} <span style='font-size:8px;'>&#8598;${finputEl.value} </span> </li>`
    }
}

onValue(referenceInDtb, function(snapshot) {
    const snapshotExist = snapshot.exists() 
    if (snapshotExist) {
        const snapshotValues = snapshot.val()
        let objectVal = Object.values(snapshotValues)
        renderMessages(objectVal)
    }
})

greenEl.addEventListener("click", function() {
    greenEl.classList.add('animateone')
})