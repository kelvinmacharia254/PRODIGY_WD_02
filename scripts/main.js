// GUI elements
const startButton= document.querySelector("#start")
const lapButton= document.querySelector("#lap")
const reset= document.querySelector("#reset")

const displayCount= document.querySelector("#display")

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time%3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

let count = 0

let timerNotRunning = true

let interval ;

const counter = () => {
    interval = setInterval(() => {
        count = count + 1
        displayCount.textContent = `${formatTime(count)}`
    }, 1000)
}

startButton.addEventListener("click",()=> {
    if(timerNotRunning){
        counter()
        startButton.textContent = "Stop"
        timerNotRunning = false
    } else{
        clearInterval(interval)
        timerNotRunning = true
        startButton.textContent = "Start"
    }
})

reset.addEventListener("click",()=>{
    clearInterval(interval)
    timerNotRunning = true
    startButton.textContent = "Start"
    displayCount.textContent = formatTime(0)
})