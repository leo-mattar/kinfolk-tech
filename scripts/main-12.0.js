// --------------- GSAP ---------------
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --------------- CUSTOM EASE ---------------
CustomEase.create("ease-out-1", "0.19, 1, 0.22, 1");
CustomEase.create("ease-in-out-1", "0.87, 0, 0.13, 1");

// --------------- GLOBAL - RELOAD AT THE TOP ---------------
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --------------- LENIS ---------------
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --------------- PAPER TIGET SIGNATURE ---------------
const pprtgr = [
  "color: #F2F3F3",
  "background: #080808",
  "font-size: 12px",
  "padding-left: 10px",
  "line-height: 2",
  "border-left: 5px solid #ff3c31",
].join(";");
console.info(
  `

%cWebsite by Paper Tiger${" "}
www.papertiger.com${"     "}

`,
  pprtgr
);

// --------------- CURRENT YEAR ---------------
const currentYear = document.querySelector("[current-year]");
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- GLOBAL - FADE
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: "5em" });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// --- PARALLAX
function parallax() {
  const images = document.querySelectorAll("[parallax]");

  if (images) {
    const ukiyoInstances = Array.from(images).map(
      img =>
        new Ukiyo(img, {
          scale: 1.2,
          speed: 1.2,
        })
    );

    function resetUkiyo() {
      ukiyoInstances.forEach(instance => instance.reset());
    }

    if (window.innerWidth <= 991) {
      setTimeout(resetUkiyo, 500);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 991) {
        setTimeout(resetUkiyo, 500);
      }
    });
  }
}

// --- HOME ABOUT SECTION - WORD GLYPH HOVER
function wordGlyphHover() {
  const words = Array.from(
    document.querySelectorAll("span.t-display-underline")
  ).slice(0, 5);
  if (!words.length) return;

  const glyphs = {
    0: document.querySelector(".c-img-contain.glyph-1"),
    1: document.querySelector(".c-img-contain.glyph-2"),
    2: document.querySelector(".c-img-contain.glyph-2"),
    3: document.querySelector(".c-img-contain.glyph-3"),
    4: document.querySelector(".c-img-contain.glyph-4"),
  };

  const colors = {
    0: "#cbbe2f",
    1: "#ec5b0d",
    2: "#ec5b0d",
    3: "#d31068",
    4: "#a75f00",
  };

  const defaultColor = "#fff6d9";
  const delay = 0.15;
  const duration = 0.6;
  const ease = "ease-in-out-1";
  const twinIndexes = new Set([1, 2]);

  const glyphStartStates = new Map([
    [".glyph-1", { rotation: -30, scale: 0, xPercent: -15, yPercent: -15 }],
    [".glyph-2", { rotation: 15, scale: 0, xPercent: 5, yPercent: 5 }],
    [".glyph-3", { rotation: -15, scale: 0, xPercent: -10, yPercent: -10 }],
    [".glyph-4", { rotation: 15, scale: 0, xPercent: 10, yPercent: 10 }],
  ]);

  // Track current active state
  let currentActiveIndex = null;
  let isAnimating = false;

  // Initialize all words to default state
  words.forEach(word => {
    word.style.color = defaultColor;
    word.style.setProperty("--before-bg", defaultColor);
  });

  // Initialize all glyphs to hidden state
  Object.values(glyphs).forEach(glyph => {
    if (glyph) {
      gsap.set(glyph, { opacity: 0 });
    }
  });

  function animateColor(el, colorVal) {
    gsap.to(el, {
      duration,
      delay,
      ease,
      color: colorVal,
    });
    gsap.to(el, {
      duration,
      delay,
      ease,
      "--before-bg": colorVal,
    });
  }

  function resetAllToDefault() {
    // Reset all colors
    words.forEach((word, i) => {
      if (twinIndexes.has(i)) {
        // Handle twin indexes together
        if (i === 1) {
          // Only reset once for twins
          twinIndexes.forEach(twinIndex =>
            animateColor(words[twinIndex], defaultColor)
          );
        }
      } else {
        animateColor(word, defaultColor);
      }
    });

    // Hide all glyphs
    Object.values(glyphs).forEach(glyph => {
      if (glyph) {
        gsap.killTweensOf(glyph);
        gsap.to(glyph, {
          opacity: 0,
          duration: 0.3,
        });
      }
    });
  }

  function activateWord(index) {
    if (currentActiveIndex === index || isAnimating) return;

    isAnimating = true;

    // Reset everything first
    if (currentActiveIndex !== null) {
      resetAllToDefault();
    }

    currentActiveIndex = index;

    const glyph = glyphs[index];
    const color = colors[index];
    const glyphKey = glyph?.classList?.[1];

    // Animate glyph
    if (glyph && glyphStartStates.has(`.${glyphKey}`)) {
      const start = glyphStartStates.get(`.${glyphKey}`);
      gsap.killTweensOf(glyph);
      gsap.fromTo(
        glyph,
        {
          opacity: 0,
          ...start,
        },
        {
          delay,
          duration,
          ease,
          opacity: 1,
          rotation: 0,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          onComplete: () => {
            isAnimating = false;
          },
        }
      );
    } else {
      isAnimating = false;
    }

    // Animate colors
    if (twinIndexes.has(index)) {
      twinIndexes.forEach(i => animateColor(words[i], colors[i]));
    } else {
      animateColor(words[index], color);
    }
  }

  function deactivateWord() {
    if (currentActiveIndex === null) return;

    currentActiveIndex = null;
    isAnimating = false;
    resetAllToDefault();
  }

  // Add event listeners
  words.forEach((word, index) => {
    word.addEventListener("mouseenter", () => {
      activateWord(index);
    });

    word.addEventListener("mouseleave", () => {
      // Use a small delay to prevent flickering when moving between elements
      setTimeout(() => {
        // Check if mouse is not over any word
        const hoveredElement = document.querySelector(
          "span.t-display-underline:hover"
        );
        if (!hoveredElement) {
          deactivateWord();
        }
      }, 50);
    });
  });

  // Global mouseleave fallback - reset when mouse leaves the entire container
  const container = words[0].closest("div") || document.body;
  container.addEventListener("mouseleave", () => {
    deactivateWord();
  });
}

