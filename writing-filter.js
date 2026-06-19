(function () {
  const writing = document.querySelector(".writing");
  if (!writing) return;

  const tagButtons = writing.querySelectorAll(".writing-tag");
  const posts = writing.querySelectorAll(".posts li");
  const countEl = writing.querySelector(".section-count");
  const totalPosts = posts.length;
  let activeTag = null;

  function updateCount(visible) {
    if (!countEl) return;
    countEl.textContent =
      activeTag === null ? `${totalPosts} posts` : `${visible} posts`;
  }

  function applyFilter(tag) {
    activeTag = tag;
    let visible = 0;

    posts.forEach((item) => {
      const tags = (item.dataset.tags || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      const show = tag === null || tags.includes(tag);
      item.classList.toggle("is-filtered-out", !show);

      if (show) {
        item.removeAttribute("inert");
        item.removeAttribute("aria-hidden");
        visible += 1;
      } else {
        item.setAttribute("inert", "");
        item.setAttribute("aria-hidden", "true");
      }
    });

    tagButtons.forEach((button) => {
      const isActive = button.dataset.tag === tag;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateCount(visible);
  }

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;
      applyFilter(activeTag === tag ? null : tag);
    });
  });

  applyFilter(null);
})();
