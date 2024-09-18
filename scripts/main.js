// GUI elements
const header = document.querySelector('header');
const mainDiv = document.querySelector('#main-footer-div');
const root = document.querySelector('html');
const startButton= document.querySelector("#start")
const lapButton= document.querySelector("#lap")
const resetButton= document.querySelector("#reset")

const displayCount= document.querySelector("#display")
const lapsDisplay = document.querySelector("#laps")

// global vars
let count = 0

let timerNotRunning = true

let interval ;

let lapsRecords ={}

let lapsTracker = 0;

// calculate dimensions & offsets
const headerHeight = header.offsetHeight;
console.log(`headerHeight: ${headerHeight}`)
const rootFontSize = parseFloat(window.getComputedStyle(root).fontSize);
console.log(`rootFontSize: ${rootFontSize}`)
const viewPortHeight = window.innerHeight
console.log(`viewPortHeight: ${viewPortHeight}`)
// const mainDivHeight = viewPortHeight - (headerHeight + (2*rootFontSize))
const mainDivHeight = viewPortHeight - headerHeight

mainDiv.style.minHeight = `${mainDivHeight}px`

console.log(`mainDivHeight: ${mainDivHeight}`)


function stopWatch(){
    if(timerNotRunning){
        counter()
        startButton.textContent = "Pause"
        timerNotRunning = false
    } else{
        clearInterval(interval)
        timerNotRunning = true
        startButton.textContent = "Resume"
    }
}

function resetStopWatch(){
    clearInterval(interval)
    timerNotRunning = true
    startButton.textContent = "Start"
    displayCount.textContent = formatTime(0)
    count = 0
    lapsDisplay.classList.add("hideLaps")
    lapsDisplay.innerHTML = ""
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
        para.textContent = `${lapsTracker}.  ${formatTime(count)}`;
        lapsDisplay.appendChild(para);
    }
}


startButton.addEventListener("click",stopWatch)

resetButton.addEventListener("click",resetStopWatch)

lapButton.addEventListener("click",laps)