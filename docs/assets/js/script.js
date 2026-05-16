function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active-nav'));
  document.getElementById('page-' + pageId).classList.add('active');

  var navBtn = document.getElementById('nav-' + pageId);
  if (navBtn) navBtn.classList.add('active-nav');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

goTo('home');

function openLightbox(src) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  box.classList.add("open");
}

function closeLightbox() {
  const box = document.getElementById("lightbox");
  box.classList.remove("open");
}

/* ✅ ADD THIS AT THE VERY BOTTOM */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});