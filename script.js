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

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --------------- PAPER TIGET SIGNATURE ---------------
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// --------------- CURRENT YEAR ---------------
const currentYear = document.querySelector('[current-year]');
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- PARALLAX
function parallax() {
  const images = document.querySelectorAll("[parallax]");

  if (images) {
    new Ukiyo(images, {
      scale: 1.2,
      speed: 1.2,
      // willChange: true,
    });
  }
}

// --- HOME ABOUT SECTION - WORD GLYPH HOVER 
// function wordGlyphHover() {
//   const words = document.querySelectorAll(".c-word-glyph");
//   if (words.length === 0) return;

//   const glyph1 = document.querySelector(".c-img-contain.glyph-1");
//   const glyph2 = document.querySelector(".c-img-contain.glyph-2");
//   const glyph3 = document.querySelector(".c-img-contain.glyph-3");
//   const glyph4 = document.querySelector(".c-img-contain.glyph-4");

//   const glyphMap = {
//     0: glyph1,
//     1: glyph2,
//     2: glyph2,
//     3: glyph3,
//     4: glyph4,
//   };

//   const colorMap = {
//     0: "#cbbe2f", // green
//     1: "#ec5b0d", // orange
//     2: "#ec5b0d", // orange
//     3: "#d31068", // pink
//     4: "#a75f00", // amber
//   };

//   const defaultColor = "#fff6d9";

//   // Set initial color and --before-bg to defaultColor to avoid flicker on first hover
//   words.forEach(word => {
//     word.style.color = defaultColor;
//     word.style.setProperty("--before-bg", defaultColor);
//   });

//   const glyphInAnimations = new Map([
//     [glyph1, { rotation: -30, scale: 0, xPercent: -15, yPercent: -15 }],
//     [glyph2, { rotation: 15, scale: 0, xPercent: 5, yPercent: 5 }],
//     [glyph3, { rotation: -15, scale: 0, xPercent: -10, yPercent: -10 }],
//     [glyph4, { rotation: 15, scale: 0, xPercent: 10, yPercent: 10 }],
//   ]);

//   function resetGlyphs() {
//     glyphInAnimations.forEach((anim, glyph) => {
//       gsap.set(glyph, {
//         opacity: 0,
//         rotation: anim.rotation,
//         scale: anim.scale,
//         xPercent: anim.xPercent,
//         yPercent: anim.yPercent,
//       });
//     });
//   }

//   resetGlyphs();

//   words.forEach((word, index) => {
//     const glyph = glyphMap[index];
//     const hoverColor = colorMap[index];

//     word.addEventListener("mouseenter", () => {
//       resetGlyphs();

//       if (glyph && glyphInAnimations.has(glyph)) {
//         const anim = glyphInAnimations.get(glyph);
//         gsap.fromTo(
//           glyph,
//           {
//             opacity: 0,
//             rotation: anim.rotation,
//             scale: anim.scale,
//             xPercent: anim.xPercent,
//             yPercent: anim.yPercent,
//           },
//           {
//             opacity: 1,
//             rotation: 0,
//             scale: 1,
//             xPercent: 0,
//             yPercent: 0,
//             duration: 0.6,
//             ease: "ease-in-out-1",
//           }
//         );
//       }

//       if (index === 1 || index === 2) {
//         [1, 2].forEach(i => {
//           const el = words[i];
//           gsap.to(el, {
//             duration: 0.6,
//             ease: "ease-in-out-1",
//             color: colorMap[i],
//           });
//           gsap.to(el, {
//             duration: 0.6,
//             ease: "ease-in-out-1",
//             "--before-bg": colorMap[i],
//           });
//         });
//       } else {
//         gsap.to(word, {
//           duration: 0.6,
//           ease: "ease-in-out-1",
//           color: hoverColor,
//         });
//         gsap.to(word, {
//           duration: 0.6,
//           ease: "ease-in-out-1",
//           "--before-bg": hoverColor,
//         });
//       }
//     });

//     word.addEventListener("mouseleave", () => {
//       if (glyph) {
//         gsap.to(glyph, {
//           opacity: 0,
//           duration: 0.3,
//           onComplete: () => {
//             const anim = glyphInAnimations.get(glyph);
//             gsap.set(glyph, {
//               rotation: anim.rotation,
//               scale: anim.scale,
//               xPercent: anim.xPercent,
//               yPercent: anim.yPercent,
//             });
//           },
//         });
//       }

