// HTMLElements
const padButtons = document.querySelectorAll(".gamepad .btn")
const controls = document.querySelectorAll(".container.controls .btn")
const btnStart = document.querySelector("#btnStartGame")
const messageContainer = document.querySelector("#message-container")
const gameOverMessage = document.querySelector(".gameover-message")
const btnRestart = messageContainer.querySelector("#btn-restart")
const gamePoints = messageContainer.querySelector("#game-points")
const btnCloseIntructions = messageContainer.querySelector("#btn-close-instructions")
const instructionsMessage = document.querySelector(".instructions-message")

// Global variables
const colors = ['red','green','blue','yellow']
var colorSequence = []
var isGameStarted = false
var isGameOver = false
var points = 0

// Sounds
const sounds = {
    low: new Audio("./audio/low.mp3"),
    mid: new Audio("./audio/mid.mp3"),
    high: new Audio("./audio/high.mp3")
}

// EventListeners
btnStart.addEventListener('click', startGame)


// Start button
function startGame() {

    // Hide container
    messageContainer.classList.remove("visible")

    isGameStarted = true
    isGameOver = false

    // Desabilita o botão de start
    btnStart.disabled = true

    // Sort color array
    let currentColor = getRandomColor()
    colorSequence.push(currentColor)

    rollGame()

    padButtons.forEach((button, index) => {
        button.addEventListener("click", triggerPadButton)
    })
    
}

function triggerPadButton(e) {
    let currentPressedButton = e.target
    let currentColor = currentPressedButton.dataset.color

    // PlaySound if game isnt over
    if(!isGameOver){
                
        if(currentPressedButton.dataset.color == "red" || currentPressedButton.dataset.color == "green"){
            sounds.high.play()
        }
        else if(currentPressedButton.dataset.color == "blue" || currentPressedButton.dataset.color == "yellow") {
            sounds.mid.play()
        }

    }

    checkSequence(currentColor)
    console.log("Pressing " + currentColor)
}

var clickCount = 0
function checkSequence(color){
    
    // Color sequence
    if(color == colorSequence[clickCount]){

        clickCount++
        points += 1

        if(colorSequence.length == clickCount){

            // increase points
            points += 10

            // Add new color to sequence
            colorSequence.push(getRandomColor())

            // Play another round
            rollGame()

            // Reset clicks
            clickCount = 0
        }

    }else{
        gameOver()
    }
}

function gameOver() {
    gamePoints.innerText = points
    points = 0
    clickCount = 0
    isGameOver = true
    colorSequence = []
    btnStart.disabled = false
    console.log("Fim de jogo")

    instructionsMessage.classList.remove("visible")
    messageContainer.classList.add("visible")
    gameOverMessage.classList.add("visible")
    
}

function getRandomColor () {
    // Pick a random index
    let rIndex = Math.floor(Math.random()*colors.length);
    let rColor = colors[rIndex]
    return rColor
}

function blinkButton(button) {
    button.classList.add("blink")
}


function rollGame() {
// Show sequence
let index = 0
let intervalDelay = 1000
var interval = setInterval(function(){
    
    // stop if array is done
    if(index == colorSequence.length) {
        clearInterval(interval)
    }
    // Do something
    else {

        var colorNow = colorSequence[index]
        padButtons.forEach(button => {
            if(button.dataset.color == [colorNow]){
                button.classList.add("blink")

                if(colorNow == "red" || colorNow == "green"){
                    sounds.high.play()
                }
                else if(colorNow == "blue" || colorNow == "yellow") {
                    sounds.mid.play()
                }

                let intervalColor = setTimeout(function(){
                    button.classList.remove("blink")
                    console.log("removing class from " + button.id)
                }, 500)

            }else{
                
            }
        })
        console.log(colorNow)
        index++

    }

    },intervalDelay)

    console.log("---")
}

btnRestart.addEventListener("click", restartGame)

function restartGame() {

    points = 0
    startGame()
}

const padControl = {
    enable() {
        padButtons.forEach((padButton) => {
            padButton.addEventListener
        })
    }
}

btnCloseIntructions.addEventListener("click", closeMessageScreen)

function closeMessageScreen() {
    messageContainer.classList.remove("visible")
}

// configurações iniciais de exibição
window.addEventListener("DOMContentLoaded", init)
function init(e){
    messageContainer.classList.add("visible")
    instructionsMessage.classList.add("visible")
    console.log("iniciou")
}