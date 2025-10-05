const flame = document.querySelector('.flame');
const messageEl = document.getElementById('message');
const cake = document.querySelector('.cake');
const starsContainer = document.querySelector('.stars');
const balloonContainer = document.querySelector('.balloon-container');

const text = "Happy birthday Shendy Nada Salwa 💖\n" +
"Semoga kamu selalu bahagia ya ke depannya.\n" +
"Jangan overthinking muluu, jangan gampang sedihh,\n" +
"aku ga suka kamu sedih gitu, aku juga ikutan sedihh tau 🥺.\n\n" +
"Aku akan jadi orang yang selalu bangga sama kamu,\n" +
"dan aku akan selalu jadi garda terdepan buat kamu 💪.\n\n" +
"Semoga di usia ini kamu jadi pribadi yang lebih baik,\n" +
"dan tentu saja selalu bahagiaaa!!!! ✨\n\n" +
"Semoga hari istimewamu sama luar biasanya kayak dirimu 🌸\n" +
"Aku senang banget bisa ketemu seseorang seperti kamu,\n" +
"dan terima kasih udah jadi bagian dari hidupku.\n\n" +
"I love youuu!! 💞";


let index = 0;
let balloonInterval;
let candleOn = false; // status lilin

function createStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 10}s`;
    star.style.animationDuration = `${10 + Math.random() * 10}s`;
    starsContainer.appendChild(star);
  }
}

function createBalloons() {
  if (!candleOn) return; // kalau lilin padam, stop munculkan balon
  const colors = ["#ff6b6b", "#ffd93d", "#a2d2ff", "#cdb4db", "#f7c59f"];
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = `${Math.random() * 90 + 5}%`;
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.animationDelay = `${Math.random() * 2}s`;
  balloon.style.opacity = "1";
  balloonContainer.appendChild(balloon);
  // hapus balon setelah animasi selesai
  setTimeout(() => balloon.remove(), 10000);
}

function fadeOutBalloons() {
  const balloons = document.querySelectorAll('.balloon');
  balloons.forEach(balloon => {
    balloon.style.transition = "opacity 1.5s ease";
    balloon.style.opacity = "0";
  });
}

function removeBalloons() {
  balloonContainer.innerHTML = "";
}

function startSequence() {
  flame.style.opacity = "0"; // awal lilin mati

  // 1️⃣ siang → transisi ke malam
  setTimeout(() => {
    flame.style.opacity = "0"; // lilin padam sebelum malam
  }, 1000);

  // 2️⃣ mulai malam
  setTimeout(() => {
    document.body.style.background = "#000";
    createStars();

    // nyalakan lilin
    setTimeout(() => {
      flame.style.opacity = "1";
      candleOn = true;
      startBalloonsLoop(); // mulai balon berulang
    }, 1000);

    // munculkan pesan
    setTimeout(showMessage, 3000);
  }, 2000);
}

function startBalloonsLoop() {
  if (balloonInterval) clearInterval(balloonInterval);
  balloonInterval = setInterval(createBalloons, 2000); // setiap 2 detik
}

function stopBalloonsLoop() {
  clearInterval(balloonInterval);
  fadeOutBalloons();
  setTimeout(removeBalloons, 2000);
}

function showMessage() {
  messageEl.style.opacity = "1";
  typeWriter();
}

function typeWriter() {
  if (index < text.length) {
    messageEl.innerHTML += text[index] === "\n" ? "<br>" : text[index];
    index++;
    setTimeout(typeWriter, 70);
  } else {
    // 2 detik sebelum lilin padam → matikan balon
    setTimeout(stopBalloonsLoop, 4000);

    // padamkan lilin & semua elemen
    setTimeout(endSequence, 7000);
  }
}

function endSequence() {
  candleOn = false;
  stopBalloonsLoop();
  flame.style.opacity = "0";
  cake.style.opacity = "0";
  starsContainer.style.opacity = "0";
  messageEl.style.opacity = "0";
  document.body.style.transition = "background 2s ease";
  document.body.style.background = "#000";
}

window.onload = startSequence;