//       if (index === 1 || index === 2) {
//         [1, 2].forEach(i => {
//           const el = words[i];
//           gsap.to(el, {
//             duration: 0.6,
//             ease: "ease-in-out-1",
//             color: defaultColor,
//           });
//           gsap.to(el, {
//             duration: 0.6,
//             ease: "ease-in-out-1",
//             "--before-bg": defaultColor,
//           });
//         });
//       } else {
//         gsap.to(word, {
//           duration: 0.6,
//           ease: "ease-in-out-1",
//           color: defaultColor,
//         });
//         gsap.to(word, {
//           duration: 0.6,
//           ease: "ease-in-out-1",
//           "--before-bg": defaultColor,
//         });
//       }
//     });
//   });
// }

function wordGlyphHover() {
  const words = document.querySelectorAll(".c-word-glyph");
  if (!words.length) return;

  const glyphs = {
    0: document.querySelector(".c-img-contain.glyph-1"),
    1: document.querySelector(".c-img-contain.glyph-2"),
    2: document.querySelector(".c-img-contain.glyph-2"),
    3: document.querySelector(".c-img-contain.glyph-3"),
    4: document.querySelector(".c-img-contain.glyph-4"),
  };

  const colors = {
    0: "#cbbe2f", // green
    1: "#ec5b0d", // orange
    2: "#ec5b0d", // orange
    3: "#d31068", // pink
    4: "#a75f00", // amber
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

  // Initialize word styles
  words.forEach(word => {
    word.style.color = defaultColor;
    word.style.setProperty("--before-bg", defaultColor);
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

  words.forEach((word, index) => {
    const glyph = glyphs[index];
    const color = colors[index];
    const glyphKey = glyph?.classList?.[1];

    word.addEventListener("mouseenter", () => {
      if (glyph && glyphStartStates.has(`.${glyphKey}`)) {
        const start = glyphStartStates.get(`.${glyphKey}`);
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
          }
        );
      }

      if (twinIndexes.has(index)) {
        twinIndexes.forEach(i => animateColor(words[i], colors[i]));
      } else {
        animateColor(word, color);
      }
    });

    word.addEventListener("mouseleave", () => {
      if (glyph) {
        gsap.to(glyph, {
          opacity: 0,
          duration: 0.3,
        });
      }

      if (twinIndexes.has(index)) {
        twinIndexes.forEach(i => animateColor(words[i], defaultColor));
      } else {
        animateColor(word, defaultColor);
      }
    });
  });
}

// --- HEADER SCROLLED
function headerScrolled() {
  const header = document.querySelector(".c-header");

  ScrollTrigger.create({
    trigger: "body",
    start: "100 top",
    onToggle: (self) => {
      if (self.isActive) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// --- HOME LOADER
function homeLoader() {
  const tl = gsap.timeline({
    defaults: {
      ease: "ease-out-1",
      duration: 1.6
    }
  });

  gsap.set(".c-hm-hero-title", { opacity: 1 });
  gsap.set(".c-hm-hero-light", { scale: 0, yPercent: 80 })

  let headings = document.querySelectorAll('[data-split]');

  headings.forEach(heading => {
    const splitInstance = SplitText.create(heading, {
      type: "lines, chars",
      autoSplit: true,
      mask: "lines",
    });

    tl.from(splitInstance.lines, {
      duration: 1.4,
      yPercent: 120,
      stagger: 0.2,
      ease: "ease-out-1"
    }, "<");
  });

  tl.to(".c-hm-hero-sub", { opacity: 1 }, "<0.1");

  tl.to(".c-hm-hero-light", { scale: 1, yPercent: 0, opacity: 1 }, "<0.1");
  tl.to(".c-header", { y: 0 }, "<0.4");
  tl.to([".o-row.hm-hero .c-btn", ".o-row.hm-about"], { opacity: 1 }, "<0.2");

  return tl;
}

// --- HOME GALLERY PARALLAX
function homeGalleryScrollIntoView() {
  const gallery = document.querySelector(".c-gallery");
  if (!gallery) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".o-row.hm-hero",
      start: "center 50%",
      end: "bottom top",
      scrub: true,
    }
  });

  tl.to(gallery, {
    opacity: 1
  });
  tl.to([".c-hm-hero-title", ".c-hm-hero-sub", ".o-row.hm-hero .c-btn"], {
    opacity: 0.3
  }, "<");
}

// --- PARALLAX ELEMENTS INDIVIDUALLY
function parallaxElements() {
  let parallaxEl = document.querySelectorAll("[parallax-ind]");

  parallaxEl.forEach(item => {
    let parallaxY = parseFloat(item.getAttribute("data-parallax-y")) || 0;
    let screenWidth = window.innerWidth;

    if (item.getAttribute("parallax-ind") !== "mobile-false" || screenWidth > 991) {
      let tl = gsap.timeline({
        defaults: { ease: "none" }
      });

      tl.to(item, {
        yPercent: parallaxY,
        scrollTrigger: {
          trigger: item,
          start: "clamp(top bottom)",
          end: "clamp(bottom center)",
          scrub: 1,
        }
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
      nextEl: '#work-next',
      prevEl: '#work-prev',
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
      },
      992: {
        spaceBetween: 28,
      }
    }
  });
}

// --- MARQUEE
function marquee({ sectionSelector, marqueeSelector, marqueeListSelector, duration }) {
  if (
    typeof sectionSelector !== "string" ||
    typeof marqueeSelector !== "string" ||
    typeof marqueeListSelector !== "string" ||
    typeof duration !== "number"
  ) return;

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
  if (!sliderEl) return;

  const sliderMain = new Swiper(sliderEl, {
    slidesPerView: "auto",
    speed: 600,
    grabCursor: true,
    effect: "cards",
    cardsEffect: {
      perSlideOffset: 5,
      perSlideRotate: 5
    },
    navigation: {
      nextEl: '#exhib-next',
      prevEl: '#exhib-prev',
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
        duration: 0.5
      });
    },
    onLeaveBack: () => {
      gsap.to(section, {
        background: initialBackground,
        color: initialColor,
        duration: 0.5
      });
    }
  });
}

// --- HOME TECH PHONE ANIMATION
function homeTechPhoneAnimation() {
  const section = document.querySelector(".c-section.hm-tech");
  if (!section) return;

  gsap.from(".c-img-contain.hm-tech-phone", {
    x: "40em",
    rotation: 15,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "80% bottom",
      scrub: true,
    }
  });
}

