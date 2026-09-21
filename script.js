const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form.querySelector('button[type="submit"]');
const year = document.querySelector("#year");
const mobileNavigation = document.querySelector(".mobile-nav");
const menuButton = mobileNavigation.querySelector(".menu-toggle");

year.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const titles = document.querySelectorAll("h1, h2");
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        titleObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

  titles.forEach((title) => {
    title.classList.add("reveal-title");
    titleObserver.observe(title);
  });

  document.documentElement.classList.add("motion-ready");
  document.addEventListener("keydown", () => document.documentElement.classList.add("is-keyboard-nav"));
  document.addEventListener("pointerdown", () => document.documentElement.classList.remove("is-keyboard-nav"));
}

function setMenuOpen(open, instant = false) {
  if (instant) {
    mobileNavigation.classList.add("is-instant");
  }

  mobileNavigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  if (instant) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => mobileNavigation.classList.remove("is-instant"));
    });
  }
}

menuButton.addEventListener("click", (event) => {
  setMenuOpen(!mobileNavigation.classList.contains("is-open"), event.detail === 0);
});

mobileNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

window.addEventListener("hashchange", () => setMenuOpen(false));

document.addEventListener("pointerdown", (event) => {
  if (!mobileNavigation.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNavigation.classList.contains("is-open")) {
    setMenuOpen(false, true);
    menuButton.focus();
  }
});

function setStatus(message, state = "") {
  statusMessage.textContent = message;
  statusMessage.dataset.state = state;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const endpoint = form.dataset.formEndpoint;

  if (!endpoint || !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) {
    setStatus("Online sending is being connected. Please email us directly for now.", "error");
    return;
  }

  submitButton.disabled = true;
  setStatus("Sending your enquiry…");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }

    form.reset();
    setStatus("Your message has been sent. We’ll be in touch soon.");
  } catch (error) {
    console.error(error);
    setStatus("We couldn’t send your message. Please try again or email us directly.", "error");
  } finally {
    submitButton.disabled = false;
  }
});
