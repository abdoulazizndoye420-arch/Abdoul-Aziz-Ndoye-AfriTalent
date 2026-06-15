// =====================
// DARK MODE (FIX)
// =====================

const themeToggle = document.getElementById("themeToggle");

// Charger préférence
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

// Toggle
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }

});



// ======================
// COMPTEURS ANIMÉS
// ======================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const counter = entry.target;
      const target = +counter.dataset.target;

      let count = 0;
      const increment = target / 100;

      const updateCounter = () => {

        if(count < target){

          count += increment;
          counter.textContent = Math.ceil(count);

          requestAnimationFrame(updateCounter);

        } else {

          counter.textContent = target.toLocaleString();

        }

      };

      updateCounter();

      observer.unobserve(counter);

    }

  });

}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});


// ======================
// FADE-IN DES SECTIONS
// ======================

const sections = document.querySelectorAll(".fade-section");

const sectionObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("visible");

    }

  });

}, {
  threshold: 0.15
});

sections.forEach(section => {
  sectionObserver.observe(section);
});