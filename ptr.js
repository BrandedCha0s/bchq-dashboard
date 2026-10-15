/* BCHQ pull-to-refresh: touch devices only. Pull down at the top of the page; B.C.H.Q lights up, release to reload. */
(function () {
  if (!('ontouchstart' in window)) return;
  var THRESH = 40, MAX = 70, startY = 0, dy = 0, active = false, busy = false, cycle = null;
  var LETTERS = [['B', '#3bb54a'], ['C', '#3bb54a'], ['H', '#7f52c8'], ['Q', '#7f52c8']];

  var bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = 'position:fixed;top:0;left:50%;z-index:9999;margin-left:-70px;width:140px;height:40px;' +
    'border-radius:20px;background:rgba(10,14,20,.95);border:1px solid #2a3140;display:flex;align-items:center;' +
    'justify-content:center;gap:2px;opacity:0;pointer-events:none;transform:translateY(-60px);' +
    'font-family:Orbitron,sans-serif;font-weight:700;font-size:18px;letter-spacing:1px;' +
    'box-shadow:0 2px 12px rgba(0,0,0,.6)';
  var spans = LETTERS.map(function (l, i) {
    var s = document.createElement('span');
    s.textContent = l[0] + (i < 3 ? '.' : '');
    s.style.cssText = 'color:' + l[1] + ';opacity:.25;transition:opacity .12s,transform .12s,text-shadow .12s;display:inline-block';
    bar.appendChild(s);
    return s;
  });
  function lit(i, on) {
    spans[i].style.opacity = on ? 1 : 0.25;
    spans[i].style.transform = on ? 'translateY(-3px) scale(1.2)' : 'none';
    spans[i].style.textShadow = on ? '0 0 8px ' + LETTERS[i][1] : 'none';
  }
  function add() { document.body.appendChild(bar); }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);

  function atTop() { return (window.scrollY || document.documentElement.scrollTop || 0) <= 0; }
  function inScroller(el) {
    while (el && el !== document.body) {
      var s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight && el.scrollTop > 0) return true;
      el = el.parentElement;
    }
    return false;
  }
  function reset() {
    bar.style.transition = 'opacity .15s, transform .2s';
    bar.style.opacity = 0;
    bar.style.transform = 'translateY(-60px)';
    for (var i = 0; i < 4; i++) lit(i, false);
  }

  document.addEventListener('touchstart', function (e) {
    if (busy || e.touches.length !== 1 || !atTop() || inScroller(e.target)) { active = false; return; }
    startY = e.touches[0].clientY; dy = 0; active = true;
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!active || busy) return;
    dy = e.touches[0].clientY - startY;
    if (dy <= 0 || !atTop()) { reset(); return; }
    var d = Math.min(MAX, dy * 0.5);
    bar.style.transition = 'none';
    bar.style.opacity = Math.min(1, d / 25);
    bar.style.transform = 'translateY(' + (d - 30) + 'px)';
    var n = Math.floor((d / THRESH) * 4); /* letters light up as you pull */
    for (var i = 0; i < 4; i++) lit(i, i < n);
  }, { passive: true });

  document.addEventListener('touchend', function () {
    if (!active || busy) return;
    active = false;
    if (dy * 0.5 >= THRESH) {
      busy = true;
      bar.style.transition = 'transform .2s';
      bar.style.opacity = 1;
      bar.style.transform = 'translateY(14px)';
      var k = 0;
      function step() { for (var i = 0; i < 4; i++) lit(i, i === k % 4); k++; }
      step(); cycle = setInterval(step, 160);
      setTimeout(function () { location.reload(); }, 900);
    } else {
      reset();
    }
  }, { passive: true });

  var st = document.createElement('style');
  st.textContent = 'html,body{overscroll-behavior-y:contain}';
  document.head.appendChild(st);
})();
