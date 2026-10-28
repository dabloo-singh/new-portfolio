document.documentElement.classList.add("js-ready");

const portfolioConfig = {
  availability: "OPEN TO OPPORTUNITIES",
  defaultTheme: "dark",
};

const projects = [
  {
    id: "donor",
    category: "fullstack",
    number: "01",
    kind: "COMMUNITY",
    title: "Bone Marrow Donation System",
    description:
      "A donor management platform for institutes to manage donor and patient records through a responsive, data-backed interface.",
    technologies: ["React.js", "Supabase", "Tailwind CSS", "OAuth"],
    liveDemo: "https://final-main-project.netlify.app/",
    features: [
      "OAuth authentication with role-based access",
      "Real-time Supabase data operations",
      "Responsive donor and patient management interface",
    ],
    preview: `
      <div class="preview-window donor-preview">
        <div class="preview-window-bar"><i></i><i></i><i></i><span>life.link</span></div>
        <div class="preview-screen">
          <span>GIVE THE GIFT OF LIFE</span>
          <strong>Every match<br>matters.</strong>
          <b>FIND A DONOR ↗</b>
        </div>
      </div>
      <span class="preview-stamp">DONOR<br>NETWORK</span>`,
  },
  {
    id: "food",
    category: "fullstack",
    number: "02",
    kind: "COMMERCE",
    title: "Food Delivery App",
    description:
      "A full-stack food ordering experience with restaurant browsing, cart management, authentication, and order history.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    liveDemo: "https://food-delivery-app-dablu.vercel.app/",
    features: [
      "Restaurant browsing and cart management",
      "REST APIs for menus and order processing",
      "Authentication, checkout, and order history",
    ],
    preview: `
      <div class="preview-window food-preview">
        <div class="food-preview-image">GOOD FOOD.<br>GOOD MOOD.</div>
        <div class="food-preview-copy"><strong>Crave something<br>delicious?</strong><span>DISCOVER LOCAL FAVOURITES →</span></div>
      </div>
      <span class="preview-stamp food-stamp">FRESH<br>&amp; FAST</span>`,
  },
  {
    id: "quiz",
    category: "python",
    number: "03",
    kind: "LEARNING",
    title: "The Quiz Adda",
    description:
      "A Python quiz application with a JSON-backed question bank, randomized questions, score tracking, and a final results summary.",
    technologies: ["Python", "JSON", "REST APIs"],
    features: [
      "Randomized questions across categories",
      "Input validation and score tracking",
      "Modular question bank for adding categories",
    ],
    preview: `
      <div class="quiz-board">
        <span class="quiz-prompt">QUICK THINKER, HUH?</span>
        <strong>01<span> / 10</span></strong>
        <div class="quiz-question">Which data structure<br>follows FIFO?</div>
        <div class="quiz-options"><span>A&nbsp; Stack</span><span class="selected-option">B&nbsp; Queue&nbsp; ✓</span><span>C&nbsp; Tree</span></div>
      </div>`,
  },
];

const escapeHTML = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const projectMarkup = (project) => {
  const projectId = escapeHTML(project.id);
  const tags = project.technologies
    .map((technology) => `<span>${escapeHTML(technology)}</span>`)
    .join("");
  const features = project.features
    .map((feature) => `<li>${escapeHTML(feature)}</li>`)
    .join("");
  const liveDemo = project.liveDemo
    ? `<a class="project-demo-link" href="${escapeHTML(project.liveDemo)}" target="_blank" rel="noopener noreferrer">VIEW LIVE DEMO <span aria-hidden="true">↗</span></a>`
    : "";
  const titleId = `project-title-${projectId}`;
  const detailsId = `project-details-${projectId}`;

  return `
    <article class="project-card project-${projectId}" data-category="${escapeHTML(project.category)}" aria-labelledby="${titleId}">
      <div class="project-visual ${projectId}-visual" aria-hidden="true">
        <span class="visual-number">${escapeHTML(project.number)} / ${escapeHTML(project.kind)}</span>
        <span class="visual-coordinate">PROJECT / ${escapeHTML(project.number)}</span>
        ${project.preview}
      </div>
      <div class="project-info">
        <div class="project-title-line"><h3 id="${titleId}">${escapeHTML(project.title)}</h3><span class="project-arrow" aria-hidden="true">↗</span></div>
        <p>${escapeHTML(project.description)}</p>
        <div class="tag-list" aria-label="Technologies">${tags}</div>
        ${liveDemo}
        <button class="project-details-toggle" type="button" aria-expanded="false" aria-controls="${detailsId}">VIEW PROJECT DETAILS <span aria-hidden="true">＋</span></button>
        <div class="project-details" id="${detailsId}" hidden>
          <h4>PROJECT HIGHLIGHTS</h4>
          <ul>${features}</ul>
        </div>
      </div>
    </article>`;
};

const projectList = document.querySelector(".project-list");
if (projectList) {
  projectList.innerHTML = projects.map(projectMarkup).join("");
}

const availability = document.querySelector("[data-availability]");
if (availability) availability.textContent = portfolioConfig.availability;

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

const themeToggle = document.querySelector(".theme-toggle");
const setTheme = (theme) => {
  const selectedTheme = theme === "light" ? "light" : portfolioConfig.defaultTheme;
  document.documentElement.dataset.theme = selectedTheme;
  localStorage.setItem("portfolio-theme", selectedTheme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    selectedTheme === "light" ? "#f7f8fc" : "#070711",
  );
  if (themeToggle) {
    const nextTheme = selectedTheme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute("title", `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute("aria-pressed", String(selectedTheme === "light"));
  }
};

setTheme(document.documentElement.dataset.theme);
themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const sectionLinks = [...document.querySelectorAll('.navigation a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleSection) return;

      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${visibleSection.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const projectFilters = document.querySelectorAll(".project-filter");
const projectCount = document.querySelector(".project-count");
projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    let visibleCount = 0;

    projectFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      const isVisible = category === "all" || card.dataset.category === category;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (projectCount) {
      projectCount.textContent = `SHOWING ${visibleCount} ${visibleCount === 1 ? "PROJECT" : "PROJECTS"}`;
    }
  });
});

document.querySelectorAll(".project-details-toggle").forEach((button) => {
  const details = document.getElementById(button.getAttribute("aria-controls"));
  if (!details) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    button.firstChild.textContent = isExpanded ? "VIEW PROJECT DETAILS " : "HIDE PROJECT DETAILS ";
  });
});

const revealElements = document.querySelectorAll(
  ".section-heading, .about-content, .stats-row, .project-card, .skill-group, .timeline-item, .contact-layout",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (hero && heroVisual && window.matchMedia("(pointer: fine)").matches && !reduceMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.setProperty("--pointer-x", `${x * 12}px`);
    heroVisual.style.setProperty("--pointer-y", `${y * 12}px`);
  });

  hero.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--pointer-x", "0px");
    heroVisual.style.setProperty("--pointer-y", "0px");
  });
}

if (siteHeader) {
  const updateHeader = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    if (heroVisual && !reduceMotion.matches) {
      heroVisual.style.setProperty("--scroll-y", `${-Math.min(window.scrollY * 0.045, 30)}px`);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

document.addEventListener("visibilitychange", () => {
  document.documentElement.classList.toggle("page-hidden", document.hidden);
});
