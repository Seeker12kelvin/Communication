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

const inputEl = document.getElementById("Input")
const outputEl = document.getElementById("ul-list")
const buttonEl = document.getElementById("Button")
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
    renderMessages()
    push(referenceInDtb, value)
    inputEl.value = ""
    outputEl.style.display = 'flex'
}

function renderMessages(msg) {
    outputEl.innerHTML = ""
    messages.forEach(msg => {
        outputEl.innerHTML += `<li class="green-box">${msg}</li>`
    })
}

onValue(referenceInDtb, function(snapshot) {
    const snapshotExist = snapshot.exists() 
    if (snapshotExist) {
        const snapshotValues = snapshot.val()
        let objectVal = Object.value(snapshotValues)
        renderMessages(objectVal)
    }
})