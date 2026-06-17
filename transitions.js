(function () {
  function pathIsHome(pathname) {
    return pathname === "/" || pathname === "/index.html";
  }

  function pathIsPost(pathname) {
    return pathname.startsWith("/posts/");
  }

  function isPostToHome(activation) {
    if (!activation?.entry?.url) return false;

    const fromUrl = activation.from?.url ?? location.href;
    const fromPath = new URL(fromUrl, location.origin).pathname;
    const toPath = new URL(activation.entry.url, location.origin).pathname;

    return pathIsPost(fromPath) && pathIsHome(toPath);
  }

  function skipIfPostToHome(event) {
    if (!event.viewTransition || !event.activation) return;
    if (isPostToHome(event.activation)) {
      event.viewTransition.skipTransition();
    }
  }

  window.addEventListener("pageswap", skipIfPostToHome);
  window.addEventListener("pagereveal", skipIfPostToHome);
})();
