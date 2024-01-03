const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// let's create a function to initialize a game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // UI per empty bhi karna padega boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // one more thing is missing, green color ko bhi remove karna hai
    box.classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  // UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function chekGameOver() {
  let ans = "";
  winningPosition.forEach((position) => {
    // all 3 boxes should be non-empty and exactly same in value
    if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {
        if (gameGrid[position[0]] === "X")
            ans = "X";
        else 
            ans = "O";

            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

        // now we know X/O is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
  });

  if( ans !== "") {
    // it means we have a winner
    gameInfo.innerText = `Winner Player - ${ans}`;
    newGameBtn.classList.add("active");
    return;
  }

    // when there is no winner
    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "") {
            fillcount++;
        }
    });
    if(fillcount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap karo turn ko
    swapTurn();
    // check karo koi jeet to nahi gya
    chekGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click",initGame);