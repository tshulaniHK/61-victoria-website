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
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}