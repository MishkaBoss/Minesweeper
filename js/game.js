'use strict'
const EMPTY = ''
const MINE = '💣'
const FLAG = '❗️'
const LIVES = '❤️'
const HINT = '💡'

var gLifeCount
var gHintcount
var gClicksCount = 0
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gIsLevel2 = 2
var gIsLevel3 = 3


function initGame() {
    gGame.shownCount = 0
    gBoard = buildBoard(gLevel.SIZE)
    // console.log(gBoard);
    renderBoard(gBoard)
    endStopWatch()
    gClicksCount = 0
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `Time Passed: 0`
    gLifeCount = 3
    gHintcount = 3
    var elLives = document.querySelector('.lives')
    elLives.innerText = `lives: ${LIVES.repeat(gLifeCount)}`
    var elResetBtn = document.querySelector('.reset-btn')
    elResetBtn.innerText = '😇'
    gHintcount = 3



}

function buildBoard(SIZE) { //create baord 4x4
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    if (SIZE === 4) {
        for (var i = 0; i < 2; i++) {
            board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
        }
    } else if (SIZE === 8) {
        for (var i = 0; i < 12; i++) {
            board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
        }

    } else if (SIZE === 12) {
        for (var i = 0; i < 30; i++) {
            board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true
        }
        // board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true //place 2 mines randomly
    }
    return board;
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var cell = (board[i][j].isMine) ? MINE : board[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
            var cellId = `-${i}-${j}`
            strHTML += `<td id="cell${cellId}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu = "cellMarked(this, ${i}, ${j})" class="cell"> ${cell}</td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector(`tbody.board`)
    elBoard.innerHTML = strHTML



}

function setMinesNegsCount(board, cellI, cellJ) { //returns a number (counter)
    var counter = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine) counter++
        }
    }
    return counter
}



function cellClicked(elCell, i, j) {

    // console.log(elCell);
    elCell.classList.toggle('revealed')
    var cell = gBoard[i][j]
    // console.log(cell);
    elCell.style.fontSize = 25 + 'px'
    gBoard[i][j].isShown = true
    gGame.shownCount++
    gClicksCount++
    if (gClicksCount === 1) {
        gGame.isOn = true
        startStopWatch()
    }
    if (cell.isMine) {
        mineClicked()
        // gClicksCount = 0

    }
    // console.log(gGame.shownCount);
    checkGameOver()
}

function cellMarked(elCell, i, j) {
    gClicksCount++

    if (gClicksCount === 1) {
        gGame.isOn = true
        startStopWatch()
    }
    // console.log(elCell, i, j);
    elCell.classList.toggle('flag')
    if (elCell.classList.contains('flag')) {
        elCell.innerText = FLAG
        elCell.style.fontSize = 25 + 'px'
        gGame.markedCount++
        // console.log(`1`);
    } else {
        elCell.innerHTML = gBoard[i][j].minesAroundCount
        elCell.style.fontSize = 0 + 'px'
        gGame.markedCount--

        // console.log(`2`);
    }
    // console.log(gGame.markedCount);
    checkGameOver()
}


function checkGameOver() {
    if (gLifeCount <= 0) {
        clearInterval(gWatchInterval)
        alert(`you lost`)
    }
    if (gGame.shownCount + gGame.markedCount === gLevel.SIZE ** 2) {
        clearInterval(gWatchInterval)
        alert(`you win`);
        var elWin = document.querySelector('.reset-btn')
        elWin.innerText = '🏆'
    }

}

function expandShown(board, elCell, i, j) {

}
function mineClicked() {
    checkGameOver()
    gLifeCount--
    var elLives = document.querySelector('.lives')
    elLives.innerText = `lives: ${LIVES.repeat(gLifeCount)}`
    if (gLifeCount === 0) {

        var elResetBtn = document.querySelector('.reset-btn')
        elResetBtn.innerText = '🤯'
        endStopWatch()
    }
    // console.log(`mine clicked`);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === MINE) {
                gBoard[i][j].style.fontSize = 25 + 'px'
            }
        }
    }
}


function levelSetting(levelNum) {
    gLevel.SIZE = 4
    gLevel.MINES = 2
    if (gIsLevel2 === levelNum) {
        gLevel.SIZE = 8
        gLevel.MINES = 12
    } else if (gIsLevel3 === levelNum) {
        gLevel.SIZE *= 3
        gLevel.MINES *= 15
    }
    initGame()
}

