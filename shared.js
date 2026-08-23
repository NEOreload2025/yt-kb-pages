/**
 * YT-KB 共用 JavaScript 模組
 * 所有視頻頁、首頁共用此檔案
 * 版本：2026-08-23
 */

// ===== 主題切換邏輯 =====
(function() {
  var themeAttr = 'data-theme';
  var storageKey = 'ytkb-theme';
  var html = document.documentElement;

  function initTheme() {
    try {
      var saved = localStorage.getItem(storageKey);
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      html.setAttribute(themeAttr, theme);
    } catch (e) {
      // localStorage 可能被禁用
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute(themeAttr, prefersDark ? 'dark' : 'light');
    }
  }

  function updateThemeIcon(btn, iconEl, isDark) {
    if (!btn || !iconEl) return;
    iconEl.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? '切換為淺色主題' : '切換為深色主題');
  }

  function setupThemeToggle() {
    var btn = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
    if (!btn) return;

    var iconEl = document.getElementById('themeIcon') || btn.querySelector('.theme-icon');

    // 初始化圖示
    var isDark = html.getAttribute(themeAttr) === 'dark';
    updateThemeIcon(btn, iconEl, isDark);

    btn.addEventListener('click', function() {
      var isDark = html.getAttribute(themeAttr) === 'dark';
      var next = isDark ? 'light' : 'dark';
      html.setAttribute(themeAttr, next);
      try { localStorage.setItem(storageKey, next); } catch (e) {}
      updateThemeIcon(btn, iconEl, !isDark);
    });
  }

  // 監聽系統主題變化
  if (window.matchMedia) {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function(e) {
      // 只有用戶沒有明確選擇時才跟隨系統
      try {
        var saved = localStorage.getItem(storageKey);
        if (!saved) {
          html.setAttribute(themeAttr, e.matches ? 'dark' : 'light');
          var btn = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
          var iconEl = document.getElementById('themeIcon') || btn?.querySelector('.theme-icon');
          updateThemeIcon(btn, iconEl, e.matches);
        }
      } catch (err) {}
    });
  }

  // 初始化
  initTheme();
  setupThemeToggle();
})();

// ===== 回到頂部按鈕邏輯 =====
(function() {
  var btnId = 'back-to-top';
  var btn = document.getElementById(btnId);
  if (!btn) return;

  var threshold = 400;

  function onScroll() {
    if (window.scrollY > threshold) {
      btn.classList.add('show');
      btn.classList.add('visible');
    } else {
      btn.classList.remove('show');
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初始檢查

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== 防止 FOUC（內容閃爍）=====
// 在 CSS 載入前先設定主題，已在各頁面 head 中的 inline script 處理
// 這裡提供輔助函數供需要時調用
window.YTKB = window.YTKB || {};
window.YTKB.initTheme = function() {
  var themeAttr = 'data-theme';
  var storageKey = 'ytkb-theme';
  var html = document.documentElement;
  try {
    var saved = localStorage.getItem(storageKey);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    html.setAttribute(themeAttr, theme);
  } catch (e) {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute(themeAttr, prefersDark ? 'dark' : 'light');
  }
};

console.log('YT-KB shared.js loaded');