// --- HEADER SCROLLED
function headerScrolled() {
  const header = document.querySelector(".c-header");

  ScrollTrigger.create({
    trigger: "body",
    start: "40 top",
    onToggle: self => {
      if (self.isActive) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
  });
}

// --- HOME LOADER
function loader() {
  const tl = gsap.timeline({
    defaults: {
      ease: "ease-out-1",
      duration: 1.6,
    },
  });

  gsap.set("[data-hero-title]", { opacity: 1 });
  gsap.set("[data-hero-light]", { scale: 0, yPercent: 80 });
  gsap.set("[data-hero-sub]", { yPercent: 100, opacity: 0 });

  let headings = document.querySelectorAll("[data-split]");

  headings.forEach(heading => {
    const splitInstance = SplitText.create(heading, {
      type: "lines, chars",
      autoSplit: true,
      mask: "lines",
    });

    tl.from(
      splitInstance.lines,
      {
        duration: 1.4,
        yPercent: 120,
        stagger: 0.2,
        ease: "ease-out-1",
      },
      "<"
    );
  });

  tl.to("[data-hero-sub]", { yPercent: 0, opacity: 1 }, "<0.1");

  tl.to("[data-hero-light]", { scale: 1, yPercent: 0, opacity: 1 }, "<0.1");
  tl.to(".c-header", { opacity: 1 }, "<0.4");
  tl.to(
    ["[data-hero-btn] .c-btn", "[data-about-section]"],
    { opacity: 1 },
    "<0.2"
  );

  return tl;
}

// --- HOME GALLERY PARALLAX
function homeGalleryScrollIntoView() {
  const gallery = document.querySelector(".c-gallery");
  if (!gallery) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: gallery,
      endTrigger: ".o-row.hm-hero",
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(gallery, {
    opacity: 1,
  });
  tl.to(
    [".c-hm-hero-title", ".c-hm-hero-sub", ".o-row.hm-hero .c-btn"],
    {
      opacity: 0.3,
    },
    "<"
  );
}

// --- PARALLAX ELEMENTS INDIVIDUALLY
function parallaxElements() {
  let parallaxEl = document.querySelectorAll("[parallax-ind]");

  parallaxEl.forEach(item => {
    let parallaxY = parseFloat(item.getAttribute("data-parallax-y")) || 0;
    let screenWidth = window.innerWidth;

    if (
      item.getAttribute("parallax-ind") !== "mobile-false" ||
      screenWidth > 991
    ) {
      let tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      tl.to(item, {
        yPercent: parallaxY,
        scrollTrigger: {
          trigger: item,
          start: "clamp(top bottom)",
          end: "clamp(bottom center)",
          scrub: 1,
        },
      });
    }
  });
}

// --------------- WORK SLIDER ---------------
function workSlider() {
  const sliderEl = document.querySelector(".swiper.hm-work");
  if (!sliderEl) return;

  const sliderMain = new Swiper(sliderEl, {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    initialSlide: 1,
    speed: 600,
    grabCursor: true,
    navigation: {
      nextEl: "#work-next",
      prevEl: "#work-prev",
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
      },
      992: {
        spaceBetween: 28,
      },
    },
  });
}

