
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 700
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