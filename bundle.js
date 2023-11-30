const theme = localStorage.getItem("theme") || "theme-1";
document.documentElement.classList.add(theme);

document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector("header select");
  select.value = theme;

  select.addEventListener("change", function () {
    document.documentElement.classList.remove(
      "theme-1",
      "theme-2",
      "theme-3",
      "theme-4"
    );
    document.documentElement.classList.add(this.value);
    localStorage.setItem("theme", this.value);
  });
});
