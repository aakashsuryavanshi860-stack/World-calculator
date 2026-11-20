/*!
 * translate.js  -  Google Translate for the whole website
 * ---------------------------------------------------------
 * Sirf is file ko index.html mein add karna hai:
 *     <script src="translate.js"></script>   (</body> se pehle)
 *
 * Kya karta hai:
 *  - Header mein "Language" button + search wala dropdown banata hai
 *  - Google Translate ki SAARI supported languages apne-aap list mein laata hai
 *    (jab Google nayi language jodta hai, woh bhi apne-aap aa jaati hai)
 *  - Language chunte hi poori website translate ho jaati hai
 */
(function () {
  'use strict';

  var PAGE_LANG = 'en';   // aapki website ki asli language (English)

  /* ---------- 1. CSS ---------- */
  var css = [
    '#google_translate_element{position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden}',
    '.goog-te-banner-frame,.skiptranslate>iframe,#goog-gt-tt,.goog-te-balloon-frame{display:none!important}',
    'body{top:0!important}',
    '.goog-text-highlight{background:none!important;box-shadow:none!important}',
    '.lang-wrap{position:relative;display:inline-block}',
    '.lang-wrap.floating{position:fixed;top:10px;right:10px;z-index:400}',
    '.lang-btn{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.45);padding:.4rem .75rem;border-radius:4px;font-weight:bold;cursor:pointer;font-size:.85rem;white-space:nowrap}',
    '.lang-wrap.floating .lang-btn{background:#1e40af}',
    '.lang-btn:hover{background:rgba(255,255,255,.28)}',
    '.lang-panel{display:none;position:fixed;top:58px;right:8px;width:320px;max-width:calc(100vw - 16px);background:#fff;color:#111827;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:500}',
    '.lang-panel.open{display:block}',
    '.lang-search{width:calc(100% - 16px);margin:8px;padding:.6rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:1rem;outline:none;color:#111827;background:#fff}',
    '.lang-search:focus{border-color:#2563eb}',
    '.lang-count{padding:0 12px 6px;font-size:.75rem;color:#6b7280}',
    '.lang-list{list-style:none;margin:0;padding:0;max-height:55vh;overflow-y:auto;border-top:1px solid #e2e8f0}',
    '.lang-list li{padding:.6rem 1rem;cursor:pointer;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;gap:.5rem;font-size:.95rem}',
    '.lang-list li:hover{background:#f1f5f9}',
    '.lang-list li.active{background:#dbeafe;color:#1e40af;font-weight:bold}',
    '.lang-list li small{color:#6b7280}',
    '.lang-msg{padding:1rem;color:#6b7280;text-align:center;cursor:default!important}'
  ].join('\n');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- 2. Cookie helpers ---------- */
  function getCookie(n) {
    var m = document.cookie.match('(^|;)\\s*' + n + '=([^;]+)');
    return m ? decodeURIComponent(m[2]) : '';
  }
  function setCookie(n, v) {
    document.cookie = n + '=' + v + '; path=/';
    var h = location.hostname;
    if (h && h.indexOf('.') > -1) document.cookie = n + '=' + v + '; path=/; domain=' + h;
  }
  function clearCookie(n) {
    var past = '; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/', h = location.hostname;
    document.cookie = n + '=' + past;
    if (h) {
      document.cookie = n + '=' + past + '; domain=' + h;
      document.cookie = n + '=' + past + '; domain=.' + h;
    }
  }
  function currentLang() {
    var c = getCookie('googtrans');
    return c ? c.split('/').pop() : PAGE_LANG;
  }

  /* ---------- 3. Language names ---------- */
  var dnEn = null, dnNative = {};
  try { dnEn = new Intl.DisplayNames(['en'], { type: 'language' }); } catch (e) {}
  function englishName(code, fallback) {
    try { if (dnEn) { var n = dnEn.of(code); if (n && n !== code) return n; } } catch (e) {}
    return fallback || code;
  }
  function nativeName(code) {
    try {
      if (!dnNative[code]) dnNative[code] = new Intl.DisplayNames([code], { type: 'language' });
      var n = dnNative[code].of(code);
      if (n && n !== code) return n;
    } catch (e) {}
    return '';
  }

  /* ---------- 4. UI banao ---------- */
  var langs = [];      // [{code, name, native}]
  var wrap, btn, label, panel, search, count, list;

  function buildUI() {
    var hidden = document.createElement('div');
    hidden.id = 'google_translate_element';
    document.body.appendChild(hidden);

    wrap = document.createElement('div');
    wrap.className = 'lang-wrap notranslate';
    wrap.setAttribute('translate', 'no');
    wrap.innerHTML =
      '<button type="button" class="lang-btn" id="lang-btn">\uD83C\uDF10 <span id="lang-current">English</span></button>' +
      '<div class="lang-panel" id="lang-panel">' +
        '<input type="text" class="lang-search" id="lang-search" placeholder="Search language..." autocomplete="off" />' +
        '<div class="lang-count" id="lang-count"></div>' +
        '<ul class="lang-list" id="lang-list"><li class="lang-msg">Loading languages...</li></ul>' +
      '</div>';

    var actions = document.querySelector('.header-actions');
    if (actions) {
      actions.insertBefore(wrap, actions.firstChild);
    } else {
      wrap.classList.add('floating');
      document.body.appendChild(wrap);
    }

    btn = wrap.querySelector('#lang-btn');
    label = wrap.querySelector('#lang-current');
    panel = wrap.querySelector('#lang-panel');
    search = wrap.querySelector('#lang-search');
    count = wrap.querySelector('#lang-count');
    list = wrap.querySelector('#lang-list');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) { search.value = ''; render(''); search.focus(); }
    });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { panel.classList.remove('open'); });
    search.addEventListener('input', function () { render(search.value); });

    // Logo aur calculator display translate na ho
    var skip = document.querySelectorAll('.logo-text, .calc-display');
    for (var i = 0; i < skip.length; i++) {
      skip[i].classList.add('notranslate');
      skip[i].setAttribute('translate', 'no');
    }
  }

  function render(filter) {
    var q = (filter || '').trim().toLowerCase(), cur = currentLang();
    if (!langs.length) { list.innerHTML = '<li class="lang-msg">Loading languages...</li>'; count.textContent = ''; return; }
    var items = langs.filter(function (l) {
      return !q || l.name.toLowerCase().indexOf(q) > -1 ||
             l.native.toLowerCase().indexOf(q) > -1 || l.code.toLowerCase() === q;
    });
    count.textContent = items.length + ' of ' + langs.length + ' languages';
    list.innerHTML = '';
    if (!items.length) { list.innerHTML = '<li class="lang-msg">No language found</li>'; return; }
    items.forEach(function (l) {
      var li = document.createElement('li');
      if (l.code === cur) li.className = 'active';
      li.innerHTML = '<span></span><small></small>';
      li.firstChild.textContent = l.name;
      li.lastChild.textContent = l.native;
      li.addEventListener('click', function () { changeLanguage(l.code); });
      list.appendChild(li);
    });
  }

  function updateLabel() {
    var cur = currentLang(), l = langs.filter(function (x) { return x.code === cur; })[0];
    label.textContent = l ? l.name : (cur === PAGE_LANG ? 'English' : englishName(cur, cur));
  }

  /* ---------- 5. Language badlo ---------- */
  function changeLanguage(code) {
    panel.classList.remove('open');
    if (code === PAGE_LANG) { clearCookie('googtrans'); location.reload(); return; }
    var combo = document.querySelector('select.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
      setCookie('googtrans', '/' + PAGE_LANG + '/' + code);
      render(search.value);
      updateLabel();
    } else {
      setCookie('googtrans', '/' + PAGE_LANG + '/' + code);
      location.reload();
    }
  }

  /* ---------- 6. Google ki saari languages combo se uthao ---------- */
  function loadLanguagesFromGoogle() {
    var tries = 0;
    var timer = setInterval(function () {
      var combo = document.querySelector('select.goog-te-combo');
      tries++;
      if (combo && combo.options.length > 1) {
        clearInterval(timer);
        var seen = {}, out = [{ code: PAGE_LANG, name: 'English', native: 'English' }];
        seen[PAGE_LANG] = true;
        for (var i = 0; i < combo.options.length; i++) {
          var c = combo.options[i].value;
          if (!c || seen[c]) continue;
          seen[c] = true;
          out.push({ code: c, name: englishName(c, combo.options[i].text), native: nativeName(c) });
        }
        out.sort(function (a, b) {
          if (a.code === PAGE_LANG) return -1;
          if (b.code === PAGE_LANG) return 1;
          return a.name.localeCompare(b.name);
        });
        langs = out;
        updateLabel();
        render(search.value);
      } else if (tries > 60) {            // ~15 second
        clearInterval(timer);
        list.innerHTML = '<li class="lang-msg">Languages load nahi hui. Internet check karke page refresh karein.</li>';
      }
    }, 250);
  }

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({ pageLanguage: PAGE_LANG, autoDisplay: false }, 'google_translate_element');
    loadLanguagesFromGoogle();
  };

  /* ---------- 7. Start ---------- */
  function start() {
    buildUI();
    updateLabel();
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
  