// --- MARQUEE
function marquee({
  sectionSelector,
  marqueeSelector,
  marqueeListSelector,
  duration,
}) {
  if (
    typeof sectionSelector !== "string" ||
    typeof marqueeSelector !== "string" ||
    typeof marqueeListSelector !== "string" ||
    typeof duration !== "number"
  )
    return;

  document.querySelectorAll(sectionSelector).forEach(section => {
    const marquee = section.querySelector(marqueeSelector);
    const marqueeList = section.querySelector(marqueeListSelector);
    if (!marquee || !marqueeList) return;

    const duplicatedList = marqueeList.cloneNode(true);
    marquee.appendChild(duplicatedList);

    gsap.timeline().to([marqueeList, duplicatedList], {
      xPercent: -100,
      duration,
      ease: "linear",
      repeat: -1,
    });
  });
}

// --------------- EXHIBITION SLIDER ---------------
function exhibtionSlider() {
  const sliderEl = document.querySelector(".swiper.exhib");
  const sliderElTitle = document.querySelector(".swiper.exhib-title");
  const sliderElTxt = document.querySelector(".swiper.exhib-txt");

  if (!sliderEl || !sliderElTitle || !sliderElTxt) return;

  const sliderTitle = new Swiper(sliderElTitle, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
  });

  const sliderTxt = new Swiper(sliderElTxt, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
  });

  const sliderMain = new Swiper(sliderEl, {
    slidesPerView: "auto",
    speed: 400,
    grabCursor: true,
    effect: "cards",
    cardsEffect: {
      perSlideOffset: 5,
      perSlideRotate: 5,
      slideShadows: false,
    },
    navigation: {
      nextEl: "#exhib-next",
      prevEl: "#exhib-prev",
    },
    controller: {
      control: [sliderTitle, sliderTxt],
    },
  });
}

// --- HOME MISSION SECTION COLOR THEME CHANGE
function homeMissionSection() {
  const section = document.querySelector(".c-section.hm-mission");
  if (!section) return;

  const initialBackground = "#3c1a0c";
  const initialColor = "#fff6d9";

  const swappedBackground = initialColor;
  const swappedColor = initialBackground;

  gsap.set(section, { background: initialBackground, color: initialColor });

  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom top",
    onEnter: () => {
      gsap.to(section, {
        background: swappedBackground,
        color: swappedColor,
        duration: 0.5,
      });
    },
    onLeaveBack: () => {
      gsap.to(section, {
        background: initialBackground,
        color: initialColor,
        duration: 0.5,
      });
    },
  });
}

