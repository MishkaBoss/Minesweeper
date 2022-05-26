var gWatchInterval
var gStartTime

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function startStopWatch() {
    gWatchInterval = setInterval(updateStopWatch, 1)
    gStartTime = Date.now()
}
function updateStopWatch() {
    var now = Date.now()
    var time = ((now - gStartTime) / 1000).toFixed(0)
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `Time Passed: ${time}`
}
function endStopWatch() {
    clearInterval(gWatchInterval)
    gWatchInterval = null
}