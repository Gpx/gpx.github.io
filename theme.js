(function () {
  const storageKey = "theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
      theme = "auto";
    }

    localStorage.setItem(storageKey, theme);

    const select = document.getElementById("theme-select");
    if (select && select.value !== theme) {
      select.value = theme;
    }
  }

  function init() {
    const stored = localStorage.getItem(storageKey) || "auto";
    applyTheme(stored);

    const select = document.getElementById("theme-select");
    if (select) {
      select.addEventListener("change", (event) => applyTheme(event.target.value));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
