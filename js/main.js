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



// FILTRAGE DES FREELANCES

const filterButtons = document.querySelectorAll(".filter-btn");
const freelanceItems = document.querySelectorAll(".freelance-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        freelanceItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const prenom = document.getElementById("prenom").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const nomError = document.getElementById("nomError");
        const prenomError = document.getElementById("prenomError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");
        const successMessage = document.getElementById("successMessage");

        // Réinitialisation
        nomError.textContent = "";
        prenomError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        let isValid = true;

        // Nom
        if (nom === "") {
            nomError.textContent = "Le nom est obligatoire.";
            isValid = false;
        }

        // Prénom
        if (prenom === "") {
            prenomError.textContent = "Le prénom est obligatoire.";
            isValid = false;
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "L'email est obligatoire.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Format d'email invalide.";
            isValid = false;
        }

        // Message
        if (message === "") {
            messageError.textContent = "Le message est obligatoire.";
            isValid = false;
        } else if (message.length < 20) {
            messageError.textContent =
                "Le message doit contenir au moins 20 caractères.";
            isValid = false;
        }

        // Succès
        if (isValid) {
            successMessage.textContent =
                "Votre message a été envoyé avec succès !";

            form.reset();
        }

    });

}