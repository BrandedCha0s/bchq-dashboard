/* BCHQ "Get the app" prompt: one-tap install on Android, step-by-step help on iPhone. Shows only on phones, never inside the installed app. */
(function () {
  var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  var touch = 'ontouchstart' in window;
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var deferred = null, KEY = 'bchq-install-dismissed';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }

  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { set(); removeBanner(); closeModal(); });

  function el(tag, css, text) { var n = document.createElement(tag); if (css) n.style.cssText = css; if (text) n.textContent = text; return n; }
  var banner = null, modal = null;
  function removeBanner() { if (banner) { banner.remove(); banner = null; } }
  function closeModal() { if (modal) { modal.remove(); modal = null; } }

  function steps() {
    var list = isIOS
      ? ['Open bchqhub.com in Safari (not inside Discord or another app).',
         'Tap the Share button (the square with an arrow) at the bottom of the screen.',
         'Scroll down and tap "Add to Home Screen".',
         'Tap "Add". The BCHQ icon now sits on your home screen.']
      : ['Open bchqhub.com in Chrome.',
         'Tap the three-dot menu at the top right.',
         'Tap "Install app" (or "Add to Home screen").',
         'Tap "Install". The BCHQ icon now sits on your home screen.'];
    return list;
  }

  function openModal() {
    if (deferred && !isIOS) { deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; }); return; }
    closeModal();
    modal = el('div', 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:16px');
    var card = el('div', 'max-width:420px;width:100%;background:#0f1520;border:1px solid #2a3140;border-radius:14px;padding:22px;color:#e6ebf5;font-family:Rajdhani,sans-serif');
    var h = el('div', 'font-family:Orbitron,sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:6px');
    var a = el('span', 'color:#3bb54a', 'BC'), b = el('span', 'color:#7f52c8', 'HQ');
    h.appendChild(a); h.appendChild(b); h.appendChild(document.createTextNode(' ON YOUR HOME SCREEN'));
    card.appendChild(h);
    card.appendChild(el('div', 'color:#8a94a8;margin-bottom:12px;font-size:.95rem', 'Open the hub like an app: full screen, one tap from your home screen, always up to date.'));
    var ol = el('ol', 'margin:0 0 16px 20px;line-height:1.6;font-size:1rem');
    steps().forEach(function (s) { ol.appendChild(el('li', '', s)); });
    card.appendChild(ol);
    var close = el('button', 'width:100%;padding:12px;border-radius:10px;border:1px solid #00f0ff;background:transparent;color:#00f0ff;font-family:Orbitron,sans-serif;font-size:.85rem;letter-spacing:1px;cursor:pointer', 'GOT IT');
    close.addEventListener('click', closeModal);
    card.appendChild(close);
    modal.appendChild(card);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
  }
  window.bchqInstall = openModal; /* footer link can call this at any time */

  function showBanner() {
    if (standalone || !touch || get() || banner) return;
    banner = el('div', 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9998;display:flex;align-items:center;gap:10px;padding:10px 12px;background:#0f1520;border:1px solid #2a3140;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.6);font-family:Rajdhani,sans-serif;color:#e6ebf5');
    var t = el('div', 'flex:1;font-size:.95rem;line-height:1.2');
    var s1 = el('strong', '', 'Get the BCHQ app'); t.appendChild(s1);
    t.appendChild(el('div', 'color:#8a94a8;font-size:.8rem', 'Add it to your home screen'));
    var go = el('button', 'padding:8px 14px;border-radius:8px;border:0;background:#3bb54a;color:#06210b;font-weight:700;font-family:Orbitron,sans-serif;font-size:.75rem;cursor:pointer', 'HOW');
    go.addEventListener('click', openModal);
    var x = el('button', 'background:none;border:0;color:#8a94a8;font-size:1.3rem;cursor:pointer;padding:0 4px', '×');
    x.setAttribute('aria-label', 'Dismiss');
    x.addEventListener('click', function () { set(); removeBanner(); });
    banner.appendChild(t); banner.appendChild(go); banner.appendChild(x);
    document.body.appendChild(banner);
  }
  window.addEventListener('load', function () { setTimeout(showBanner, 4000); });
})();
