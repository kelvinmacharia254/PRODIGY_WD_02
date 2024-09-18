// GUI elements
const startButton= document.querySelector("#start")
const lapButton= document.querySelector("#lap")
const resetButton= document.querySelector("#reset")

const displayCount= document.querySelector("#display")
const lapsDisplay = document.querySelector("#laps")

// global vars
let count = 0

let timerNotRunning = true

let interval ;

let lapsTracker = 0;

// initial state of GUI elements
lapButton.disabled = true;
resetButton.disabled = true;

function stopWatch(){
    if(timerNotRunning){
        counter()
        startButton.textContent = "Pause"
        timerNotRunning = false
        lapButton.disabled = false
        resetButton.disabled = false
    } else{
        clearInterval(interval)
        timerNotRunning = true
        startButton.textContent = "Resume"
        lapButton.disabled = true
    }
}

function resetStopWatch(){
    clearInterval(interval)
    timerNotRunning = true
    startButton.textContent = "Start"
    displayCount.textContent = formatTime(0)
    count = 0
    lapsTracker = 0;
    lapsDisplay.classList.add("hideLaps")
    lapsDisplay.innerHTML = ""
    lapButton.disabled = true
    resetButton.disabled = true;
}

const counter = () => {
    interval = setInterval(() => {
        count = count + 1
        displayCount.textContent = `${formatTime(count)}`
    }, 1000)
}

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time%3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


function laps(){
    if (!timerNotRunning) {
        lapsDisplay.classList.remove("hideLaps");
        const para = document.createElement("p");
        lapsTracker = lapsTracker + 1
        para.textContent = `#${lapsTracker}.  ${formatTime(count)}`;
        lapsDisplay.appendChild(para);
    }
}


startButton.addEventListener("click",stopWatch)

resetButton.addEventListener("click",resetStopWatch)

lapButton.addEventListener("click",laps)