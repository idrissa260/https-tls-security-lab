// =======================
// Reveal on scroll
// =======================

const elements = document.querySelectorAll(".reveal");

if (elements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach(element => observer.observe(element));
}

// =======================
// Image Modal / Lightbox
// =======================

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");
const zoomableImages = document.querySelectorAll(".zoomable");

let isZoomed = false;

function openModal(img) {
  if (!modal || !modalImg) return;

  modal.style.display = "block";
  modalImg.src = img.src;
  modalImg.alt = img.alt || "Image agrandie";

  isZoomed = false;
  modalImg.style.transform = "scale(1)";
}

function closeModal() {
  if (!modal || !modalImg) return;

  modal.style.display = "none";
  modalImg.src = "";
  modalImg.style.transform = "scale(1)";
  isZoomed = false;
}

function toggleZoom() {
  if (!modalImg) return;

  isZoomed = !isZoomed;
  modalImg.style.transform = isZoomed ? "scale(2)" : "scale(1)";
  modalImg.style.cursor = isZoomed ? "zoom-out" : "zoom-in";
}

zoomableImages.forEach(img => {
  img.addEventListener("click", () => openModal(img));
});

if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

if (modalImg) {
  modalImg.addEventListener("dblclick", toggleZoom);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});