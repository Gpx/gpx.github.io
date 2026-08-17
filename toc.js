(function () {
  var toc = document.querySelector(".post-toc");
  if (!toc) return;

  var aside = document.querySelector(".post-toc-aside");
  var details = toc.querySelector(".post-toc-details");
  var links = Array.from(toc.querySelectorAll('.post-toc-list a[href^="#"]'));
  if (!links.length) return;

  var desktop = window.matchMedia("(min-width: 1280px)");
  function syncDetailsOpen() {
    if (!details) return;
    if (desktop.matches) {
      details.setAttribute("open", "");
    } else {
      details.removeAttribute("open");
    }
  }
  syncDetailsOpen();
  desktop.addEventListener("change", syncDetailsOpen);

  function syncAsideOverflow() {
    if (!aside) return;
    aside.classList.remove("is-scrollable");
    if (!desktop.matches) return;
    var top = aside.getBoundingClientRect().top;
    var available = window.innerHeight - top - 24;
    if (aside.scrollHeight > available + 2) {
      aside.classList.add("is-scrollable");
    }
  }

  syncAsideOverflow();
  window.addEventListener("resize", syncAsideOverflow);
  desktop.addEventListener("change", syncAsideOverflow);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncAsideOverflow);
  }

  var headings = links
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (!headings.length || !("IntersectionObserver" in window)) return;

  var activeId = "";
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
})();
