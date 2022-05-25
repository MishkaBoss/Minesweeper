'use strict'
const EMPTY = ''
const MINE = '💣'
const FLAG = '❗️'

var gBoard
var gLevel
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    gBoard = buildBoard()
    console.log(gBoard);
    console.log(setMinesNegsCount(gBoard, 1, 2))
    renderBoard(gBoard)

}



function buildBoard() { //create baord 4x4
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([])
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    // board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true //place 2 mines randomly

    board[1][1].isMine = board[2][2].isMine = true //place 2 mines manually
    board[1][1].isShown = board[2][2].isShown = true
    return board;
}

// console.log(renderBoard(gBoard));
function countNeighbors() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
            console.log(gBoard[i][j].minesAroundCount);
        }
    }
}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var cell = (board[i][j].isMine) ? MINE : board[i][j].minesAroundCount
            var cellClass = `-${i}-${j}`
            strHTML += `<td onclick="cellClicked(this, ${i}, ${j})" class="cell cell${cellClass}"> ${cell}</td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector(`tbody.board`)
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board, cellI, cellJ) {
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
    console.log(`cell clicked!`);
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}
