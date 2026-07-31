(function () {
  "use strict";

  const mobileNav = document.getElementById("mobile-nav");
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const cookieBanner = document.getElementById("cookie-banner");
  const chatBtn = document.getElementById("chat-btn");
  const chatPanel = document.getElementById("chat-panel");
  const contactForm = document.getElementById("contact-form");

  function openMenu() {
    mobileNav?.classList.remove("hidden");
    mobileNav?.classList.add("flex");
    document.body.style.overflow = "hidden";
    menuOpen?.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileNav?.classList.add("hidden");
    mobileNav?.classList.remove("flex");
    document.body.style.overflow = "";
    menuOpen?.setAttribute("aria-expanded", "false");
  }

  menuOpen?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  mobileNav?.addEventListener("click", (e) => {
    if (e.target === mobileNav) closeMenu();
  });
  mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  if (cookieBanner && !localStorage.getItem("dttrucks-cookies")) {
    cookieBanner.classList.remove("translate-y-full");
  }

  document.getElementById("cookie-accept")?.addEventListener("click", () => {
    localStorage.setItem("dttrucks-cookies", "1");
    cookieBanner?.classList.add("translate-y-full");
  });

  document.getElementById("cookie-manage")?.addEventListener("click", () => {
    cookieBanner?.classList.add("translate-y-full");
  });

  chatBtn?.addEventListener("click", () => {
    const open = chatPanel?.classList.toggle("hidden");
    chatBtn.setAttribute("aria-expanded", open ? "false" : "true");
  });

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type=submit]");
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = "Sending…";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = "Message sent!";
      btn.classList.replace("bg-primary-container", "bg-tertiary-container");
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.classList.replace("bg-tertiary-container", "bg-primary-container");
      }, 2500);
    }, 1200);
  });

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title || "Video";
      alert("Video player would open: " + title);
    });
  });

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("shadow-md", window.scrollY > 40);
    }
    const scrollTop = document.getElementById("scroll-top");
    if (scrollTop) {
      scrollTop.classList.toggle("opacity-0", window.scrollY < 400);
      scrollTop.classList.toggle("pointer-events-none", window.scrollY < 400);
    }
  }, { passive: true });
})();
