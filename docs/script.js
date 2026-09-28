/* 61 Victoria ePortfolio — page routing, mobile menu, lightbox, read-more */
(function () {
  var PAGES = ['home', 'project', 'dinners', 'reflections', 'partners'];

  // ── Page routing (hash based, so every page has a shareable link) ──
  function show(hash) {
    var id = (hash || '').replace('#', '');
    var target = null;
    var page = PAGES.indexOf(id) > -1 ? id : null;

    // A hash can also point at an element inside a page (e.g. #dinner-3)
    if (!page && id) {
      target = document.getElementById(id);
      var parent = target && target.closest('.page');
      if (parent) page = parent.id.replace('page-', '');
    }
    page = page || 'home';

    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + page);
    });
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var titles = { home: '', project: 'The Project · ', dinners: 'Dinner Guests · ', reflections: 'Reflections · ', partners: 'Partners · ' };
    document.title = titles[page] + '61 Victoria — Pathways Beyond Matric';

    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    closeMenu();
  }

  window.addEventListener('hashchange', function () { show(location.hash); });

  // ── Mobile menu ──
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // ── Lightbox (groups photos by their gallery) ──
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.cap');
  var group = [], index = 0, lastFocus = null;

  function render() {
    var img = group[index];
    boxImg.src = img.getAttribute('data-full') || img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = img.alt + (group.length > 1 ? '  ·  ' + (index + 1) + ' / ' + group.length : '');
    box.querySelector('.lb-prev').style.display = group.length > 1 ? '' : 'none';
    box.querySelector('.lb-next').style.display = group.length > 1 ? '' : 'none';
  }
  function open(img) {
    var scope = img.closest('[data-gallery]');
    group = scope ? Array.prototype.slice.call(scope.querySelectorAll('img')) : [img];
    index = group.indexOf(img);
    lastFocus = document.activeElement;
    render();
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { index = (index + d + group.length) % group.length; render(); }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.zoom');
    if (btn) { open(btn.querySelector('img')); return; }
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  box.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  // ── "Read full reflection" toggles ──
  document.querySelectorAll('.reflection').forEach(function (card) {
    var text = card.querySelector('.clamp');
    var btn = card.querySelector('.read-more');
    if (!text || !btn) return;
    // Short reflections fit without clamping, so they don't need the button
    if (text.textContent.trim().length < 480) {
      btn.hidden = true;
      text.classList.remove('clamp');
    }
    btn.addEventListener('click', function () {
      var open = card.classList.toggle('open');
      btn.textContent = open ? 'Show less' : 'Read full reflection';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  show(location.hash);
})();
