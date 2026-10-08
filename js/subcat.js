/**
 * 大类页小类切换：点击标签只显示对应分区
 * 标签：button[data-subcat="pork"]
 * 分区：section[data-subcat-panel="pork"]
 * data-subcat="all" 显示全部
 */
(function () {
  var nav = document.querySelector("[data-subcat-nav]");
  if (!nav) return;

  var page = nav.closest(".page") || document;
  var panels = page.querySelectorAll("[data-subcat-panel]");
  var buttons = nav.querySelectorAll("[data-subcat]");

  function show(key) {
    buttons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-subcat") === key);
    });
    panels.forEach(function (panel) {
      var match = key === "all" || panel.getAttribute("data-subcat-panel") === key;
      panel.hidden = !match;
    });
  }

  nav.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-subcat]");
    if (!btn || !nav.contains(btn)) return;
    show(btn.getAttribute("data-subcat"));
  });

  // 支持带 hash 打开：meat.html#beef
  var hash = (location.hash || "").replace(/^#/, "");
  if (hash && page.querySelector('[data-subcat-panel="' + hash + '"]')) {
    show(hash);
  } else {
    show("all");
  }
})();