// --- HOME TECH PHONE ANIMATION
function homeTechPhoneAnimation() {
  const section = document.querySelector(".c-section.hm-tech");
  if (!section) return;

  const customX = section.getAttribute("data-x") || "17em";

  gsap.from(".c-img-contain.hm-tech-phone", {
    x: customX,
    scrollTrigger: {
      trigger: section,
      start: "center bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });
}

// --- HEADER MOBILE
function headerMobile() {
  const navBtn = document.querySelector(".c-nav-btn");
  const header = document.querySelector(".c-header");
  const headerNav = document.querySelector(".c-header-nav");
  const navLinks = document.querySelectorAll(".c-header .c-nav-link");
  const btnGroup = document.querySelector(".c-btn-group.header");
  const headerInner = document.querySelector(".c-header-inner");

  if (!navBtn || !header || !headerNav || !btnGroup || !headerInner) {
    return;
  }

  function openHeader() {
    lenis.stop();
    header.classList.add("is-open");
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
  }

  function closeHeader() {
    lenis.start();
    header.classList.remove("is-open");
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("click", onClickOutside);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      closeHeader();
    }
  }

  function onClickOutside(e) {
    if (!headerNav.contains(e.target) && !navBtn.contains(e.target)) {
      closeHeader();
    }
  }

  navBtn.addEventListener("click", () => {
    if (header.classList.contains("is-open")) {
      closeHeader();
    } else {
      openHeader();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeHeader);
  });

  let inMobileLayout = null;

  function handleResize() {
    if (header.getAttribute("data-header") === "full") {
      return;
    }

    const isMobile = window.innerWidth <= 991;

    if (isMobile && inMobileLayout !== true) {
      headerNav.appendChild(btnGroup);
      btnGroup.style.display = "flex";
      inMobileLayout = true;
    } else if (!isMobile && inMobileLayout !== false) {
      headerInner.appendChild(btnGroup);
      btnGroup.style.display = ""; // reset to original
      inMobileLayout = false;
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();
}

// --- SAFARI
function addSafariOnlyClass() {
  const ua = navigator.userAgent;

  // Check for Mac Safari
  const isMacSafari =
    navigator.platform === "MacIntel" &&
    navigator.vendor === "Apple Computer, Inc." &&
    ua.includes("Safari") &&
    !ua.includes("Chrome");

  // Check for iOS Safari - with cross-validation
  const isIOSUserAgent = /iPad|iPhone|iPod/.test(ua);
  const isAppleVendor = navigator.vendor === "Apple Computer, Inc.";
  const isIOSPlatform =
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isIOSSafari =
    isIOSUserAgent &&
    isAppleVendor &&
    (isIOSPlatform || navigator.platform === "MacIntel") &&
    ua.includes("Safari") &&
    !ua.includes("CriOS") &&
    !ua.includes("Chrome");

  if (isMacSafari || isIOSSafari) {
    document.body.classList.add("safari-only");
  }
}

// --- MOBILE HOME GLYPHS
function mobileGlyphScroll() {
  const glyphWrap = document.querySelector(".c-glyph-wrap");
  if (!glyphWrap) return;

  const glyphs = [
    document.querySelector(".c-img-contain.glyph-1"),
    document.querySelector(".c-img-contain.glyph-2"),
    document.querySelector(".c-img-contain.glyph-3"),
    document.querySelector(".c-img-contain.glyph-4"),
  ];

  const words = document.querySelectorAll(".t-display-underline");

  const colors = {
    0: "#cbbe2f", // green
    1: "#ec5b0d", // orange
    2: "#ec5b0d", // orange
    3: "#d31068", // pink
    4: "#a75f00", // amber
  };

  const defaultColor = "#fff6d9";
  const twinIndexes = new Set([1, 2]);

  const duration = 0.6;
  const ease = "power3.inOut";
  const delayBetween = 1;

  const glyphStartStates = [
    { rotation: -30, scale: 0, xPercent: -15, yPercent: -15 },
    { rotation: 15, scale: 0, xPercent: 5, yPercent: 5 },
    { rotation: -15, scale: 0, xPercent: -10, yPercent: -10 },
    { rotation: 15, scale: 0, xPercent: 10, yPercent: 10 },
  ];

  // Initialize all glyphs as hidden and words with default color
  glyphs.forEach((glyph, index) => {
    if (glyph) {
      gsap.set(glyph, {
        opacity: 0,
        ...glyphStartStates[index],
      });
    }
  });

  if (words.length) {
    words.forEach(word => {
      word.style.color = defaultColor;
      word.style.setProperty("--before-bg", defaultColor);
    });
  }

  function animateColor(el, colorVal) {
    gsap.set(el, {
      color: colorVal,
      "--before-bg": colorVal,
    });
  }

  function setWordColorsForGlyph(glyphIndex) {
    // First reset all words to default
    resetWordColors();

    if (glyphIndex === 0) {
      // Glyph 1 -> Word 0 (place-based)
      if (words[0]) animateColor(words[0], colors[0]);
    } else if (glyphIndex === 1) {
      // Glyph 2 -> Words 1 & 2 (immersive & technology) - twins
      if (words[1]) animateColor(words[1], colors[1]);
      if (words[2]) animateColor(words[2], colors[2]);
    } else if (glyphIndex === 2) {
      // Glyph 3 -> Word 3 (communities)
      if (words[3]) animateColor(words[3], colors[3]);
    } else if (glyphIndex === 3) {
      // Glyph 4 -> Word 4 (belonging)
      if (words[4]) animateColor(words[4], colors[4]);
    }
  }

  function resetWordColors() {
    if (words.length) {
      words.forEach((word, i) => {
        animateColor(word, defaultColor);
      });
    }
  }

  // Create ScrollTrigger for the wrap
  ScrollTrigger.create({
    trigger: glyphWrap,
    start: "clamp(top bottom)",
    end: "bottom 20%",
    scrub: 1,
    onUpdate: self => {
      const progress = self.progress;
      const glyphCount = glyphs.filter(g => g).length;

      // Calculate which glyph should be active based on scroll progress
      const currentIndex = Math.floor(progress * glyphCount);
      const clampedIndex = Math.min(currentIndex, glyphCount - 1);

      // Hide all glyphs and reset colors first
      glyphs.forEach(glyph => {
        if (glyph) {
          gsap.set(glyph, { opacity: 0 });
        }
      });
      resetWordColors();

      // Show current glyph and set word colors at the same time
      const currentGlyph = glyphs[clampedIndex];
      if (currentGlyph) {
        gsap.set(currentGlyph, {
          opacity: 1,
          rotation: 0,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
        });

        // Set word colors for current glyph at the same time
        setWordColorsForGlyph(clampedIndex);
      }
    },
    onLeave: () => {
      // Hide all glyphs and reset colors when leaving
      glyphs.forEach(glyph => {
        if (glyph) {
          gsap.set(glyph, { opacity: 0 });
        }
      });
      resetWordColors();
    },
    onLeaveBack: () => {
      // Hide all glyphs and reset colors when scrolling back up
      glyphs.forEach(glyph => {
        if (glyph) {
          gsap.set(glyph, { opacity: 0 });
        }
      });
      resetWordColors();
    },
  });
}

// --------------- ZONE SLIDER ---------------
function zoneSlider() {
  const sliderEl = document.querySelector(".swiper.zone");
  if (!sliderEl) return;

  const nextEl = document.querySelector("#zone-next");
  const prevEl = document.querySelector("#zone-prev");

  if (!nextEl || !prevEl) return;

  const sliderMain = new Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      nextEl,
      prevEl,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

// --------------- PHONE DOTS EVENT ---------------
function appPhoneDots() {
  const dots = document.querySelectorAll(".c-phone-map-dot");
  const cards = document.querySelectorAll(".c-phone-map-card");

  if (!dots.length || !cards.length) return;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      const isAlreadyActive = dot.classList.contains("is-active");
      dots.forEach(d => d.classList.remove("is-active"));
      cards.forEach(c => c.classList.remove("is-active"));
      if (!isAlreadyActive) {
        dot.classList.add("is-active");
        if (cards[index]) {
          cards[index].classList.add("is-active");
        }
      }
    });
  });
}

// --------------- PHONE MOTION SLIDER ---------------
function phoneMotionSlider() {
  const sliderEl = document.querySelector(".swiper.phone-motion");
  if (!sliderEl) return;

  const sliderMain = new Swiper(sliderEl, {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-20%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
  });
}

// --------------- ARTIFACT SLIDER ---------------
function artifactSlider() {
  const sliderEl = document.querySelector(".swiper.artifact");
  if (!sliderEl) return;

  const slideItems = sliderEl.querySelectorAll(".swiper-slide");
  if (!slideItems.length) return;

  const nextEl = document.querySelector("#artifact-next");
  const prevEl = document.querySelector("#artifact-prev");

  if (!nextEl || !prevEl) return;

  const sliderMain = new Swiper(sliderEl, {
    // slidesPerView: 3,
    spaceBetween: 16,
    speed: 600,
    allowTouchMove: false,
    navigation: {
      nextEl,
      prevEl,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
      },
      480: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
}

// --- VIDEO SCROLL ANIMATION
function videoScrollAnimation() {
  const videosWrapper = document.querySelectorAll(".c-video-contain");
  if (videosWrapper.length === 0) return;

  videosWrapper.forEach(video => {
    gsap.to(video, {
      scale: 0.9,
      clipPath: "inset(100% 0% 0% 0%)",
      scrollTrigger: {
        trigger: video,
        start: "clamp(top 10%)",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

// --- EVENTS/EXHIBITIONS READ MORE
function readMore() {
  const items = document.querySelectorAll("[data-read-more-item]");
  if (items.length === 0) return;

  items.forEach(item => {
    const key = item.getAttribute("data-read-more-item");
    const content = item.querySelector(".c-read-more-main .t-rich-text");
    const button = document.querySelector(`[data-read-more-btn="${key}"]`);

    if (content && content.textContent.trim().length < 750) {
      item.classList.add("no-read-more");
      if (button) {
        const row = button.closest(".o-row");
        if (row) {
          row.style.display = "none";
        }
      }
    }

    if (button && button.style.display !== "none") {
      button.addEventListener("click", function () {
        const readMoreMain = document.querySelector(
          `[data-read-more-item="${key}"]`
        );

        if (readMoreMain) {
          readMoreMain.classList.toggle("is-open");
        }

        const btnTxt = this.querySelector(".c-btn .c-btn-txt");
        if (btnTxt) {
          btnTxt.textContent = readMoreMain?.classList.contains("is-open")
            ? "READ LESS"
            : "READ MORE";
        }

        const scrollTarget = document.querySelector("[data-scroll-read-more]");
        if (scrollTarget && typeof lenis !== "undefined" && lenis.scrollTo) {
          lenis.scrollTo(scrollTarget, { offset: 0, duration: 0.6 });
        }
      });
    }
  });
}

// --- GLITCH ICONS
function glitchIcons() {
  const icons = document.querySelectorAll(".c-img-contain.glitch-icon");
  if (icons.length === 0) return;

  icons.forEach(icon => {
    const images = icon.querySelectorAll(".c-img.glitch");
    if (images.length < 2) return;

    let currentIndex = Array.from(images).findIndex(img =>
      img.classList.contains("is-active")
    );
    if (currentIndex === -1) {
      currentIndex = 0;
      images[0].classList.add("is-active");
    }

    gsap.set(images, { autoAlpha: 0 });
    gsap.set(images[currentIndex], { autoAlpha: 1 });

    setInterval(() => {
      const currentImage = images[currentIndex];
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImage = images[nextIndex];

      currentImage.classList.remove("is-active");
      nextImage.classList.add("is-active");

      gsap.to(currentImage, { autoAlpha: 0, duration: 0 });
      gsap.to(nextImage, { autoAlpha: 1, duration: 0 });

      currentIndex = nextIndex;
    }, 2000);
  });
}

// --- HEADER SCROLL VISIBILITY
function headerScrollVisibility() {
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".c-header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= 300) return;

    if (scrollTop > lastScrollTop) {
      header.classList.add("not-visible");
    } else if (scrollTop < lastScrollTop) {
      header.classList.remove("not-visible");
    }

    lastScrollTop = scrollTop;
  });
}

// --- CARD FX SECTION SETUP
function cardFXSection() {
  const section = document.querySelector(".o-grid.card-fx");
  if (!section) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    once: true,
    onEnter: () => {
      ScrollTrigger.refresh();
    },
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 40%",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.set(section, { x: "-18em" });
  gsap.set(".c-card-fx-txt", { opacity: 1 });

  tl.to(section, { x: "0em" });
  tl.to(".c-card-fx-txt", { opacity: 0 }, 0);
}

// --- ANIMATED CARDS
function animatedCards() {
  const container = document.querySelector(".c-card-fx-list");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".c-card-fx-slot"));
  const totalCards = cards.length;

  cards.forEach((card, i) => {
    card.style.zIndex = i;
  });

  for (let i = totalCards - 1; i > 0; i--) {
    const card = cards[i];
    const originalZ = i;
    const negativeZ = -i;
    let flipped = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: () => `top+=${(totalCards - 1 - i) * window.innerHeight} top`,
        end: () => `top+=${(totalCards - i) * window.innerHeight} top`,
        scrub: true,
        onUpdate: self => {
          if (self.progress >= 0.35 && !flipped) {
            card.style.zIndex = negativeZ;
            flipped = true;
          } else if (self.progress < 0.35 && flipped) {
            card.style.zIndex = originalZ;
            flipped = false;
          }
        },
      },
    });

    tl.to(card, {
      x: "-130%",
      rotate: -10,
      scale: 0.95,
    }).to(card, {
      x: "0%",
      rotate: 0,
      scale: 1,
      duration: 1,
      immediateRender: false,
    });
  }
}

// --------------- IMPACT SLIDER ---------------
function impactSlider() {
  const sliderEl = document.querySelector(".swiper.impact");
  if (!sliderEl) return;

  const nextEl = document.querySelector("#impact-next");
  const prevEl = document.querySelector("#impact-prev");

  if (!nextEl || !prevEl) return;

  const sliderMain = new Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      nextEl,
      prevEl,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
}

// --- CHALLENGE CARDS
function challengeCards() {
  const challengeCards = document.querySelectorAll(".c-chal-card");

  if (challengeCards.length === 0) return;

  challengeCards.forEach((card, index) => {
    const isLastCard = index === challengeCards.length - 1;
    const prevCard = challengeCards[index - 1];

    gsap.set(card, { opacity: 0.1 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      end: "bottom 80%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
      onLeave: self => {
        if (!isLastCard) {
          gsap.to(card, {
            opacity: 0.1,
            duration: 0.6,
            ease: "power3.inOut",
          });
        }
      },
      onLeaveBack: self => {
        if (!isLastCard) {
          gsap.to(card, {
            opacity: 0.1,
            duration: 0.6,
            ease: "power3.inOut",
          });
        } else {
          // If we're scrolling up into the previous card, fade out the last card
          if (prevCard) {
            gsap.to(card, {
              opacity: 0.1,
              duration: 0.6,
              ease: "power3.inOut",
            });
          }
        }
      },
      onEnterBack: () => {
        gsap.to(card, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });
  });
}

// --- FORM VALIDATION
function formValidation() {
  const form = document.querySelector(".c-contact-form.partner");
  if (!form) return;

  const inputs = form.querySelectorAll(".c-form-input, .c-form-textarea");

  inputs.forEach(field => {
    field.addEventListener("blur", () => {
      const isEmpty = !field.value.trim();

      if (isEmpty) {
        field.classList.add("has-error");
      } else {
        field.classList.remove("has-error");
      }
    });
  });
}

const homePage = document.querySelector("[data-page='homepage']");

// --------------- INIT ---------------
function init() {
  parallax();
  headerScrolled();
  parallaxElements();
  workSlider();
  exhibtionSlider();
  homeMissionSection();
  headerMobile();
  marquee({
    sectionSelector: ".c-section.footer",
    marqueeSelector: ".c-marquee.footer",
    marqueeListSelector: ".c-marquee-list.footer",
    duration: window.innerWidth <= 479 ? 40 : 60,
  });
  document.fonts.ready.then(() => {
    loader();
  });
  addSafariOnlyClass();
  zoneSlider();
  appPhoneDots();
  phoneMotionSlider();
  artifactSlider();
  videoScrollAnimation();
  readMore();
  glitchIcons();
  headerScrollVisibility();
  challengeCards();
  impactSlider();
  formValidation();
}

init();

// --------------- MATCHMEDIA (DESKTOP) ---------------
mm.add("(min-width: 992px)", () => {
  wordGlyphHover();
  homeGalleryScrollIntoView();
  homeTechPhoneAnimation();
  fade();
  animatedCards();
  cardFXSection();
  return () => {
    //
  };
});

// --------------- MATCHMEDIA (TABLET AND MOBILE) ---------------
mm.add("(max-width: 991px)", () => {
  mobileGlyphScroll();
  return () => {
    //
  };
});
