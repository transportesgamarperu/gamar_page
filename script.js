// 1. Cambio de estilo del Header al hacer scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 2. Animación interactiva de los números
const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText.replace("+", "");
    const speed = 200; // Velocidad del contador
    const inc = target / speed;

    if (count < target) {
      counter.innerText = `+${Math.ceil(count + inc)}`;
      setTimeout(updateCount, 15);
    } else {
      counter.innerText = `+${target}`;
    }
  };
  updateCount();
});

// 3. Ventana Modal Interactiva (Abrir y Cerrar)
const modal = document.getElementById("quote-modal");
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => modal.classList.add("open"));
});

// 4. Cerrar menu hamburguesa
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");

mobileMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// 5. Cerrar menú al seleccionar una opción
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));

// Cerrar si hace clic fuera del recuadro
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// 6. Inicializar EmailJS
emailjs.init("80SoIT9Dh6phkwTZt");

// 7. Envío del formulario
document.getElementById("quote-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formMessage = document.getElementById("form-message");

  formMessage.innerText = "Enviando...";

  const templateParams = {
    origen: document.getElementById("origen").value,
    destino: document.getElementById("destino").value,
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    tipo_carga: document.getElementById("tipo-carga").value,
  };

  emailjs
    .send("service_3qvjpp4", "template_klgimtn", templateParams)
    .then(() => {
      formMessage.innerText = "✅ Cotización enviada correctamente";

      document.getElementById("quote-form").reset();

      setTimeout(() => {
        modal.classList.remove("open");
        formMessage.innerText = "";
      }, 2000);
    })
    .catch((error) => {
      console.log("ERROR:", error);

      formMessage.innerText = "❌ Error al enviar la cotización";
    });
});

// 8. Smooth scroll para navegación
document
  .querySelectorAll('nav a, .footer-col a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

// 9. Carrusel testimonio

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonio-card");
  const dots = document.querySelectorAll(".dot");

  let current = 0;

  function showCard(index) {
    /* CARDS */

    cards.forEach((card) => {
      card.classList.remove("active");
    });

    cards[index].classList.add("active");

    /* DOTS */

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    dots[index].classList.add("active");
  }

  /* CLICK EN DOTS */

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      current = index;

      showCard(current);
    });
  });

  /* AUTO PLAY */

  setInterval(() => {
    current++;

    if (current >= cards.length) {
      current = 0;
    }

    showCard(current);
  }, 5000);
});

// botones del grupo empresarial
document.querySelectorAll(".grupo-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const url = this.getAttribute("data-url");
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });
});
