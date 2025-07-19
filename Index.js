const inputEl = document.getElementById("Input");
const outputEl = document.getElementById("ul-list");
const buttonEl = document.getElementById("Button");
let messages = [];

outputEl.style.display = 'none'

buttonEl.addEventListener("click", handleAddMessage) // Adds an event listener to the button

let storedMessages = JSON.parse( localStorage.getItem("Texts") )
if (storedMessages) {
    messages = storedMessages
    renderMessages() // If there are messages in localStorage, render them
}

function handleAddMessage() {
    const value = inputEl.value.trim() // storing the value of the input(which is empty) into a variable
    if (!value) { // Just because value is a truthy value, we don't need to put it in a condition
        alert("You need to write something!")
        return // If the value is empty, send a message to the user saying, "You need to write something!"
    }
    messages.push(value)
    renderMessages()
    localStorage.setItem("Texts", JSON.stringify(messages)) // Store the messages in localStorage
    inputEl.value = ""
    outputEl.style.display = 'flex'
}

function renderMessages() {
    outputEl.innerHTML = ""
    messages.forEach(msg => {
        outputEl.innerHTML += `<li class="green-box">${msg}</li>`
    })
}