// --- HEADER MOBILE
function headerMobile() {
  const navBtn = document.querySelector('.c-nav-btn');
  const header = document.querySelector('.c-header');
  const headerNav = document.querySelector('.c-header-nav');
  const navLinks = document.querySelectorAll('.c-header .c-nav-link');
  const btnGroup = document.querySelector('.c-btn-group.header');
  const headerInner = document.querySelector('.c-header-inner');

  if (!navBtn || !header || !headerNav || !btnGroup || !headerInner) {
    return;
  }

  function openHeader() {
    lenis.stop();
    header.classList.add('is-open');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClickOutside);
  }

  function closeHeader() {
    lenis.start();
    header.classList.remove('is-open');
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onClickOutside);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      closeHeader();
    }
  }

  function onClickOutside(e) {
    if (!headerNav.contains(e.target) && !navBtn.contains(e.target)) {
      closeHeader();
    }
  }

  navBtn.addEventListener('click', () => {
    if (header.classList.contains('is-open')) {
      closeHeader();
    } else {
      openHeader();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeHeader);
  });

  let inMobileLayout = null;

  function handleResize() {
    const isMobile = window.innerWidth <= 991;

    if (isMobile && inMobileLayout !== true) {
      headerNav.appendChild(btnGroup);
      btnGroup.style.display = 'flex';
      inMobileLayout = true;
    } else if (!isMobile && inMobileLayout !== false) {
      headerInner.appendChild(btnGroup);
      btnGroup.style.display = ''; // reset to original
      inMobileLayout = false;
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();
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
    duration: window.innerWidth <= 479 ? 40 : 60
  });
  if (homePage) {
    homeLoader();
  }
}

init();

// --------------- MATCHMEDIA (DESKTOP) ---------------
mm.add("(min-width: 992px)", () => {
  wordGlyphHover();
  homeGalleryScrollIntoView();
  homeTechPhoneAnimation();
  return () => {
    //
  };
});

// --------------- MATCHMEDIA (TABLET AND MOBILE) ---------------
mm.add("(max-width: 991px)", () => {
  return () => {
    //
  };
});
