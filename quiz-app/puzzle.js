const container = document.getElementById("puzzle-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const modalOverlay = document.getElementById("modalOverlay");
const finalScoreDisplay = document.getElementById("finalScore");

const puzzleImages = ["img/img1.png", "img/img2.png", "img/img3.png"];
let currentImageIndex = 0;
let pieces = [];
let score = 0;
let startTime;
let timer;
let timeLeft = 30;

function createPuzzlePieces() {
  pieces = [];
  for (let i = 0; i < 16; i++) {
    pieces.push({
      id: i,
      x: (i % 4) * 100,
      y: Math.floor(i / 4) * 100,
      correct: false
    });
  }
  shuffleArray(pieces);
  drawPuzzle();
}

function drawPuzzle() {
  container.innerHTML = "";
  pieces.forEach(piece => {
    const div = document.createElement("div");
    div.className = "puzzle-piece";
    div.style.backgroundImage = `url(${puzzleImages[currentImageIndex]})`;
    div.style.backgroundPosition = `-${piece.x}px -${piece.y}px`;
    div.dataset.index = piece.id;
    div.draggable = true;
    div.addEventListener("dragstart", handleDragStart);
    div.addEventListener("dragover", handleDragOver);
    div.addEventListener("drop", handleDrop);
    container.appendChild(div);
  });
}

let draggedElement = null;

function handleDragStart(event) {
  draggedElement = event.target;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  const targetElement = event.target;
  const draggedIndex = parseInt(draggedElement.dataset.index, 10);
  const targetIndex = parseInt(targetElement.dataset.index, 10);

  [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];
  drawPuzzle();
  checkWin();
}

function checkWin() {
  const allCorrect = pieces.every(piece => piece.correct);
  if (allCorrect) {
    clearInterval(timer);
    const endTime = new Date().getTime();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const pointsEarned = Math.max(100 - timeTaken, 10);

    score += pointsEarned;
    scoreDisplay.textContent = score;

    if (currentImageIndex < puzzleImages.length - 1) {
      currentImageIndex++;
      startGame();
    } else {
      finalScoreDisplay.textContent = score;
      modalOverlay.style.display = "block";
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  createPuzzlePieces();
  startTime = new Date().getTime();
  timeLeft = 30;
  updateTimer();
  clearInterval(timer);
  timer = setInterval(countDown, 1000);
}

function countDown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimer();
  } else {
    clearInterval(timer);
    if (currentImageIndex < puzzleImages.length - 1) {
      alert("Waktu habis! Lanjut ke puzzle berikutnya.");
      currentImageIndex++;
      startGame();
    } else {
      finalScoreDisplay.textContent = score;
      modalOverlay.style.display = "block";
    }
  }
}

function updateTimer() {
  timerDisplay.textContent = `Waktu: ${timeLeft} detik`;
}

function restartGame() {
  modalOverlay.style.display = "none";
  currentImageIndex = 0;
  score = 0;
  scoreDisplay.textContent = "0";
  startGame();
}

startGame();
