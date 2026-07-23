/* ============================================================================
   🎂 THE ULTIMATE BIRTHDAY EXPERIENCE — SCRIPT
   Reads everything from CONFIG (config.js). No personal data lives here.
   ========================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const c = CONFIG;

  /* =====================================================================
     THEME SYSTEM
  ===================================================================== */
  function applyTheme() {
    const root = document.documentElement;
    const t = c.theme.colors;
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--secondary", t.secondary);
    root.style.setProperty("--accent", t.accent);
    if (t.tertiary) root.style.setProperty("--tertiary", t.tertiary);
    const dark = c.theme.defaultMode === "dark";
    root.style.setProperty("--bg-start", dark ? t.bgStartDark : t.bgStartLight);
    root.style.setProperty("--bg-end", dark ? t.bgEndDark : t.bgEndLight);
    root.style.setProperty("--text", dark ? t.textDark : t.textLight);
    root.style.setProperty("--card", dark ? (t.cardDark || "rgba(255,255,255,0.06)") : (t.cardLight || "rgba(255,255,255,0.7)"));
    root.setAttribute("data-theme", dark ? "dark" : "light");
    updateThemeToggle();
  }

  function updateThemeToggle() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const t = c.theme.colors;
    const root = document.documentElement;
    root.style.setProperty("--bg-start", dark ? t.bgStartDark : t.bgStartLight);
    root.style.setProperty("--bg-end", dark ? t.bgEndDark : t.bgEndLight);
    root.style.setProperty("--text", dark ? t.textDark : t.textLight);
    root.style.setProperty("--card", dark ? (t.cardDark || "rgba(255,255,255,0.06)") : (t.cardLight || "rgba(255,255,255,0.7)"));
    $("#themeToggle").textContent = dark ? "☀️" : "🌙";
  }

  $("#themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    updateThemeToggle();
  });

  /* =====================================================================
     PHOTO SLOT HELPER — never hardcodes, always has elegant fallback
  ===================================================================== */
  function photoSlot({ src, alt, label = "📸 Add Photo", polaroid = false, caption = "", tilt, clickable = true } = {}) {
    const wrap = document.createElement("div");
    wrap.className = "photo-slot" + (polaroid ? " photo-slot--polaroid" : "");
    if (tilt !== undefined) wrap.style.setProperty("--tilt", tilt + "deg");

    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt || "";
      img.loading = "lazy";
      wrap.appendChild(img);
      if (clickable) {
        wrap.addEventListener("click", () => openLightbox(src, alt, caption));
      }
    } else {
      const span = document.createElement("span");
      span.className = "photo-slot__label";
      span.textContent = label;
      wrap.appendChild(span);
    }

    if (polaroid && caption) {
      const cap = document.createElement("div");
      cap.className = "photo-slot__caption";
      cap.textContent = caption;
      wrap.appendChild(cap);
    }
    return wrap;
  }

  /* =====================================================================
     LIGHTBOX
  ===================================================================== */
  function openLightbox(src, alt, caption) {
    const lb = $("#lightbox");
    $("#lightboxImg").src = src;
    $("#lightboxImg").alt = alt || "";
    $("#lightboxCaption").textContent = caption || alt || "";
    lb.hidden = false;
  }

  $("#lightboxClose").addEventListener("click", () => {
    $("#lightbox").hidden = true;
  });
  $("#lightbox").addEventListener("click", (e) => {
    if (e.target === $("#lightbox")) $("#lightbox").hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#lightbox").hidden) $("#lightbox").hidden = true;
  });

  /* =====================================================================
     SECTION DECORATOR — floating emoji particles per section
  ===================================================================== */
  function seedSectionDeco() {
    $$(".section-deco").forEach((deco) => {
      const sectionId = deco.closest("[data-section]")?.dataset.section;
      const emojis = c.sectionEmojis?.[sectionId] || ["✨", "💖", "🌸"];
      for (let i = 0; i < 6; i++) {
        const span = document.createElement("span");
        span.className = "deco-emoji";
        span.textContent = emojis[i % emojis.length];
        span.style.left = (10 + Math.random() * 80) + "%";
        span.style.top = (10 + Math.random() * 80) + "%";
        span.style.animationDelay = (Math.random() * 15).toFixed(1) + "s";
        span.style.animationDuration = (15 + Math.random() * 10).toFixed(1) + "s";
        span.style.fontSize = (1 + Math.random() * 0.8).toFixed(1) + "rem";
        deco.appendChild(span);
      }
    });
  }

  /* =====================================================================
     SCROLL REVEAL — IntersectionObserver
  ===================================================================== */
  function setupScrollReveal() {
    // Add reveal class to elements
    const revealTargets = [
      ".wish-card", ".fav-card", ".hobby-tag", ".trait-tag",
      ".timeline__item", ".memory-card", ".photo-slot",
      ".cassette", ".cinema", ".dream__card", ".reasons__carousel",
      ".letterbook", ".envelope", ".hero__photo-wrap",
      ".hero__heading", ".hero__sub", ".hero__age-badge",
      ".countdown", ".section-title", ".eyebrow",
      ".hobbies__group", ".compliments__strip",
      ".finale__message", ".cta-btn"
    ];

    revealTargets.forEach((sel) => {
      $$(sel).forEach((el, i) => {
        el.classList.add("reveal");
        // Stagger delays for grid items
        const delay = Math.min(i, 4);
        if (delay > 0) el.classList.add("reveal-delay-" + delay);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    $$(".reveal").forEach((el) => observer.observe(el));
  }

  /* =====================================================================
     PARTICLE ENGINE — Canvas-based sakura / hearts / sparkles
  ===================================================================== */
  function setupParticles() {
    if (!c.particles?.enabled) return;

    const canvas = $("#particleCanvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20 - Math.random() * canvas.height;
        this.size = 8 + Math.random() * 14;
        this.speedY = (0.3 + Math.random() * 0.6) * (c.particles.speed || 0.8);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.01 + Math.random() * 0.02;
        this.opacity = 0.15 + Math.random() * 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;

        // Determine type
        const types = [];
        if (c.particles.sakura) types.push("sakura");
        if (c.particles.hearts) types.push("heart");
        if (c.particles.sparkles) types.push("sparkle");
        if (c.particles.butterflies) types.push("butterfly");
        this.type = types[Math.floor(Math.random() * types.length)] || "sparkle";
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotSpeed;
        if (this.y > canvas.height + 30) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === "sakura") {
          // Cherry blossom petal
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#FF6B9D";
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.5, this.size * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.25, this.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === "heart") {
          const s = this.size * 0.35;
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#FF6B9D";
          ctx.beginPath();
          ctx.moveTo(0, s * 0.4);
          ctx.bezierCurveTo(0, -s * 0.2, -s, -s * 0.2, -s, s * 0.2);
          ctx.bezierCurveTo(-s, s * 0.6, 0, s, 0, s * 1.2);
          ctx.bezierCurveTo(0, s, s, s * 0.6, s, s * 0.2);
          ctx.bezierCurveTo(s, -s * 0.2, 0, -s * 0.2, 0, s * 0.4);
          ctx.fill();
        } else if (this.type === "butterfly") {
          const s = this.size * 0.4;
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#C084FC";
          // Left wing
          ctx.beginPath();
          ctx.ellipse(-s * 0.4, -s * 0.2, s * 0.5, s * 0.35, -0.3, 0, Math.PI * 2);
          ctx.fill();
          // Right wing
          ctx.beginPath();
          ctx.ellipse(s * 0.4, -s * 0.2, s * 0.5, s * 0.35, 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sparkle — small diamond
          const s = this.size * 0.2;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.4, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.4, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const count = c.particles.density || 25;
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height; // start scattered
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
  }

  /* =====================================================================
     FIREWORKS ENGINE — Canvas-based interactive fireworks
  ===================================================================== */
  (function setupFireworks() {
    const canvas = $("#fireworksCanvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class FireworkParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 7;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.015 + Math.random() * 0.02;
        this.color = color || ["#FF6B9D", "#FFB347", "#C084FC", "#67E8F9", "#FFD700", "#FF4500", "#00FFCC"][Math.floor(Math.random() * 7)];
        this.size = 2 + Math.random() * 3.5;
        this.gravity = 0.09;
      }
      update() {
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    window.burstFireworks = function(x, y, count = 45) {
      const colors = ["#FF6B9D", "#FFB347", "#C084FC", "#67E8F9", "#FFD700", "#FF4500", "#00FFCC", "#FF69B4"];
      for (let i = 0; i < count; i++) {
        particles.push(new FireworkParticle(x || window.innerWidth / 2, y || window.innerHeight / 2, colors[Math.floor(Math.random() * colors.length)]));
      }
    };

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(loop);
    }
    loop();
  })();

  /* =====================================================================
     GIFT BOX + STORY MODE
  ===================================================================== */
  const giftScreen = $("#giftScreen");
  const storyScreen = $("#storyScreen");

  // Populate gift screen from config
  $("#giftName").textContent = c.person.nickname || c.person.name;
  $("#giftLabel").textContent = c.story?.giftBoxLabel || "Tap the gift";
  $("#giftHint").textContent = c.story?.giftBoxHint || "";

  // Floating decorations behind gift box
  (function seedGiftDeco() {
    const deco = $("#giftDeco");
    const emojis = ["🧸", "🌸", "💖", "🦋", "✨", "🎈", "⭐", "🎂", "🌹", "🎀"];
    for (let i = 0; i < 14; i++) {
      const span = document.createElement("span");
      span.className = "deco-item";
      span.textContent = emojis[i % emojis.length];
      span.style.left = Math.random() * 94 + "%";
      span.style.animationDelay = (Math.random() * 8).toFixed(2) + "s";
      span.style.animationDuration = (6 + Math.random() * 6).toFixed(2) + "s";
      span.style.fontSize = (1.1 + Math.random() * 1.6).toFixed(2) + "rem";
      deco.appendChild(span);
    }
  })();

  // Background music starter
  function startBackgroundMusic() {
    const track = (c.music.playlist || []).find((t) => t.src);
    const audio = $("#musicAudio");
    if (track) {
      audio.src = track.src;
      audio.loop = c.music.loop;
      audio.volume = c.music.defaultVolume ?? 0.5;
      audio.play().catch(() => {});
      $("#musicPlayer").classList.add("is-playing");
      $("#musicPlayPause").textContent = "❚❚";
      $("#musicNow").textContent = `${track.title} — ${track.artist || ""}`;
    }
  }

  // Story mode
  let storyIndex = 0;
  function renderStorySlide() {
    const slides = c.story?.slides || [];
    const progress = $("#storyProgress");
    progress.innerHTML = "";
    const totalSegs = slides.length + 1; // +1 for final
    for (let i = 0; i < totalSegs; i++) {
      const seg = document.createElement("span");
      seg.className = "story-progress__seg" + (i < storyIndex ? " is-done" : i === storyIndex ? " is-active" : "");
      progress.appendChild(seg);
    }

    const slideEl = $("#storySlide");
    if (storyIndex >= slides.length) {
      // Final slide
      const f = c.story?.finalSlide || {};
      const gifHtml = f.gif ? `<div class="story-gif-wrap"><img src="${f.gif}" alt="" class="story-gif" onerror="this.parentElement.style.display='none'" /></div>` : "";
      slideEl.innerHTML = `
        <div class="story-final">
          ${gifHtml}
          <div class="story-final__emoji">${f.emoji || "🎉"}</div>
          <h2 class="story-final__heading">${f.heading || "Happy Birthday!"}</h2>
          <p class="story-final__sub">${f.sub || ""}</p>
          <button id="storyEnter" class="cta-btn">${f.buttonLabel || "Open your page"}</button>
        </div>`;
      $("#storyEnter").addEventListener("click", enterSite);
      return;
    }

    const slide = slides[storyIndex];
    const gifHtml = slide.gif ? `<div class="story-gif-wrap"><img src="${slide.gif}" alt="" class="story-gif" onerror="this.parentElement.style.display='none'" /></div>` : "";
    slideEl.innerHTML =
      gifHtml +
      `<div class="story-emoji">${slide.emoji || "💌"}</div>` +
      slide.lines.map((line, i) => `<p class="story-line" style="animation-delay:${i * 0.2 + 0.1}s">${line}</p>`).join("");
  }

  function goStory(delta) {
    const slides = c.story?.slides || [];
    storyIndex = Math.max(0, Math.min(storyIndex + delta, slides.length));
    renderStorySlide();
  }

  // Gift box click
  $("#giftBox").addEventListener("click", (e) => {
    startBackgroundMusic();
    burstConfetti(40);
    if (window.burstFireworks) {
      window.burstFireworks(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 50);
    }
    giftScreen.classList.add("is-open");
    setTimeout(() => {
      giftScreen.style.display = "none";
      storyScreen.hidden = false;
      storyScreen.style.display = "flex";
      renderStorySlide();
    }, 600);
  });

  // Story navigation
  $("#storyTapRight").addEventListener("click", () => goStory(1));
  $("#storyTapLeft").addEventListener("click", () => goStory(-1));
  document.addEventListener("keydown", (e) => {
    if (storyScreen.hidden || storyScreen.style.display === "none") return;
    if (e.key === "ArrowRight" || e.key === " ") goStory(1);
    if (e.key === "ArrowLeft") goStory(-1);
  });
  $("#storyMute").addEventListener("click", () => {
    const audio = $("#musicAudio");
    audio.muted = !audio.muted;
    $("#storyMute").textContent = audio.muted ? "🔇" : "🔊";
  });

  // Enter main site
  function enterSite() {
    storyScreen.style.display = "none";
    storyScreen.hidden = true;
    $("#site").removeAttribute("aria-hidden");
    if (c.surprises.confettiOnOpen) burstConfetti(70);
    $("#musicPlayer").hidden = false;
    window.scrollTo(0, 0);
    // Ensure all reveal elements are visible when site opens
    setTimeout(() => {
      $$(".reveal").forEach((el) => el.classList.add("is-visible"));
      setupScrollReveal();
    }, 100);
    // Start random cute messages
    setTimeout(startRandomCuteMessages, 8000);
    // Scatter hidden gifts
    if (c.surprises.hiddenGiftsCount) scatterHiddenGifts();
  }

  /* =====================================================================
     HERO
  ===================================================================== */
  $("#heroHeading").textContent = c.hero.heading || "Happy Birthday";
  $("#heroSub").textContent = c.hero.subheading || "";
  const eyebrowParts = [c.person.nickname || c.person.name];
  if (c.person.zodiac) eyebrowParts.push(c.person.zodiac);
  $("#heroEyebrow").textContent = eyebrowParts.join(" · ");
  $("#heroAgeBadge").textContent = c.person.age ? `turning ${c.person.age} ✨` : "";
  $("#heroPhotoWrap").appendChild(
    photoSlot({ ...c.hero.heroImage, label: "📸 Add Hero Photo", polaroid: true, tilt: -3 })
  );

  // Hero Anime GIF
  (function renderHeroGif() {
    const gifWrap = $("#heroGifWrap");
    if (!gifWrap) return;
    const gifSrc = c.hero?.heroGif?.src || "https://i.giphy.com/10UeedrT5MIfPG.gif";
    const gifAlt = c.hero?.heroGif?.alt || "Anime Birthday Celebration GIF";
    gifWrap.innerHTML = `<img src="${gifSrc}" alt="${gifAlt}" loading="lazy" onerror="this.parentElement.style.display='none'" />`;
  })();

  /* =====================================================================
     BIRTHDAY WISHES
  ===================================================================== */
  (function renderWishes() {
    const cfg = c.birthdayWishesSection || {};
    if (cfg.eyebrow) $("#wishesEyebrow").textContent = cfg.eyebrow;
    if (cfg.heading) $("#wishesHeading").textContent = cfg.heading;
    if (cfg.subheading) $("#wishesSub").textContent = cfg.subheading;

    const grid = $("#wishesGrid");
    (c.messages.birthdayWishes || []).forEach((wish) => {
      const card = document.createElement("div");
      card.className = "wish-card";
      const color = wish.color || c.theme.colors.primary;
      card.style.setProperty("--wish-color", color);
      card.innerHTML = `
        <span class="wish-card__emoji">${wish.emoji || "🎂"}</span>
        <p class="wish-card__text">${typeof wish === "string" ? wish : wish.text}</p>`;
      const emojiEl = card.querySelector(".wish-card__emoji");
      if (emojiEl) emojiEl.style.filter = `drop-shadow(0 4px 12px ${color}40)`;
      card.style.cssText += `border-top: 3px solid ${color}; `;
      grid.appendChild(card);
    });
  })();

  /* =====================================================================
     FAVORITES GRID
  ===================================================================== */
  (function renderFavorites() {
    const grid = $("#favoritesGrid");
    const emojiMap = {
      color: "🎨", flower: "🌸", animal: "🦊", food: "🍜", dessert: "🍰",
      chocolate: "🍫", drink: "🥤", movie: "🎬", anime: "📺", song: "🎵",
      singer: "🎤", quote: "💬", emoji: "😊"
    };
    Object.entries(c.person.favorites).forEach(([key, value]) => {
      if (!value) return;
      const card = document.createElement("div");
      card.className = "fav-card";
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      card.innerHTML = `
        <div class="fav-card__emoji">${emojiMap[key] || "✨"}</div>
        <div class="fav-card__label">${label}</div>
        <div class="fav-card__value">${value}</div>`;
      grid.appendChild(card);
    });
  })();

  /* =====================================================================
     HOBBIES & TRAITS
  ===================================================================== */
  (function renderHobbies() {
    const cfg = c.hobbiesSection || {};
    if (cfg.eyebrow) $("#hobbiesEyebrow").textContent = cfg.eyebrow;
    if (cfg.heading) $("#hobbiesHeading").textContent = cfg.heading;

    const hobbiesContainer = $("#hobbiesTags");
    const traitsContainer = $("#traitsTags");

    (c.person.hobbies || []).forEach((hobby) => {
      const tag = document.createElement("span");
      tag.className = "hobby-tag";
      tag.textContent = hobby;
      hobbiesContainer.appendChild(tag);
    });

    (c.person.personalityTraits || []).forEach((trait) => {
      const tag = document.createElement("span");
      tag.className = "trait-tag";
      tag.textContent = trait;
      traitsContainer.appendChild(tag);
    });
  })();

  /* =====================================================================
     TIMELINE
  ===================================================================== */
  (function renderTimeline() {
    const track = $("#timelineTrack");
    (c.timeline || []).forEach((item) => {
      const div = document.createElement("div");
      div.className = "timeline__item";
      div.innerHTML = `
        <div class="timeline__emoji">${item.emoji || "⭐"}</div>
        <div class="timeline__year">${item.year}</div>
        <div class="timeline__label">${item.label}</div>`;
      track.appendChild(div);
    });
  })();

  /* =====================================================================
     MEMORIES — unlimited
  ===================================================================== */
  (function renderMemories() {
    const cfg = c.memories || {};
    if (cfg.sectionEyebrow) $("#memoriesEyebrow").textContent = cfg.sectionEyebrow;
    if (cfg.sectionHeading) $("#memoriesHeading").textContent = cfg.sectionHeading;

    const grid = $("#memoriesGrid");
    (cfg.items || []).forEach((mem) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      const slot = photoSlot({
        ...mem.photo,
        label: "📸 Add Memory Photo",
        polaroid: true,
        tilt: (Math.random() * 6 - 3).toFixed(1),
        caption: ""
      });
      card.appendChild(slot);

      const meta = [mem.date, mem.location].filter(Boolean).join(" · ");
      const info = document.createElement("div");
      info.innerHTML = `
        <div class="memory-card__title">${mem.emoji || "💭"} ${mem.title}</div>
        <div class="memory-card__meta">${meta}</div>
        <div class="memory-card__desc">${mem.description || ""}</div>`;
      card.appendChild(info);
      grid.appendChild(card);
    });
  })();

  /* =====================================================================
     GALLERY — tabs per album
  ===================================================================== */
  (function renderGallery() {
    const cfg = c.gallery || {};
    if (cfg.sectionEyebrow) $("#galleryEyebrow").textContent = cfg.sectionEyebrow;
    if (cfg.sectionHeading) $("#galleryHeading").textContent = cfg.sectionHeading;

    const tabsEl = $("#galleryTabs");
    const gridEl = $("#galleryGrid");
    const albums = cfg.albums || [];

    function showAlbum(idx) {
      gridEl.innerHTML = "";
      (albums[idx].photos || []).forEach((p) => {
        const slot = photoSlot({
          ...p,
          label: "📸 Add Photo",
          polaroid: true,
          caption: p.caption,
          tilt: (Math.random() * 6 - 3).toFixed(1)
        });
        gridEl.appendChild(slot);
      });
      $$(".gallery__tab", tabsEl).forEach((t, i) => t.classList.toggle("is-active", i === idx));

      // Reattach reveal to new items
      $$(".photo-slot", gridEl).forEach((el, i) => {
        el.classList.add("reveal");
        if (i > 0) el.classList.add("reveal-delay-" + Math.min(i, 4));
        setTimeout(() => el.classList.add("is-visible"), 50 + i * 80);
      });
    }

    albums.forEach((album, i) => {
      const btn = document.createElement("button");
      btn.className = "gallery__tab";
      btn.textContent = (album.emoji ? album.emoji + " " : "") + album.name;
      btn.addEventListener("click", () => showAlbum(i));
      tabsEl.appendChild(btn);
    });
    if (albums.length) showAlbum(0);
  })();

  /* =====================================================================
     LOVE LETTER — envelope + typewriter
  ===================================================================== */
  (function setupLetter() {
    $("#letterTitle").textContent = c.loveLetter.title || "A Letter, Just for You 💌";
    const envelope = $("#envelope");
    const book = $("#letterbook");
    const pageEl = $("#letterPage");
    const pageNum = $("#letterPageNum");
    let page = 0;
    let typing = null;

    function typewrite(text) {
      clearInterval(typing);
      pageEl.innerHTML = "";
      let i = 0;
      const textSpan = document.createElement("span");
      const cursorSpan = document.createElement("span");
      cursorSpan.className = "typewriter-cursor";
      cursorSpan.textContent = "✍️";
      pageEl.appendChild(textSpan);
      pageEl.appendChild(cursorSpan);

      typing = setInterval(() => {
        textSpan.textContent = text.slice(0, i);
        i++;
        if (i > text.length) {
          clearInterval(typing);
          cursorSpan.style.display = "none";
        }
      }, 16);
    }

    function showPage(i) {
      const pages = c.loveLetter.pages || [];
      page = Math.max(0, Math.min(i, pages.length - 1));
      typewrite(pages[page] || "");
      pageNum.textContent = `page ${page + 1} of ${pages.length}`;
    }

    envelope.addEventListener("click", (e) => {
      if (envelope.classList.contains("is-open")) return;
      envelope.classList.add("is-open");
      burstConfetti(45);
      if (window.burstFireworks) {
        window.burstFireworks(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 55);
      }
      setTimeout(() => {
        book.hidden = false;
        showPage(0);
      }, 600);
    });

    $("#letterPrev").addEventListener("click", () => showPage(page - 1));
    $("#letterNext").addEventListener("click", () => showPage(page + 1));
  })();

  /* =====================================================================
     REASONS CAROUSEL + COMPLIMENTS
  ===================================================================== */
  (function setupReasons() {
    const cfg = c.reasonsSection || {};
    if (cfg.eyebrow) $("#reasonsEyebrow").textContent = cfg.eyebrow;
    if (cfg.heading) $("#reasonsHeading").textContent = cfg.heading;

    const carousel = $("#reasonsCarousel");
    const reasons = c.messages.reasonsYoureSpecial || [];
    let idx = 0;

    function show(i) {
      idx = (i + reasons.length) % reasons.length;
      carousel.style.opacity = "0";
      setTimeout(() => {
        carousel.textContent = reasons[idx];
        carousel.style.opacity = "1";
      }, 200);
    }

    if (reasons.length) {
      show(0);
      carousel.style.cursor = "pointer";
      carousel.addEventListener("click", () => show(idx + 1));
      $("#reasonsNext").addEventListener("click", () => show(idx + 1));
      setInterval(() => show(idx + 1), 6000);
    }

    const strip = $("#complimentsStrip");
    (c.messages.compliments || []).forEach((text) => {
      const chip = document.createElement("span");
      chip.className = "compliment-chip";
      chip.textContent = text;
      strip.appendChild(chip);
    });
  })();



  /* =====================================================================
     VOICE MESSAGE — cassette player
  ===================================================================== */
  (function setupVoice() {
    $("#voiceTitle").textContent = c.voiceMessage.title || "A Voice Note For You 🎙️";
    if (c.voiceMessage.cassetteLabel) {
      $("#cassetteLabel").textContent = c.voiceMessage.cassetteLabel;
    }

    const wf = $("#waveform");
    for (let i = 0; i < 42; i++) {
      const bar = document.createElement("span");
      bar.style.animationDelay = (i * 0.04).toFixed(2) + "s";
      wf.appendChild(bar);
    }

    const audio = $("#voiceAudio");
    const cassette = $("#cassette");
    const playBtn = $("#voicePlay");
    const timeEl = $("#voiceTime");
    const durationLabel = c.voiceMessage.durationLabel || "0:00";

    if (c.voiceMessage.audioSrc) audio.src = c.voiceMessage.audioSrc;
    timeEl.textContent = `0:00 / ${durationLabel}`;

    playBtn.addEventListener("click", () => {
      if (!c.voiceMessage.audioSrc) {
        showPopup("add an audio file in config.js to hear this 🎙️");
        return;
      }
      if (audio.paused) {
        audio.play();
        cassette.classList.add("is-playing");
        playBtn.textContent = "❚❚";
      } else {
        audio.pause();
        cassette.classList.remove("is-playing");
        playBtn.textContent = "▶";
      }
    });

    audio.addEventListener("timeupdate", () => {
      const mins = Math.floor(audio.currentTime / 60);
      const secs = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
      timeEl.textContent = `${mins}:${secs} / ${durationLabel}`;
    });
    audio.addEventListener("ended", () => {
      cassette.classList.remove("is-playing");
      playBtn.textContent = "▶";
    });
  })();

  /* =====================================================================
     VIDEO MESSAGE — cinema player
  ===================================================================== */
  (function setupVideo() {
    $("#videoTitle").textContent = c.videoMessage.title || "One Last Thing... 🎬";
    const cinema = $("#cinema");
    const screen = $("#cinemaScreen");
    const playBtn = $("#cinemaPlay");
    const subtitleEl = $("#cinemaSubtitle");

    if (c.videoMessage.thumbnailSrc) {
      screen.style.backgroundImage = `url(${c.videoMessage.thumbnailSrc})`;
    }

    let videoEl = null;

    playBtn.addEventListener("click", () => {
      if (!c.videoMessage.videoSrc) {
        showPopup("add a video file in config.js to watch this 🎬");
        return;
      }
      cinema.classList.add("is-playing");
      if (!videoEl) {
        videoEl = document.createElement("video");
        videoEl.src = c.videoMessage.videoSrc;
        videoEl.controls = true;
        videoEl.style.cssText = "width:100%;height:100%;object-fit:cover;";
        screen.innerHTML = "";
        screen.appendChild(videoEl);

        videoEl.addEventListener("timeupdate", () => {
          const subs = c.videoMessage.subtitles || [];
          const active = [...subs].reverse().find((s) => videoEl.currentTime >= s.time);
          subtitleEl.textContent = active ? active.text : "";
        });

        // Pause music when video plays
        videoEl.addEventListener("play", () => {
          const musicAudio = $("#musicAudio");
          if (!musicAudio.paused) {
            musicAudio.pause();
            $("#musicPlayer").classList.remove("is-playing");
            videoEl._musicWasPlaying = true;
          }
        });
        videoEl.addEventListener("pause", () => {
          if (videoEl._musicWasPlaying) {
            const musicAudio = $("#musicAudio");
            musicAudio.play().catch(() => {});
            $("#musicPlayer").classList.add("is-playing");
            videoEl._musicWasPlaying = false;
          }
        });
      }
      videoEl.play();
    });
  })();

  /* =====================================================================
     MUSIC PLAYER — floating, playlist-driven, with progress
  ===================================================================== */
  (function setupMusic() {
    const player = $("#musicPlayer");
    const toggle = $("#musicToggle");
    const audio = $("#musicAudio");
    const playPause = $("#musicPlayPause");
    const nowEl = $("#musicNow");
    const listEl = $("#musicPlaylist");
    const volume = $("#musicVolume");
    const progressEl = $("#musicProgress");
    let idx = 0;
    let shuffle = c.music.shuffle;

    const playlist = (c.music.playlist || []).filter((t) => t.title);
    audio.loop = false;
    volume.value = c.music.defaultVolume ?? 0.5;
    audio.volume = volume.value;

    function renderList() {
      listEl.innerHTML = "";
      playlist.forEach((track, i) => {
        const li = document.createElement("li");
        li.textContent = `${track.title} — ${track.artist || ""}`;
        li.className = i === idx ? "is-active" : "";
        li.addEventListener("click", () => loadTrack(i, true));
        listEl.appendChild(li);
      });
    }

    function loadTrack(i, autoplay) {
      if (!playlist.length) return;
      idx = (i + playlist.length) % playlist.length;
      const track = playlist[idx];
      nowEl.textContent = track.src ? `${track.title} — ${track.artist || ""}` : `${track.title} (no file)`;
      if (track.src) audio.src = track.src;
      renderList();
      if (autoplay && track.src) play();
    }

    function play() {
      if (!audio.src) {
        showPopup("add a song file in config.js to play music 🎵");
        return;
      }
      audio.play().catch(() => {});
      player.classList.add("is-playing");
      playPause.textContent = "❚❚";
    }
    function pause() {
      audio.pause();
      player.classList.remove("is-playing");
      playPause.textContent = "▶";
    }

    toggle.addEventListener("click", () => player.classList.toggle("is-open"));
    playPause.addEventListener("click", () => (audio.paused ? play() : pause()));
    $("#musicNext").addEventListener("click", () => {
      loadTrack(shuffle ? Math.floor(Math.random() * playlist.length) : idx + 1, true);
    });
    $("#musicPrev").addEventListener("click", () => loadTrack(idx - 1, true));
    $("#musicShuffle").addEventListener("click", (e) => {
      shuffle = !shuffle;
      e.currentTarget.style.opacity = shuffle ? "1" : "0.4";
    });
    volume.addEventListener("input", () => (audio.volume = volume.value));

    // Progress bar
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        progressEl.style.width = (audio.currentTime / audio.duration * 100) + "%";
      }
    });

    audio.addEventListener("ended", () => {
      if (c.music.loop && playlist.length === 1) {
        audio.currentTime = 0;
        audio.play();
      } else {
        loadTrack(shuffle ? Math.floor(Math.random() * playlist.length) : idx + 1, true);
      }
    });

    if (playlist.length) loadTrack(0, false);
    if (c.music.autoplay) play();
  })();

  /* =====================================================================
     FINALE
  ===================================================================== */
  $("#finaleName").textContent = c.person.nickname || c.person.name;
  $("#finaleMessage").textContent = c.messages.finalGoodbye || "";
  $("#watchAgain").addEventListener("click", () => {
    burstConfetti(60);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      storyIndex = 0;
      giftScreen.style.display = "flex";
      giftScreen.classList.remove("is-open");
      storyScreen.style.display = "none";
      storyScreen.hidden = true;
      $("#site").setAttribute("aria-hidden", "true");
      $("#musicPlayer").hidden = true;
      // Reset reveal classes on site so next entrance animates freshly!
      $$(".reveal").forEach((el) => el.classList.remove("is-visible"));
    }, 600);
  });

  /* =====================================================================
     SURPRISES — floating hearts, confetti, secret button, modals, stars
  ===================================================================== */
  const floatLayer = $("#floatLayer");
  const surpriseEmojis = ["💖", "✨", "🌸", "🦋", "⭐", "💕", "🌹", "🎀"];

  function spawnFloatie(x, y, emoji) {
    const el = document.createElement("span");
    el.className = "floatie";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.textContent = emoji || surpriseEmojis[Math.floor(Math.random() * surpriseEmojis.length)];
    floatLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  // Floating hearts & fireworks on click
  if (c.surprises.floatingHeartsOnClick) {
    document.addEventListener("click", (e) => {
      if (giftScreen.contains(e.target) || storyScreen.contains(e.target)) return;
      if (e.target.closest(".music-player") || e.target.closest(".lightbox") || e.target.closest(".surprise-modal")) return;
      if (Math.random() < 0.3) {
        spawnFloatie(e.clientX + (Math.random() - 0.5) * 20, e.clientY);
      }
      if (Math.random() < 0.2 && window.burstFireworks) {
        window.burstFireworks(e.clientX, e.clientY, 25);
      }
    });
  }

  // Confetti burst
  function burstConfetti(count) {
    const colors = [c.theme.colors.primary, c.theme.colors.secondary, c.theme.colors.accent, c.theme.colors.tertiary || "#67E8F9"];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (1.8 + Math.random() * 1.5) + "s";
      piece.style.animationDelay = (Math.random() * 0.3) + "s";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.width = (5 + Math.random() * 8) + "px";
      piece.style.height = (8 + Math.random() * 10) + "px";
      floatLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove());
    }
  }

  // Popup toast
  function showPopup(text) {
    const toast = document.createElement("div");
    toast.className = "popup-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-shown"));
    setTimeout(() => {
      toast.classList.remove("is-shown");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Secret button
  if (c.surprises.secretButtonEnabled) {
    let secretClickCount = 0;
    $("#secretButton").addEventListener("click", (e) => {
      secretClickCount++;
      const messages = c.messages.hiddenMessages || [];
      if (messages.length) {
        showPopup(messages[Math.floor(Math.random() * messages.length)]);
      }
      burstConfetti(20);
      if (window.burstFireworks) window.burstFireworks(e.clientX, e.clientY, 45);

      // After multiple clicks, show teddy popup
      if (secretClickCount % 5 === 0 && c.surprises.teddyPopup) {
        showSurpriseModal("🧸", "You found the secret teddy! You're officially the best birthday explorer. 🎉💖");
      }
    });
  } else {
    $("#secretButton").style.display = "none";
  }

  // Surprise modal
  function showSurpriseModal(emoji, text) {
    const modal = $("#surpriseModal");
    $("#surpriseEmoji").textContent = emoji || "🧸";
    $("#surpriseText").textContent = text || "";
    modal.hidden = false;
    burstConfetti(30);
    if (window.burstFireworks) window.burstFireworks(window.innerWidth / 2, window.innerHeight / 3, 55);
  }

  $("#surpriseClose").addEventListener("click", () => {
    $("#surpriseModal").hidden = true;
  });

  // Shooting stars
  if (c.surprises.shootingStarWishEnabled) {
    setInterval(() => {
      if (giftScreen.style.display !== "none") return;
      if (Math.random() > 0.6) {
        const star = document.createElement("div");
        star.className = "shooting-star";
        star.style.left = (55 + Math.random() * 35) + "vw";
        star.style.top = (5 + Math.random() * 25) + "vh";
        floatLayer.appendChild(star);
        star.addEventListener("animationend", () => star.remove());
      }
    }, 5000);
  }

  // Popup messages — spaced out, never spammy
  const popups = c.messages.popupMessages || [];
  if (popups.length) {
    let shown = 0;
    const popupTimer = setInterval(() => {
      if (shown >= popups.length || giftScreen.style.display !== "none") return;
      showPopup(popups[shown]);
      shown++;
      if (shown >= popups.length) clearInterval(popupTimer);
    }, 18000);
  }

  // Random cute messages
  function startRandomCuteMessages() {
    const messages = c.messages.randomCuteMessages || [];
    if (!messages.length) return;
    let msgIdx = 0;
    setInterval(() => {
      if (giftScreen.style.display !== "none") return;
      const cuteEl = $("#cuteMessage");
      const textEl = $("#cuteText");
      textEl.textContent = messages[msgIdx % messages.length];
      cuteEl.hidden = false;
      setTimeout(() => {
        cuteEl.hidden = true;
      }, 4000);
      msgIdx++;
    }, 25000);
  }

  // Scatter hidden gift buttons in sections
  function scatterHiddenGifts() {
    const sections = $$("#site .page");
    const giftCount = Math.min(c.surprises.hiddenGiftsCount || 0, sections.length);
    const usedSections = new Set();

    for (let i = 0; i < giftCount; i++) {
      let sIdx;
      do {
        sIdx = Math.floor(Math.random() * sections.length);
      } while (usedSections.has(sIdx));
      usedSections.add(sIdx);

      const gift = document.createElement("button");
      gift.className = "secret-btn";
      gift.style.position = "absolute";
      gift.style.right = (8 + Math.random() * 12) + "%";
      gift.style.bottom = (10 + Math.random() * 20) + "%";
      gift.style.fontSize = "1.4rem";
      gift.style.opacity = "0.15";
      gift.textContent = ["🎁", "🎀", "💝"][i % 3];
      gift.setAttribute("aria-label", "Hidden gift");

      gift.addEventListener("click", () => {
        const msgs = [
          "You found a hidden gift! 🎁✨",
          "Surprise! You're amazing for finding this! 💖",
          "Hidden treasure unlocked! You're the real gift. 🎀"
        ];
        showSurpriseModal(["🎁", "🎀", "💝"][i % 3], msgs[i % msgs.length]);
        gift.style.display = "none";
      });

      sections[sIdx].appendChild(gift);
    }
  }

  // Emotional popup (triggers once on scroll past certain point)
  if (c.surprises.emotionalPopup) {
    let emotionalShown = false;
    window.addEventListener("scroll", () => {
      if (emotionalShown) return;
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.6) {
        emotionalShown = true;
        setTimeout(() => {
          showSurpriseModal("🥹", "Hey, you've scrolled this far... that means a lot. This whole thing was made just for you. 💖");
        }, 2000);
      }
    });
  }

  /* =====================================================================
     INIT
  ===================================================================== */
  applyTheme();
  seedSectionDeco();
  setupParticles();

  // Set page title
  document.title = `Happy Birthday ${c.person.nickname || c.person.name} ✨`;

})();
