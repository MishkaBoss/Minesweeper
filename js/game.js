'use strict'
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
    renderBoard(gBoard)
}


// console.log(gBoard);
function buildBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([])
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: true,
                isMine: false,
                isMarked: true
            }
        }
    }
    // board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = board[getRandomInt(0, 4)][getRandomInt(0, 4)].isMine = true //place 2 mines randomly
    board[1][1].isMine = board[2][2].isMine = true //place 2 mines manually

    return board;
}

// console.log(renderBoard(gBoard));
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) {
                var cell = MINE
            } else {
                cell = ''
            }
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${i}, ${j})" class="cell cell-${i}-${j}"> <button class="cell-btn">${cell}</button> </td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector(`tbody.board`)
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board) {

}



function cellClicked(elCell, i, j) {
    console.log(`cell clicked!`);
}

// function cellMarked(elCell){

// }

// function checkGameOver() {

// }

// function expandShown(board, elCell, i, j){

// }