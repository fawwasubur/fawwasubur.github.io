const questions = [
  { 
    question: "Siapakah pemimpin Pemberontakan PKI Madiun?", 
    answers: ["Sudirman", "Musso", "D. I. Panjaitan", "Amir Sjarifuddin"], 
    correct: 1 
  },
  { 
    question: "Apa nama operasi militer untuk menumpas DI/TII?", 
    answers: ["Operasi Seroja", "Operasi Trikora", "Operasi Pagar Betis", "Operasi Mandala"], 
    correct: 2 
  },
  { 
    question: "Kapan peristiwa G30S/PKI terjadi?", 
    answers: ["1960", "1965", "1970", "1975"], 
    correct: 1 
  },
  { 
    question: "Pemberontakan APRA terjadi di kota mana?", 
    answers: ["Bandung", "Yogyakarta", "Surabaya", "Jakarta"], 
    correct: 0 
  },
  { 
    question: "Apa tujuan utama pemberontakan PRRI/Permesta?", 
    answers: ["Menggulingkan presiden", "Otonomi daerah", "Penguasaan ekonomi", "Membentuk negara Islam"], 
    correct: 1 
  },
  { 
    question: "Pemberontakan apa yang terjadi pada tahun 1926-1927 dan dipimpin oleh Partai Komunis Indonesia (PKI)?", 
    answers: ["Pemberontakan PRRI", "Pemberontakan DI/TII", "Pemberontakan PKI Madiun", "Pemberontakan Darul Islam"], 
    correct: 2 
  },
  { 
    question: "Siapa pemimpin dari Pemberontakan DI/TII di Jawa Barat pada awal 1950-an?", 
    answers: ["Sukarno", "Kartosuwiryo", "Soeharto", "Agus Salim"], 
    correct: 1 
  },
  { 
    question: "Pemberontakan PRRI/Permesta terjadi pada periode tahun berapa?", 
    answers: ["1950-1957", "1945-1950", "1957-1965", "1965-1971"], 
    correct: 3 
  },
  { 
    question: "Pemberontakan Aceh Merdeka yang ingin melepaskan diri dari Indonesia dimulai pada tahun:", 
    answers: ["1976", "1985", "1999", "2004"], 
    correct: 2 
  },
  { 
    question: "Pemberontakan yang dikenal sebagai Darul Islam/Tentara Islam Indonesia (DI/TII) pertama kali dipimpin oleh siapa?", 
    answers: ["Hasan Tiro", "Kartosuwiryo", "Agus Salim", "Amir Fatah"], 
    correct: 1 
  },
  { 
    question: "Pemberontakan apa yang dipimpin oleh Sultan Hasanuddin di Sulawesi Selatan untuk mempertahankan kedaulatan Kerajaan Makassar?", 
    answers: ["Pemberontakan Aceh", "Pemberontakan Padri", "Pemberontakan Sulawesi Selatan", "Pemberontakan DI/TII"], 
    correct: 2 
  },
  { 
    question: "Pemberontakan yang terjadi di Kalimantan Selatan pada tahun 1950 yang dikenal dengan nama apa?", 
    answers: ["Pemberontakan DI/TII", "Pemberontakan Andi Azis", "Pemberontakan PRRI/Permesta", "Pemberontakan Permesta"], 
    correct: 1 
  },
  { 
    question: "Siapa pemimpin dari Pemberontakan RMS (Republik Maluku Selatan)?", 
    answers: ["Sultan Hamid II", "Johan Papilaya", "Abdul Gani", "Amir Hasan"], 
    correct: 1 
  },
  { 
    question: "Pemberontakan apa yang terjadi di Jawa Tengah pada tahun 1949 yang dikenal dengan nama \"Negara Islam Indonesia\" (NII)?", 
    answers: ["Pemberontakan DI/TII", "Pemberontakan Andi Azis", "Pemberontakan PRRI", "Pemberontakan RMS"], 
    correct: 2 
  },
  { 
    question: "Pemberontakan yang dikenal sebagai Pemberontakan PKI Madiun terjadi pada tahun:", 
    answers: ["1927", "1948", "1965", "1975"], 
    correct: 0 
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 15; // 15 seconds per question
let interval;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.createElement("div");
timerElement.id = "timer";
document.getElementById("quiz-container").appendChild(timerElement);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(interval);
  answersElement.innerHTML = "";
  nextButton.classList.add("hidden");
  scoreElement.classList.add("hidden");
  timer = 15;
  timerElement.textContent = `Waktu: ${timer} detik`;
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".answer-btn");

  if (selectedIndex === currentQuestion.correct) {
    score++;
    buttons[selectedIndex].style.backgroundColor = "green";
  } else {
    buttons[selectedIndex].style.backgroundColor = "red";
    buttons[currentQuestion.correct].style.backgroundColor = "green";
  }

  buttons.forEach(btn => btn.disabled = true);

  clearInterval(interval);
  nextButton.classList.remove("hidden");

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = "Lihat Skor Akhir";
  }
}

function showScore() {
  questionElement.textContent = "Skor Akhir";
  answersElement.innerHTML = `Anda menjawab ${score} dari ${questions.length} pertanyaan dengan benar!`;
  scoreElement.textContent = getFeedback(score);
  scoreElement.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  nextButton.classList.add("hidden");
  timerElement.classList.add("hidden");
}

function getFeedback(score) {
  if (score === questions.length) return "Luar biasa! Anda memahami sejarah dengan sangat baik!";
  if (score >= questions.length / 2) return "Bagus! Anda memahami sebagian besar sejarah.";
  return "Perlu belajar lebih lanjut tentang sejarah!";
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    timerElement.textContent = `Waktu: ${timer} detik`;
    if (timer <= 0) {
      clearInterval(interval);
      selectAnswer(-1); // Treat as no answer selected
    }
  }, 1000);
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);

startQuiz();
