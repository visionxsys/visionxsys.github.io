/* =============================================
   VISIONXSYSTEMS — MAIN SHARED JAVASCRIPT
   Particles, Navbar, Scroll Reveal, Cursor, etc.
   ============================================= */

'use strict';

/* ===== PARTICLES ===== */
(function initParticles() {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function newParticle() {
    return {
      x: rnd(0, W), y: rnd(0, H),
      r: rnd(0.5, 2),
      dx: rnd(-0.3, 0.3), dy: rnd(-0.5, -0.1),
      alpha: rnd(0.2, 0.8),
      life: 0, max: rnd(200, 600)
    };
  }

  for (var i = 0; i < 80; i++) particles.push(newParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function(p, i) {
      p.x += p.dx; p.y += p.dy; p.life++;
      var a = p.alpha * (1 - p.life / p.max);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,220,130,' + a + ')';
      ctx.fill();
      if (p.life >= p.max || p.y < 0) {
        particles[i] = newParticle();
        particles[i].y = H + 10;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== SCROLL PROGRESS BAR ===== */
(function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
})();

/* ===== NAVBAR ===== */
(function initNavbar() {
  var nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  var hb = document.getElementById('hamburger');
  var mm = document.getElementById('mobile-menu');
  if (hb && mm) {
    hb.addEventListener('click', function() {
      hb.classList.toggle('active');
      mm.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(function(el) {
      el.addEventListener('click', function() {
        hb.classList.remove('active');
        mm.classList.remove('open');
      });
    });
  }

  // Active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    var href = link.getAttribute('href') || '';
    if (
      ((currentPage === 'index.html' || currentPage === '') && href === 'index.html') ||
      href === currentPage
    ) {
      link.classList.add('active');
    }
  });
})();

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal, .slide-left, .slide-right, .scale-reveal');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'vis');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function(el, i) {
    var delay = (i % 4) * 0.1;
    el.style.transitionDelay = delay + 's';
    observer.observe(el);
  });
})();

/* ===== MOUSE PARALLAX (hero glows) ===== */
(function initParallax() {
  var g1 = document.querySelector('.hero-glow-1');
  var g2 = document.querySelector('.hero-glow-2');
  if (!g1 && !g2) return;

  document.addEventListener('mousemove', function(e) {
    var mx = (e.clientX / window.innerWidth  - 0.5) * 30;
    var my = (e.clientY / window.innerHeight - 0.5) * 30;
    if (g1) g1.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    if (g2) g2.style.transform = 'translate(' + (-mx * 0.5) + 'px,' + (-my * 0.5) + 'px)';
  });
})();

/* ===== CARD TILT (3D on mousemove) ===== */
(function initCardTilt() {
  document.querySelectorAll('.service-card, .svcc').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
      var y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
      card.style.transform = 'perspective(600px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
  });
})();

/* ===== TYPING EFFECT (hero headline) ===== */
(function initTyping() {
  var el = document.querySelector('.hero-title .gt, .ht .gt');
  if (!el) return;
  var words = ['Drive Growth', 'Build Value', 'Power Scale', 'Create Impact'];
  var wi = 0, ci = 0, deleting = false;

  function type() {
    var w = words[wi];
    if (!deleting) {
      el.textContent = w.slice(0, ci + 1);
      ci++;
      if (ci === w.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      el.textContent = w.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  setTimeout(type, 2500);
})();

/* ===== COUNTER ANIMATION (stats) ===== */
function animateCounter(el, target, duration) {
  var startTime = null;
  var suffix = el.dataset.suffix || '';
  var prefix = el.dataset.prefix || '';

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = Math.floor(eased * target);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { observer.observe(el); });
})();

/* ===== TOAST NOTIFICATION ===== */
function showToast(message, duration) {
  duration = duration || 4000;
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() { toast.classList.add('show'); }, 50);
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 400);
  }, duration);
}

/* ===== CONTACT FORM ===== */
function handleSubmit(e) {
  e.preventDefault();
  var btn = document.getElementById('submit-btn');
  var suc = document.getElementById('form-success');
  var form = e.target;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  var formData = new FormData(form);
  var formData = new FormData(form);
  fetch('https://formspree.io/f/mykrwzgl', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(function(response) {
    if (response.ok) {
      form.reset();
      btn.innerHTML = '<span>Message Sent ✓</span>';
      btn.disabled = false;
      if (suc) {
        suc.classList.add('visible', 'vis');
        setTimeout(function() { suc.classList.remove('visible', 'vis'); }, 5000);
      }
      showToast('Message sent! We\'ll reply within 24 hours.');
    } else {
      btn.innerHTML = '<span>Error! Try Again</span>';
      btn.disabled = false;
    }
    setTimeout(function() { btn.innerHTML = '<span>Send Message</span><span>&#8594;</span>'; }, 3000);
  }).catch(function(error) {
    btn.innerHTML = '<span>Error! Try Again</span>';
    btn.disabled = false;
    setTimeout(function() { btn.innerHTML = '<span>Send Message</span><span>&#8594;</span>'; }, 3000);
  });
}

/* ===== FAQ ACCORDION ===== */
(function initFAQ() {
  document.querySelectorAll('.faq-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.tab;
      document.querySelectorAll('.faq-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.faq-panel').forEach(function(p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('faq-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  document.addEventListener('click', function(e) {
    var question = e.target.closest('.faq-question');
    if (!question) return;
    var item = question.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    var panel = item.closest('.faq-panel');
    if (panel) panel.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
})();

/* ===== PRICING TABS ===== */
(function initPricingTabs() {
  document.querySelectorAll('.pricing-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.service;
      document.querySelectorAll('.pricing-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.pricing-panel').forEach(function(p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('pricing-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ===== PORTFOLIO FILTER ===== */
(function initPortfolioFilter() {
  var btns  = document.querySelectorAll('.filter-btn, .pfb');
  var items = document.querySelectorAll('.portfolio-item, .pc[data-cat]');
  if (!btns.length) return;

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active', 'act'); });
      btn.classList.add('active', 'act');
      var f = btn.dataset.filter;
      items.forEach(function(item) {
        var cat = item.dataset.cat;
        if (f === 'all' || cat === f) {
          item.style.display = '';
          setTimeout(function() { item.style.opacity = '1'; item.style.transform = ''; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.94)';
          setTimeout(function() { item.style.display = 'none'; }, 350);
        }
      });
    });
  });
})();
