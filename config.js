/* ============================================================================
   🎂 THE ULTIMATE BIRTHDAY EXPERIENCE — CONFIGURATION FILE
   ============================================================================
   This is the ONLY file you need to edit to personalize the entire website.
   Nothing in index.html, styles.css, or script.js is hardcoded.

   HOW TO ADD PHOTOS
   - Put image files inside an /assets folder (create it next to this file).
   - Set the "src" field to "assets/yourfile.jpg".
   - Leave "src" as "" to show an elegant placeholder instead.

   HOW TO ADD MEMORIES
   - Copy one object inside CONFIG.memories.items and paste as a new entry.
   - A new memory card is generated automatically — no limit.

   HOW TO ADD SONGS
   - Copy one object inside CONFIG.music.playlist and paste as a new entry.
   ========================================================================== */

const CONFIG = {

  // ── PERSONAL DETAILS ──────────────────────────────────────────────────
  person: {
    name: "Diksha",
    nickname: "Madam Ji",
    birthdayDate: "2006-07-25",       // YYYY-MM-DD
    age: 20,
    zodiac: "Leo ♌",                  // set to "" to hide
    favorites: {
      color: "Lavender Pink 🌸",
      flower: "Peony & Rose 🌹",
      animal: "Cute Panda & Cat 🐼🐱",
      food: "Ramen & Pizza 🍜🍕",
      dessert: "Chocolate Tiramisu 🍰",
      chocolate: "Dark Chocolate Truffles 🍫",
      drink: "Iced Caramel Macchiato 🥤",
      movie: "Spirited Away 🎬",
      anime: "Your Name 📺",
      song: "Perfect - Ed Sheeran 🎵",
      singer: "Arijit Singh 🎤",
      quote: "\"Tere muskuraane se hi meri duniya mein roshni hai.\"",
      emoji: "💖"
    },
    memory: "2024 mein jab hum pehli baar mile the, tab se lekar aaj tak har ek din tumne magical bana diya!",
    hobbies: ["Painting 🎨", "Late-night chats 🌙", "Listening to songs 🎧", "Journaling ✍️", "Stargazing ⭐"],
    personalityTraits: ["Dil ki saaf 💖", "Super Cute 😊", "Stubbornly kind 🌸", "Effortlessly funny 😂", "Pure Magic ✨"]
  },

  // ── THEME / COLORS ─────────────────────────────────────────────────────
  theme: {
    defaultMode: "dark",               // "light" or "dark"
    colors: {
      primary: "#FF6B9D",           // rose — buttons, headings, accents
      secondary: "#FFB347",           // warm gold — secondary highlights
      accent: "#C084FC",           // lilac/purple — glows, highlights
      tertiary: "#67E8F9",           // cyan — extra pop
      bgStartLight: "#FFF5F7",
      bgEndLight: "#FDE8EF",
      bgStartDark: "#0F0A1A",
      bgEndDark: "#1A0E2E",
      textLight: "#3D2B3D",
      textDark: "#F5E6F0",
      cardLight: "rgba(255, 255, 255, 0.7)",
      cardDark: "rgba(255, 255, 255, 0.06)"
    }
  },

  // ── HERO / COVER ───────────────────────────────────────────────────────
  hero: {
    heading: "Happy Birthday, Diksha! ✨",
    subheading: "One more year of being the best part of everyone's story. ✨",
    coverImage: { src: "", alt: "Cover photo" },
    heroImage: { src: "", alt: "Hero photo" },
    heroGif: { src: "https://i.giphy.com/MDJ9Ibxa5ev5p9qxyV.gif", alt: "Mochi Cat Candy Sticker" }
  },

  // ── STORY MODE ─────────────────────────────────────────────────────────
  story: {
    giftBoxLabel: "Tap the gift 🎁",
    giftBoxHint: "there's something special inside",
    musicPromptText: "🔊 turn up your volume",
    slides: [
      {
        emoji: "😍",
        lines: ["Hii you", "yes, you", "reading this right now"],
        gif: "https://i.giphy.com/vFKqnCdLPNOKc.gif"
      },
      {
        emoji: "🌤️",
        lines: ["Hope today's been", "treating you soft", "and a little bit magical"],
        gif: "https://i.giphy.com/ICOgUNjpvO0PC.gif"
      },
      {
        emoji: "🎂",
        lines: ["Because today isn't", "just any day...", "it's YOUR day!"],
        gif: "https://i.giphy.com/CjmvTCZf2U3p09Cn0h.gif"
      },
      {
        emoji: "🥹",
        lines: ["So I made you", "this whole tiny website", "instead of just saying it"],
        gif: "https://i.giphy.com/B9DP553b3Pzle.gif"
      },
      {
        emoji: "💖",
        lines: ["Thank you for being", "exactly who you are", "— don't ever change that!"],
        gif: "https://i.giphy.com/JPPN7pfe4v2RHNGLqV.gif"
      },
      {
        emoji: "🎉",
        lines: ["okay okay", "I'll stop stalling", "keep tapping..."],
        gif: "https://i.giphy.com/lJ0JGfNBr3up83yQTk.gif"
      }
    ],
    finalSlide: {
      emoji: "🎉💖",
      heading: "Happy Birthday!",
      sub: "now go see the rest 👇",
      buttonLabel: "Open your page ✨",
      gif: "https://i.giphy.com/CjmvTCZf2U3p09Cn0h.gif"
    }
  },

  // ── TEXT CONTENT ───────────────────────────────────────────────────────
  messages: {
    birthdayWishes: [
      {
        front: "May this year hand you every soft, golden thing you've been hoping for, Diksha.",
        back: "Diksha, you bring so much warmth into the world. Never forget how truly precious you are! ✨💖 (Tap again to flip back)",
        emoji: "🌸",
        backEmoji: "💌",
        color: "#FF5E8E"
      },
      {
        front: "Here's to more laughter, late-night talks, and endless coffee runs with you, Diksha!",
        back: "Every moment with you Diksha is a treasure. So lucky to celebrate you today! 🥳🎉 (Tap again to flip back)",
        emoji: "🎉",
        backEmoji: "🎁",
        color: "#FFB703"
      },
      {
        front: "The world got a whole lot brighter and happier the day you were born, Diksha.",
        back: "Diksha, your smile can literally cure a bad day. Keep shining your beautiful light! 🌟💕 (Tap again to flip back)",
        emoji: "✨",
        backEmoji: "⭐",
        color: "#C084FC"
      },
      {
        front: "I hope your year is filled with moments that make your heart dance, Diksha.",
        back: "To the most genuine & amazing soul — may all your secret wishes come true, Diksha! 💫🎂 (Tap again to flip back)",
        emoji: "💫",
        backEmoji: "🎀",
        color: "#7DD3FC"
      },
      {
        front: "You deserve every beautiful thing, every smile, and all the love in the world, Diksha.",
        back: "Diksha, thank you for being you — soft, funny, kind, and absolutely unforgettable! 🌹💖 (Tap again to flip back)",
        emoji: "🌹",
        backEmoji: "🧸",
        color: "#FF85A2"
      }
    ],
    reasonsYoureSpecial: [
      "You remember the small things — how people take their coffee, what made them nervous last week.",
      "You make ordinary Tuesdays feel like something worth showing up for.",
      "You say 'I'm proud of you' out loud, which is rarer than it should be.",
      "You've never once made someone feel small for asking a question.",
      "You still send good morning texts. In this economy.",
      "Your laugh is literally contagious. There's no cure.",
      "You have this way of making everything feel safe."
    ],
    compliments: [
      "Certified professional at making people feel at home 🏡",
      "Your laugh is a public good 😂",
      "You have never met a plant you didn't try to save 🌱",
      "Emotionally intelligent AND remembers everyone's birthday 🧠",
      "Walking, talking serotonin boost 💊",
      "10/10 would trust you with my Netflix password 🔐"
    ],
    finalGoodbye: "That's the whole scrapbook — for now. Thank you for another year of letting us love you. Go blow out those candles. 🕯️✨",
    hiddenMessages: [
      "psst. you found one. 🫶",
      "okay but you ARE the surprise ✨",
      "confetti looks better on you 🎉",
      "yes, we're still talking about your birthday 🎂",
      "you're literally glowing right now ✨",
      "this message self-destructs in 3... 2... just kidding 💖"
    ],
    popupMessages: [
      "somebody's having a good birthday 👀",
      "click around, there's more where that came from ✨",
      "we made this because you deserve a whole production 🎬",
      "hey, you're doing amazing sweetie 💅",
      "warning: excessive cuteness ahead 🧸"
    ],
    randomCuteMessages: [
      "You make the world softer just by being in it 🌸",
      "Friendly reminder: you're someone's reason to smile today 😊",
      "If you were a season, you'd be spring 🌷",
      "Your vibe is immaculate, just so you know ✨",
      "The universe really said 'let me make something perfect' 💫"
    ]
  },

  // ── BIRTHDAY WISHES SECTION ───────────────────────────────────────────
  birthdayWishesSection: {
    eyebrow: "from the heart",
    heading: "Birthday Wishes For You 🎂",
    subheading: "Every single one of these is meant for you."
  },

  // ── LOVE LETTER ────────────────────────────────────────────────────────
  loveLetter: {
    title: "A Letter, Just for You 💌",
    pages: [
      "Dear you,\n\nI wanted to write this down before the day gets loud with cake and candles, because some things are easier to say on paper.",
      "You have this way of making people feel like they matter — really matter, not just as a courtesy. I've watched you do it for strangers. I've felt it myself more times than I can count.",
      "So today isn't just about another year passing. It's a small thank-you for every version of you I've gotten to know so far, and an excited hello to whoever you're becoming next.",
      "Happy birthday. I hope this year is unreasonably kind to you.\n\nWith all my love, always. 💖"
    ]
  },

  // ── TIMELINE ───────────────────────────────────────────────────────────
  timeline: [
    { year: "2024 (The Beginning)", label: "Pehli baar jab hum 2024 mein mile — 'Tere aane se zindagi gulzar ho gayi, jo baat kabhi na kahi wo baat ho gayi!' 🌸✨", emoji: "🌼" },
    { year: "Late 2024", label: "Hamari endless late-night baatein aur cute laughter... 'Teri muskaan mein chhupi hai duniya ki saari khushi.' ☕💖", emoji: "☕" },
    { year: "2025", label: "Jab hum aur kareeb aaye aur har mushkil din tumhari ek hassi se aasan ho gaya! 🌟", emoji: "🌟" },
    { year: "Early 2026", label: "Are you a magician, Diksha? Because whenever I look at you, everyone else disappears! ✨👑", emoji: "👑" },
    { year: "2026 Today (25th July)", label: "Happy Birthday Madam Ji! Khuda kare tumhare saare khwab poore hon aur hamesha aise hi muskuraati raho! 🎂🎆", emoji: "🎂" }
  ],

  // ── MEMORIES (unlimited — copy an object to add another card) ─────────
  memories: {
    sectionEyebrow: "the good stuff",
    sectionHeading: "Memories Worth Keeping 💭",
    items: [
      {
        title: "The Bookstore We Almost Didn't Find",
        date: "March 2023",
        photo: { src: "", alt: "Bookstore memory" },
        description: "Forty-five minutes of walking in the rain for a bookstore that turned out to be closed. The mango ice cream after made it worth it.",
        emoji: "📚",
        gif: "rain",
        location: "Downtown"
      },
      {
        title: "First Camping Trip",
        date: "July 2024",
        photo: { src: "", alt: "Camping memory" },
        description: "You were convinced there was a bear nearby. It was a raccoon. You still bring it up.",
        emoji: "🏕️",
        gif: "stars",
        location: "Pine Ridge"
      },
      {
        title: "The Surprise That Actually Worked",
        date: "January 2025",
        photo: { src: "", alt: "Surprise memory" },
        description: "One of maybe three surprises in history that you didn't see coming.",
        emoji: "🎉",
        gif: "confetti",
        location: ""
      },
      {
        title: "Late Night Ice Cream Run",
        date: "September 2025",
        photo: { src: "", alt: "Ice cream memory" },
        description: "2 AM. Gas station ice cream. Your best ideas come after midnight.",
        emoji: "🍦",
        gif: "sparkles",
        location: ""
      }
    ]
  },

  // ── MEDIA: PHOTOS & GALLERY ─────────────────────────────────────────────
  gallery: {
    sectionEyebrow: "exhibit a, b, and c",
    sectionHeading: "The Photo Wall 📸",
    albums: [
      {
        name: "Childhood",
        emoji: "👶",
        photos: [
          { src: "", alt: "Childhood photo 1", caption: "The gap-tooth years" },
          { src: "", alt: "Childhood photo 2", caption: "Already plotting world domination" },
          { src: "", alt: "Childhood photo 3", caption: "" }
        ]
      },
      {
        name: "Recent",
        emoji: "📱",
        photos: [
          { src: "", alt: "Recent photo 1", caption: "Main character energy" },
          { src: "", alt: "Recent photo 2", caption: "" },
          { src: "", alt: "Recent photo 3", caption: "No filter needed" }
        ]
      },
      {
        name: "Us",
        emoji: "💕",
        photos: [
          { src: "", alt: "Together photo 1", caption: "The iconic duo" },
          { src: "", alt: "Together photo 2", caption: "" }
        ]
      },
      {
        name: "Selfies",
        emoji: "🤳",
        photos: [
          { src: "", alt: "Selfie 1", caption: "Serving looks" },
          { src: "", alt: "Selfie 2", caption: "" }
        ]
      }
    ]
  },

  // ── VOICE MESSAGE (cassette player) ─────────────────────────────────────
  voiceMessage: {
    title: "A Voice Note For You 🎙️",
    audioSrc: "",                    // e.g. "assets/voice-message.mp3"
    durationLabel: "0:47",
    cassetteLabel: "side A — recorded with love"
  },

  // ── VIDEO MESSAGE (cinematic player) ─────────────────────────────────────
  videoMessage: {
    title: "One Last Thing... 🎬",
    videoSrc: "",                    // e.g. "assets/video-message.mp4"
    thumbnailSrc: "",
    subtitles: [
      { time: 0, text: "Hey... yeah, this is happening." },
      { time: 3, text: "Happy birthday, seriously." },
      { time: 6, text: "You deserve the whole world." }
    ]
  },

  // ── MUSIC PLAYER ───────────────────────────────────────────────────────
  music: {
    autoplay: false,
    loop: true,
    shuffle: false,
    defaultVolume: 0.5,
    playlist: [
      { title: "Perfect", artist: "Ed Sheeran", src: "" },
      { title: "Happy Birthday", artist: "Stevie Wonder", src: "" },
      { title: "Add another song", artist: "Artist name", src: "" }
    ]
  },

  // ── HOBBIES & TRAITS SECTION ──────────────────────────────────────────
  hobbiesSection: {
    eyebrow: "the fun file",
    heading: "Things That Make You, You ✨"
  },

  // ── REASONS SECTION ───────────────────────────────────────────────────
  reasonsSection: {
    eyebrow: "for the record",
    heading: "Reasons You're Special 💖"
  },

  // ── SURPRISES ──────────────────────────────────────────────────────────
  surprises: {
    confettiOnOpen: true,
    shootingStarWishEnabled: true,
    secretButtonEnabled: true,
    floatingHeartsOnClick: true,
    randomSparkles: true,
    teddyPopup: true,
    emotionalPopup: true,
    hiddenGiftsCount: 3,               // how many hidden gifts scattered in sections
    starWishMessage: "Make a wish upon the star... ⭐"
  },

  // ── PARTICLES ──────────────────────────────────────────────────────────
  particles: {
    enabled: true,
    sakura: true,
    hearts: true,
    sparkles: true,
    butterflies: false,                // set true for butterfly particles
    density: 25,                       // number of particles (15–40 recommended)
    speed: 0.8                         // animation speed multiplier
  },

  // ── SECTION EMOJIS (decorative floating emojis per section) ────────────
  sectionEmojis: {
    hero: ["✨", "🎂", "🎉", "💖", "⭐"],
    wishes: ["🎂", "🎉", "🎁", "🎈", "🥳"],
    favorites: ["🎨", "🌸", "🎵", "🍰", "🦊"],
    hobbies: ["🎨", "📚", "🌙", "✏️", "🎸"],
    timeline: ["🌼", "🚗", "🌟", "📸", "💫"],
    memories: ["💭", "📷", "🌈", "☁️", "🧸"],
    gallery: ["📸", "🖼️", "✨", "💕", "🎞️"],
    letter: ["💌", "💝", "🌹", "📝", "💗"],
    reasons: ["💖", "⭐", "🌟", "💫", "✨"],
    dream: ["🌸", "✈️", "🗺️", "🌏", "🌅"],
    voice: ["🎙️", "🎵", "🎶", "💿", "📻"],
    video: ["🎬", "📽️", "🎥", "🍿", "🌟"],
    finale: ["🎆", "💖", "🌙", "⭐", "🎊"]
  }
};

// Do not edit below this line
if (typeof module !== "undefined") module.exports = CONFIG;
