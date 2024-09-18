// GUI elements
const startButton= document.querySelector("#start")
const lapButton= document.querySelector("#lap")
const resetButton= document.querySelector("#reset")

const displayCount= document.querySelector("#display")
const lapsDisplay = document.querySelector("#laps")
const modal = document.querySelector('dialog')
const yesModalButton = document.querySelector('dialog button#yes')
const cancelModalButton = document.querySelector('dialog button#cancel')

console.log(yesModalButton)
console.log(cancelModalButton)


// global vars
let count = 0

let timerNotRunning = true

let interval ;

let lapsTracker = 0;

// initial state of GUI elements
lapButton.disabled = true;
resetButton.disabled = true;


// Counter
const counter = () => {
    interval = setInterval(() => {
        count = count + 1
        displayCount.textContent = `${formatTime(count)}`
    }, 1000)
}

//  start or pause
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

// reset
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

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time%3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// record laps
function laps(){
    if (!timerNotRunning) {
        lapsDisplay.classList.remove("hideLaps");
        const para = document.createElement("p");
        lapsTracker = lapsTracker + 1
        para.textContent = `#${lapsTracker}.  ${formatTime(count)}`;
        lapsDisplay.appendChild(para);
    }
}

function confirmReset(e){
    console.log(e.target.value)
    if(e.target.value == 'yes'){
        resetStopWatch()
    }
    modal.close()
}


startButton.addEventListener("click",stopWatch)

lapButton.addEventListener("click",laps)
resetButton.addEventListener("click",()=>modal.showModal())

yesModalButton.addEventListener("click", confirmReset)


cancelModalButton.addEventListener("click", confirmReset)
