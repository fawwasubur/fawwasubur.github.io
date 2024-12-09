const events = [
    { title: "G30S/PKI", year: 1965 },
    { title: "Pemberontakan PRRI/Permesta", year: 1956 },
    { title: "Pemberontakan DI/TII", year: 1948 },
    { title: "APRA", year: 1950 }
  ];
  
  let shuffledEvents = [];
  let correctOrder = [];
  let currentOrder = [];
  let interval;
  
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  function startGame() {
    shuffledEvents = shuffle(events);
    correctOrder = shuffledEvents.slice().sort((a, b) => a.year - b.year);
    currentOrder = shuffledEvents.slice();
  
    displayEvents();
  }
  
  function displayEvents() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
  
    currentOrder.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.textContent = `${event.title} (${event.year})`;
      timeline.appendChild(card);
    });
  }
  
  function checkOrder() {
    const timeline = document.querySelectorAll(".event-card");
    let isCorrect = true;
  
    for (let i = 0; i < timeline.length; i++) {
      if (currentOrder[i].title !== correctOrder[i].title) {
        isCorrect = false;
        break;
      }
    }
  
    if (isCorrect) {
      alert("Urutan benar!");
    } else {
      alert("Urutan salah, coba lagi.");
    }
  }
  
  document.getElementById("check-btn").addEventListener("click", checkOrder);
  document.getElementById("restart-btn").addEventListener("click", startGame);
  
  startGame();
  