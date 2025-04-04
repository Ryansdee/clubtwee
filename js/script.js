
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000
    });
  
    function getNextWeekDate(startDate) {
        let today = new Date();
        let firstDate = new Date(startDate);

        // Vérifier si la date de départ est dans le futur
        if (today < firstDate) {
            return firstDate; // Si on est avant le 11 avril 2025, on garde cette date
        }

        // Calculer le nombre de semaines écoulées depuis firstDate
        let weeksPassed = Math.floor((today - firstDate) / (7 * 24 * 60 * 60 * 1000));

        // Ajouter le nombre de semaines à la date de départ
        let nextDate = new Date(firstDate);
        nextDate.setDate(nextDate.getDate() + (weeksPassed + 1) * 7);

        return nextDate;
    }

    function formatDate(date) {
        const options = { day: "2-digit", month: "long", year: "numeric" };
        return date.toLocaleDateString("nl-NL", options).toUpperCase();
    }

    const startDate = "2025-04-11";
    const nextDate = getNextWeekDate(startDate);

    document.getElementById("date").textContent = formatDate(nextDate);
});

const path = document.querySelector("#wave path");
let step = 0;

function animateWave() {
  step += 0.015;
  const amplitude = 20;
  const frequency = 0.01;

  const newD = [];
  for (let x = 0; x <= 1440; x += 60) {
    const y = 60 + Math.sin(x * frequency + step) * amplitude;
    newD.push(`${x},${y}`);
  }

  path.setAttribute("d", `M${newD.join("L")}L1440,160L0,160Z`);
  requestAnimationFrame(animateWave);
}

animateWave();

const waveImage = document.getElementById('waveimg');
let xPosition = 0;

function animateWaveImage() {
  xPosition += 1;
  waveImage.style.transform = `translateX(${xPosition}px)`;
  
  if (xPosition > 100) { // reset à 0 après 100px
    xPosition = 0;
  }

  requestAnimationFrame(animateWaveImage);
}

animateWaveImage();