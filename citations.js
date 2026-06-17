(function () {
  var popover = null;

  function closePopover() {
    if (!popover) return;
    popover.remove();
    popover = null;
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKeyDown);
  }

  function onDocClick(e) {
    if (popover && !popover.contains(e.target)) closePopover();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closePopover();
  }

  function openCitation(anchor, sourceEl) {
    closePopover();

    var link = sourceEl.querySelector(".post-source-link");
    if (!link) return;

    var id = sourceEl.getAttribute("data-source-id") || "";
    popover = document.createElement("div");
    popover.className = "citation-popover";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-label", "Source " + id);

    var label = document.createElement("span");
    label.className = "citation-popover-label";
    label.textContent = "Source " + id;

    var title = document.createElement("a");
    title.className = "citation-popover-link external-link";
    title.href = link.href;
    title.target = "_blank";
    title.rel = "noopener noreferrer";
    title.textContent = link.textContent;

    var footer = document.createElement("p");
    footer.className = "citation-popover-footer";
    var listLink = document.createElement("a");
    listLink.href = "#" + sourceEl.id;
    listLink.textContent = "View in sources list";
    listLink.addEventListener("click", function () {
      closePopover();
    });
    footer.appendChild(listLink);

    popover.append(label, title, footer);
    document.body.appendChild(popover);

    var rect = anchor.getBoundingClientRect();
    var top = rect.bottom + window.scrollY + 8;
    var left = rect.left + window.scrollX;

    popover.style.top = top + "px";
    popover.style.left = Math.max(12, left) + "px";

    requestAnimationFrame(function () {
      var popRect = popover.getBoundingClientRect();
      if (popRect.right > window.innerWidth - 12) {
        popover.style.left = Math.max(12, window.innerWidth - popRect.width - 12) + "px";
      }
      if (popRect.bottom > window.innerHeight - 12) {
        popover.style.top = rect.top + window.scrollY - popRect.height - 8 + "px";
      }
    });

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
  }

  document.addEventListener("click", function (e) {
    var anchor = e.target.closest('.post-research a[href^="#source-"]');
    if (!anchor) return;

    var id = anchor.getAttribute("href").slice(1);
    var sourceEl = document.getElementById(id);
    if (!sourceEl) return;

    e.preventDefault();
    openCitation(anchor, sourceEl);
  });
})();
