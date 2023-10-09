
const Players = (name, sign) => {
    return {
        name, 
        sign
    }
}

function setResult (winner) {
    let winningmessage = document.getElementById("winning-message");

    const messagecontent = (message) => {
        winningmessage.textContent = message;
    }
    if (winner === "Player 1") {
        messagecontent("Player 1 wins!")
    } else if (winner === "Player 2") {
        messagecontent("Player 2 wins!")
    } else {
        messagecontent("It's a draw!")
    }

};

const gameController = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
   

    let score1 = document.getElementById("player1-score");
    let score2 = document.getElementById("player2-score"); 
    let draw = document.getElementById("draw-score");

    const start = () => {
        const Player1 = Players("Player 1", "X");
        const Player2 = Players("Player 2", "O");
        players = [Player1, Player2];
        currentPlayerIndex = 0
    }

    const reset = () => {
        for (let i=0; i<9; i++) {
            Gameboard.update(i, "");
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.textContent = "";
            })
            currentPlayerIndex = 0;
          
        }
    }

    

    let player1Score = 0
    let player2Score = 0
    let drawScore = 0

    const handleClick = (event) => {
        let index = event.target.dataset.index;
        const board = Gameboard.getBoard();
        if (board[index] == "") {
            event.target.textContent = players[currentPlayerIndex].sign;
            Gameboard.update(index, players[currentPlayerIndex].sign);
            if (checkforWin(board, players[currentPlayerIndex].sign)) {
                if (players[currentPlayerIndex].sign === "X") {
                    player1Score ++;
                    score1.textContent = player1Score.toString();
                    setResult("Player 1")
                    reset();
                } else if (players[currentPlayerIndex].sign === "O") {
                    player2Score ++
                    score2.textContent = player2Score.toString();
                    setResult("Player 2");
                    reset();
                }
            } else if (board.every(cell => cell !== "")) {
                drawScore ++;
                draw.textContent = drawScore.toString();
                setResult("Draw");
                reset();
            } else {
                currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            }
        }
    }
    

    const restartbtn = document.querySelector("#restart");
    restartbtn.addEventListener("click", () => {
  
    for (let i=0; i<9; i++) {
        Gameboard.update(i, "");
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.textContent = "";
        })
        currentPlayerIndex = 0;
      
    }

    player1Score = 0;
    player2Score = 0;
    drawScore = 0;
    score1.textContent = player1Score.toString();
    score2.textContent = player2Score.toString();
    draw.textContent = drawScore.toString();
})

   

    return {
        handleClick,
        start,
        reset
    }
    
})()

function checkforWin (board) {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5 ,8],
        [2, 4, 6]
    ]
    for (let i=0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }

    return null
}




const Gameboard = (() => {
    let board = ["", "", "", "" , "", "", "", "" , ""];
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener("click" , gameController.handleClick);
    })

 

    const update = (index, value) => {
        board[index] = value;
    }

    const getBoard = () => board
    
    gameController.start()
    
    return {
        getBoard,
        update
    }
})();
