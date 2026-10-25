import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, Sparkles, Stars, Music, VolumeX, RotateCcw, X, 
  ChevronRight, ChevronLeft, Gift, MailOpen, PartyPopper, Lock, KeyRound,
  CheckCircle2, Send, Video, Users, Play, Pause, Scale, MapPin
} from "lucide-react";

// Music: Vite finds the audio file placed directly in src/ (no filename guessing).
// Files named like "Tum Mile..." are preferred; otherwise the first audio file found is used.
// Falls back to /tum-mile.mp3 (public folder) if no audio file exists in src/.
const SRC_AUDIO_FILES = import.meta.glob("./*.{mp3,m4a,wav,ogg,aac,flac,opus,mp4,webm}", { eager: true });
const MUSIC_START_SECONDS = 15; // skip the first 15 seconds of the song
const MUSIC_SRC = (() => {
  // the downloaded birthday video (video_...) is not music
  const entries = Object.entries(SRC_AUDIO_FILES).filter(([name]) => !/\/video_/i.test(name));
  if (!entries.length) return "/tum-mile.mp3";
  const preferred = entries.find(([name]) => /tum/i.test(name)) || entries[0];
  const mod = preferred[1];
  return (mod && mod.default) || mod;
})();

// Video: the downloaded MP4 placed in src/ (prefers video_2026-10-25..., then any non-"Tum" video).
// Falls back to /my-video.mp4 (public folder) if none exists in src/.
const SRC_VIDEO_FILES = import.meta.glob("./*.{mp4,webm,mov}", { eager: true });
const VIDEO_SRC = (() => {
  // (exact name expected: video_2026-10-25_22-29-38.mp4; matched below without guessing)
  const entries = Object.entries(SRC_VIDEO_FILES);
  const preferred =
    entries.find(([name]) => /video_2026-10-25/i.test(name)) ||
    entries.find(([name]) => /\/video_/i.test(name)) ||
    entries.find(([name]) => !/tum/i.test(name));
  if (!preferred) return "/my-video.mp4";
  const mod = preferred[1];
  return (mod && mod.default) || mod;
})();

// Configuration & Story Content
const CONFIG = {
  name: "Supreme Court",
  from: "Tanish",
  metOn: "2021-04-05T00:00:00",
  music: MUSIC_SRC,
  videoSrc: VIDEO_SRC,
  pin: "1326",
  heroLine: "Supreme Court, aaj tumhari court mein ek chhoti si arzi hai: bas aaram se dekh lena.",
  
  // Chapter One: Memories
  moments: [
    { 
      date: "13-14 July", 
      title: "Ek anjaan number, ek jaani-pehchaani awaaz", 
      text: "Main apni zindagi mein bahut uljha hua tha. Tabhi ek anjaan number se call aaya, phir wahi call tumhare asli number se. Dil ki dhadkan badh gayi. Tumne poocha, how are you doing? Aur 2-3 ghante kab nikal gaye, pata hi nahi chala.", 
      icon: "☎️", 
      subtitle: "The Unexpected Call",
      photo: "/photo1.jpg",
      caption: "The voice that brought peace ✨"
    },
    { 
      date: "2 August", 
      title: "Naraazgi ke baad ka sukoon", 
      text: "Hamari pehli ladai hui, aur tumse doori mujhe tod gayi. Par phir sab theek hua. Raat ki baatein, tumhara samajhdaari se samjhana, mujhe sambhalna. Tab laga ki agar sukoon kahin hai, to yahin hai.", 
      icon: "🌙", 
      subtitle: "Midnight Conversations",
      photo: "/photo2.jpg",
      caption: "Late night reflections 🌌"
    },
    { 
      date: "29 September", 
      title: "Are you okay?", 
      text: "Sab kuch bikhra hua tha, tabhi tumne poocha, are you okay? Pata nahi kyu laga ki shayad ye aakhri mulaqaat hai. Par tumne pehle samjhaya, phir mujhe sambhala.", 
      icon: "🤍", 
      subtitle: "A Lifeline Call",
      photo: "/photo3.jpg",
      caption: "Always understanding & kind 🤍"
    },
    { 
      date: "4 October", 
      title: "Wo rumaal, wo Domino's", 
      text: "Main ro raha tha aur tumne mujhe rumaal diya. Phir ek hi glass mein cold drink, aur wahi baatein. Aisa laga jaise saare saal peeche chhoot gaye ho.", 
      icon: "🥤", 
      subtitle: "Warm Comfort",
      photo: "/photo4.jpg",
      caption: "Domino's & shared smiles 🍕"
    },
  ],

  // Chapter Three: Important People
  importantPeople: [
    { name: "Family & Loved Ones", relation: "Your Pillars", photo: "/family.jpg", message: "Tumhari sabse badi strength aur khushi! 🤍" },
    { name: "Best Friends", relation: "Your Crime Partners", photo: "/friends1.jpg", message: "Jo har waqt tumhare saath khade rehte hain! 🎉" },
    { name: "Special Circle", relation: "Always Cheers You Up", photo: "/friends2.jpg", message: "Tumhare chehre par muskaan laane wale log ✨" },
  ],

  // Chapter Five: Court Verdicts
  verdicts: [
    { title: "Best Listener Award 🏆", verdict: "For always asking 'How are you doing?' with genuine care.", stamp: "PASSED" },
    { title: "The Handkerchief & Comfort Order 🤍", verdict: "Guilty of providing warmth and a handkerchief when I was crying.", stamp: "ORDERED" },
    { title: "Official Momos Critic 🥟", verdict: "Certified expert in rating Chicken Momos and Baskin Robbins late-night runs.", stamp: "VERIFIED" },
  ],

  // 21 Special Heart Notes Inside the Jar 🫙💖
 // 21 Special Heart Notes Inside the Jar 🫙💖
  jar21Notes: [
    "1. You are so good by nature... itni achhi insaan ho tum. 🤍",
    "2. You are so beautiful and cute, andar aur bahar dono se! ✨",
    "3. Tum logon ki aur unke efforts ki bahot achhe se value karti ho. 🌸",
    "4. Tum sabke liye bahot respectful ho, tumhari ye baat mujhe sabse achhi lagti hai. 🙏",
    "5. Tumhari awaaz mere liye hamesha ek sukoon ka kaam karti hai. 🎙️🤍",
    "6. Tumhara chhotey-chhotey baaton par chidna aur phir mera tumhe manana... it feels so cute! 🥰",
    "7. You are that one true friend jisse main dil ki har ek baat bina soche bol sakta hun. 🤝",
    "8. I can be completely vulnerable with you, bina kisi filter ya darr ke. 🥺",
    "9. Zindagi mein log aate hain aur jaate hain, but you are a constant, and you will always be. ♾️",
    "10. Tum bahot deep emotions wali ho, with a truly sensitive and pure heart. 🤍",
    "11. You are very special to someone, aur hamesha waisi hi rahogi. ✨",
    "12. Tumhari energy aur well-being hi itni achhi hai ki bas tumhare saath rehne ka man karta hai. 🌸",
    "13. Agar poora din kitna bhi thaka hua kyun na ho, tumhare saath waqt bitate hi saari thakaan door ho jaati hai. ☕",
    "14. Tum meri sukoon ho... aur pata hai, aaj bhi jab tum meri tareef karti ho na, toh main chupke se blush karta hun! 🙈🤍",
    "15. Tumhare saath ghumna aur waqt bitana... aisa lagta hai jaise kaash ye waqt yahin ruk jaye. ⏳",
    "16. Sweeta ki tarah super cute ho tum! 🍭🥰",
    "17. Tumhara wo wala attitude... usse hamesha aise hi bacha kar rakhna, mujhe bada pasand hai! 😎✨",
    "18. Jab tum mujhe chhedti ho aur kehti ho na ki tumhe maza aata hai... sach kahu toh mujhe bhi bahot achha lagta hai! 😜",
    "19. Tum hamesha mera sabse unique part rahogi... pata nahi kyun par likhte waqt aankhein thodi nam hain, because I truly feel this from the bottom of my heart. 🥺🤍",
    "20. Tum sach mein meri humdard ho. 🕊️",
    "21. Happy 21st Birthday! 🎉 Ab tum sahi wali adult ho gayi ho, toh hamari Supreme Court ab aur bhi achhe decisions le sakti hai! ⚖️🎂"
  ],

  // Chapter Seven: Memory Spots Map
  memorySpots: [
    { place: "Domino's Outlet 🍕", spot: "4 October Memory", note: "Wo rumaal, shared cold drink aur dher saari baatein." },
    { place: "Midnight Chat Corner 🌙", spot: "2 August & Raat ki Baatein", note: "Subeh tak chalne wali baatein aur sukoon." },
    { place: "The Call Location 📞", spot: "14 July Call", note: "Anjaan number se aaya wo call jo sab badal gaya." },
  ],

  // Chapter Two: Quiz
  quiz: [
    {
      q: "Jab 4 October ko Domino's mein Tanish ro raha tha, tab Supreme Court ne kya diya tha?",
      options: ["Ek achhi advice 🗣️", "Wo Rumaal 🤍", "Extra Pizza 🍕", "Gussa 😠"],
      ans: 1,
      fact: "Sahi jawaab! Wo rumaal aur wo moments hamesha keemti rahenge."
    },
    {
      q: "Supreme Court ki sabse favorite comfort craving kya hai?",
      options: ["Chicken Momos 🥟", "Salad 🥗", "Oatmeal 🥣", "Plain Bread 🍞"],
      ans: 0,
      fact: "Of course! Chicken momos ke aage sab fail hai."
    },
    {
      q: "14 July ki raat jab Supreme Court ka call aaya, toh sabse pehle kya poocha tha?",
      options: ["Kahan ho? 📍", "How are you doing? 🤍", "Khana khaya? 🍲", "Kyun call kiya? 📞"],
      ans: 1,
      fact: "Bilkul! Uss ek chhotey se question ne poore mood ko sambhal liya tha."
    }
  ],

  // Chapter Eight: Sealed Letter
  letter: [
    "14 July ki raat jab tumhara call aaya, main apni zindagi mein bahut bikhra hua tha. Aur tumne bas poocha, 'how are you doing?' Itni si baat ne mujhe saans di.",
    "Tumne mujhe samjhaya, sambhala, aur jab main ro raha tha tab rumaal diya. Tum jaisi samajhdaar aur achhi insaan ka saath mere liye bahut keemti raha hai.",
    "Tum meri Supreme Court ho, kyunki tumhari koi baat main taal hi nahi paata. Aur tumhare saath bitaye 2-3 ghante hamesha 2 minute jaise lagte hain.",
    "Tumne mujhse kaha tha ki tum hamesha chahti ho main khush rahun. Aaj main tumse wahi kehna chahta hun, dil ki gehraai se: tum hamesha khush raho.",
  ],

  // Finale
  finale: [
    "Tumne mujhse kaha tha: 'I always want you to be happy from the bottom of my heart.'",
    "Aaj main tumse wahi kehta hun.",
    "Tum hamesha khush raho, Supreme Court. 🤍",
  ],
  closingNote: "Chahe waqt ke saath raste thode badal gaye hon, par mere dil mein tumhare liye respect aur dosti hamesha waisi hi rahegi. Thank you for being such a wonderful part of my journey."
};

// ---------------------------------------------------------------------------
// Birthday Certificate Screen (fictional, CBFC-inspired) — shown before scene 0
// ---------------------------------------------------------------------------
const CERT_RATINGS = [
  {
    id: "U",
    code: "U",
    name: "Unlimited Cuteness",
    desc: "Har umar ke liye safe: bas cuteness, muskaan aur mithaas ka unlimited stock. Zero tension, full pyaar. 🍭",
  },
  {
    id: "UA",
    code: "U/A",
    name: "Fun & Feelings",
    desc: "Thodi masti, thode jazbaat aur ek-do surprise. Dil se dekhne ki salaah di jaati hai. 🥹✨",
  },
  {
    id: "A",
    code: "A",
    name: "Absolute Drama",
    desc: "Full filmy scenes, dher saara drama aur Supreme Court ke dialogues. Birthday girl ke liye hi bana hai. 🎬🔥",
  },
];

const CERT_DETAILS = [
  { label: "Starring / Recipient", value: "Supreme Court" },
  { label: "Presented by", value: "Tanish" },
  { label: "Film title", value: "A Birthday Special" },
  { label: "Release date", value: "26 October 2026" },
  { label: "Language", value: "Hinglish" },
  { label: "Duration", value: "Until you smile" },
];

const CERT_CSS = `
.bc-root, .bc-root * { box-sizing: border-box; }
.bc-root {
  position: relative; z-index: 30; min-height: 100vh; width: 100%;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 20px 12px 32px; overflow-x: hidden;
  font-family: Georgia, "Times New Roman", serif; color: #1f3d2b;
}
.bc-wrap { width: 100%; max-width: 860px; margin: 0 auto; }
.bc-kicker {
  text-align: center; color: #fbd5de; font-style: italic;
  font-size: clamp(15px, 3.8vw, 20px); margin: 4px 0 12px;
}
.bc-paper {
  position: relative; background: #fbf8ee;
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,.8), transparent 45%),
    radial-gradient(circle at 85% 90%, rgba(214,198,150,.22), transparent 50%);
  padding: clamp(8px, 2.4vw, 16px); border-radius: 6px;
  box-shadow: 0 18px 50px rgba(0,0,0,.45);
}
.bc-frame {
  border: 1.5px solid #2f7d4f; outline: 1px solid #2f7d4f; outline-offset: -6px;
  padding: clamp(18px, 4vw, 34px) clamp(14px, 4vw, 34px);
  position: relative; overflow: hidden;
}
.bc-watermark {
  position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);
  width: min(70%, 380px); opacity: .05; pointer-events: none;
}
.bc-head { text-align: center; position: relative; }
.bc-emblem { width: clamp(46px, 11vw, 64px); height: auto; margin: 0 auto 4px; display: block; }
.bc-h-en {
  font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  font-size: clamp(11px, 3vw, 17px); line-height: 1.35; color: #1f5c38;
  overflow-wrap: anywhere;
}
.bc-h-hi { font-size: clamp(13px, 3.4vw, 18px); margin-top: 2px; color: #2f7d4f; }
.bc-rule { height: 1px; background: #2f7d4f; opacity: .55; margin: 12px 0; position: relative; }
.bc-certno {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px;
  font-size: clamp(10.5px, 2.8vw, 13px); letter-spacing: .06em; font-family: "Courier New", monospace;
  color: #2c4a38; position: relative;
}
.bc-certno b { color: #1f5c38; }
.bc-title-block { text-align: center; margin: 12px 0 6px; position: relative; }
.bc-title-sub { font-size: clamp(10.5px, 2.8vw, 13px); letter-spacing: .28em; text-transform: uppercase; color: #3d5f4a; }
.bc-title-main {
  font-size: clamp(26px, 8vw, 46px); font-weight: 700; letter-spacing: .06em;
  color: #17432b; line-height: 1.1; margin: 4px 0; overflow-wrap: anywhere;
}
.bc-title-cert {
  display: inline-block; border-top: 1px solid #2f7d4f; border-bottom: 1px solid #2f7d4f;
  padding: 5px 10px; font-size: clamp(10.5px, 3vw, 14px); letter-spacing: .18em; font-weight: 700;
  text-transform: uppercase; color: #1f5c38;
}
.bc-body {
  display: grid; grid-template-columns: 1fr 210px; gap: 18px; align-items: center;
  margin-top: 16px; position: relative;
}
.bc-details { display: grid; gap: 7px; min-width: 0; }
.bc-row {
  display: grid; grid-template-columns: 128px 1fr; gap: 8px; font-size: clamp(12.5px, 3.2vw, 15px);
  border-bottom: 1px dotted rgba(47,125,79,.45); padding-bottom: 5px; min-width: 0;
}
.bc-row span:first-child { color: #4b6b58; font-size: .86em; text-transform: uppercase; letter-spacing: .06em; padding-top: 2px; }
.bc-row span:last-child { font-weight: 700; color: #17432b; overflow-wrap: anywhere; }
.bc-stampbox { display: flex; justify-content: center; }
.bc-stamp {
  width: 190px; max-width: 100%; aspect-ratio: 1 / 1.05; border-radius: 14px;
  background: radial-gradient(circle at 30% 25%, #ffe97a, #f7c600 70%);
  border: 4px solid #1b1b1b; outline: 2px solid #f7c600; outline-offset: -9px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 10px; transform: rotate(-5deg);
  box-shadow: 0 6px 16px rgba(0,0,0,.28); color: #111;
  animation: bcPop .5s cubic-bezier(.2,1.6,.4,1);
}
.bc-stamp small { font-family: Arial, sans-serif; font-weight: 800; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }
.bc-stamp-code { font-family: Arial Black, Arial, sans-serif; font-weight: 900; font-size: clamp(46px, 13vw, 66px); line-height: 1; margin: 4px 0; }
.bc-stamp-name { font-family: Arial, sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; line-height: 1.2; overflow-wrap: anywhere; }
@keyframes bcPop { 0% { transform: rotate(-5deg) scale(.6); opacity: .2; } 100% { transform: rotate(-5deg) scale(1); opacity: 1; } }
.bc-banner {
  margin-top: 16px; text-align: center; background: #1f5c38; color: #fbf8ee; position: relative;
  font-family: Arial, sans-serif; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  font-size: clamp(9.5px, 2.6vw, 12px); padding: 8px 10px; line-height: 1.4; overflow-wrap: anywhere;
}
.bc-verdict { margin-top: 14px; text-align: center; font-style: italic; font-size: clamp(14px, 3.8vw, 18px); color: #2c4a38; position: relative; }
.bc-desc { margin: 8px auto 0; text-align: center; max-width: 560px; font-size: clamp(12px, 3.2vw, 14px); color: #4b6b58; font-family: Arial, sans-serif; line-height: 1.5; position: relative; min-height: 3em; }
.bc-sign { margin-top: 14px; text-align: right; position: relative; }
.bc-sign-name { font-style: italic; font-size: clamp(22px, 6vw, 30px); color: #17432b; line-height: 1.1; }
.bc-sign-sub { font-size: clamp(10px, 2.7vw, 12px); letter-spacing: .08em; text-transform: uppercase; color: #4b6b58; }
.bc-foot { margin-top: 14px; text-align: center; font-family: Arial, sans-serif; font-size: clamp(8.5px, 2.3vw, 10.5px); letter-spacing: .08em; color: #5b7867; text-transform: uppercase; line-height: 1.5; overflow-wrap: anywhere; position: relative; }
.bc-picker { margin-top: 18px; }
.bc-picker-title { text-align: center; color: #fbd5de; font-size: clamp(12px, 3.2vw, 14px); margin-bottom: 8px; font-family: Arial, sans-serif; letter-spacing: .06em; }
.bc-opts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.bc-opt {
  min-height: 64px; padding: 10px 6px; border-radius: 14px; cursor: pointer; text-align: center;
  background: rgba(255,255,255,.1); border: 1.5px solid rgba(255,255,255,.28); color: #ffe9ee;
  font-family: Arial, sans-serif; transition: transform .2s, background .2s, border-color .2s;
  -webkit-tap-highlight-color: transparent;
}
.bc-opt:hover { background: rgba(255,255,255,.18); }
.bc-opt:active { transform: scale(.97); }
.bc-opt.on { background: #f7c600; border-color: #fff3a8; color: #111; box-shadow: 0 0 18px rgba(247,198,0,.45); }
.bc-opt b { display: block; font-size: clamp(18px, 5vw, 22px); font-weight: 900; }
.bc-opt span { display: block; font-size: clamp(9.5px, 2.6vw, 11.5px); font-weight: 700; line-height: 1.25; margin-top: 2px; overflow-wrap: anywhere; }
.bc-enter-wrap { text-align: center; margin-top: 16px; }
.bc-enter {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 52px; padding: 14px 26px; max-width: 100%; border: 0; border-radius: 999px; cursor: pointer;
  background: linear-gradient(90deg, #fda4b4, #fbd5de, #f9a8c0); color: #4c0519;
  font-family: Arial, sans-serif; font-weight: 800; font-size: clamp(13px, 3.6vw, 15px);
  box-shadow: 0 8px 22px rgba(244,63,94,.28); transition: transform .2s;
  -webkit-tap-highlight-color: transparent;
}
.bc-enter:hover { transform: scale(1.04); }
.bc-enter:active { transform: scale(.96); }
@media (max-width: 640px) {
  .bc-body { grid-template-columns: 1fr; gap: 14px; }
  .bc-stampbox { order: -1; padding: 6px 0 4px; }
  .bc-stamp { width: 170px; }
  .bc-row { grid-template-columns: 1fr; gap: 1px; }
  .bc-sign { text-align: center; }
  .bc-certno { justify-content: center; text-align: center; }
}
@media (prefers-reduced-motion: reduce) { .bc-stamp { animation: none; } }
`;

// ---------------------------------------------------------------------------
// "A Small Disclaimer from the Director" — shown after the certificate screen
// ---------------------------------------------------------------------------
// Each paragraph is a list of segments; hl: true highlights the apology lines.
const DIRECTOR_NOTE = [
  [{ t: "Is film mein dikhaye gaye har scene, har dialogue aur har emotion ke peeche ek chhoti si koshish hai tumhare chehre par smile laane ki." }],
  [
    { t: "Agar is surprise ka koi bhi part tumhe galat lage, kisi baat se tumhare dil ko thes pahunche, ya meri kisi baat ka matlab tumhari feelings ke against chala jaaye, toh " },
    { t: "main dil se maafi chahta hoon.", hl: true },
  ],
  [{ t: "Mera intention kabhi bhi tumhe hurt karna, tum par koi pressure daalna, ya tumse kisi reaction ki expectation rakhna nahi tha. Main bas tumhare special day ko apne tareeke se thoda memorable banana chahta tha." }],
  [{ t: "Ho sakta hai har cheez perfect na ho, ho sakta hai main apni feelings ko har jagah sahi words mein express na kar paaya hoon. Lekin meri koshish ke peeche koi buri intention nahi hai—bas ek sincere wish hai ki tum khush raho aur tumhara birthday beautiful ho." }],
  [{ t: "Tumhe is surprise ko kisi particular tareeke se react karke appreciate karne ki zaroorat nahi hai. Bas ise ek chhoti si birthday wish samajhna, jo dil se banayi gayi hai." }],
  [
    { t: "Agar anjaane mein bhi koi baat buri lagi ho, toh " },
    { t: "dil se sorry.", hl: true },
    { t: " Mera intention kabhi tumhe hurt karna nahi tha. ❤️" },
  ],
];

const DC_FLOATS = [
  { e: "💖", l: "8%", d: "0s", s: 16 }, { e: "🤍", l: "22%", d: "2.5s", s: 13 },
  { e: "💕", l: "38%", d: "4.5s", s: 15 }, { e: "💗", l: "55%", d: "1.2s", s: 14 },
  { e: "💖", l: "70%", d: "3.4s", s: 17 }, { e: "🤍", l: "84%", d: "0.6s", s: 13 },
  { e: "💕", l: "93%", d: "5.2s", s: 15 },
];
const DC_DOTS = [
  { l: "12%", t: "18%", d: "0s" }, { l: "30%", t: "70%", d: "1s" }, { l: "48%", t: "12%", d: "2s" },
  { l: "66%", t: "58%", d: "0.5s" }, { l: "80%", t: "28%", d: "1.5s" }, { l: "90%", t: "80%", d: "2.5s" },
  { l: "6%", t: "52%", d: "3s" }, { l: "58%", t: "88%", d: "3.5s" },
];

const DC_CSS = `
.dc-root, .dc-root * { box-sizing: border-box; }
.dc-root { position: relative; min-height: 100vh; width: 100%; overflow-x: hidden; color: #fde7ec;
  background: radial-gradient(ellipse at 50% -10%, rgba(251,191,36,.22), transparent 55%), linear-gradient(160deg, #2a0612 0%, #4a0d24 50%, #1c050f 100%); }
.dc-grain { position: fixed; inset: 0; pointer-events: none; z-index: 5; opacity: .16; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: dcGrain .9s steps(4) infinite; }
@keyframes dcGrain { 0% { transform: translate(0,0); } 25% { transform: translate(-3%,2%); } 50% { transform: translate(2%,-3%); } 75% { transform: translate(-2%,-1%); } 100% { transform: translate(0,0); } }
.dc-vignette { position: fixed; inset: 0; pointer-events: none; z-index: 4; background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55)); }
.dc-strip { position: fixed; left: 0; right: 0; height: 36px; z-index: 1; pointer-events: none; opacity: .5;
  background-color: rgba(20,4,10,.85);
  background-image: repeating-linear-gradient(90deg, transparent 0 14px, rgba(251,191,36,.45) 14px 24px), repeating-linear-gradient(90deg, transparent 0 14px, rgba(251,191,36,.45) 14px 24px);
  background-size: 100% 7px, 100% 7px; background-position: 0 4px, 0 25px; background-repeat: repeat-x, repeat-x;
  animation: dcStrip 14s linear infinite; }
.dc-strip.top { top: 0; } .dc-strip.bot { bottom: 0; animation-direction: reverse; }
@keyframes dcStrip { from { background-position-x: 0, 0; } to { background-position-x: 240px, 240px; } }
.dc-reel { position: fixed; width: 190px; height: 190px; border-radius: 50%; z-index: 1; pointer-events: none; opacity: .28;
  border: 6px solid rgba(251,191,36,.6);
  background: radial-gradient(circle, rgba(251,191,36,.7) 0 10%, transparent 11%), radial-gradient(circle, #1a0610 0 20%, transparent 21%), repeating-conic-gradient(from 0deg, rgba(251,191,36,.5) 0 22deg, transparent 22deg 60deg);
  animation: dcSpin 40s linear infinite; }
.dc-reel.a { top: 4%; left: -70px; } .dc-reel.b { bottom: 6%; right: -70px; animation-direction: reverse; width: 220px; height: 220px; }
@keyframes dcSpin { to { transform: rotate(360deg); } }
.dc-float { position: fixed; bottom: -30px; z-index: 2; pointer-events: none; opacity: 0; animation: dcRise 11s linear infinite; }
@keyframes dcRise { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: .7; } 90% { opacity: .5; } 100% { transform: translateY(-105vh) translateX(14px); opacity: 0; } }
.dc-dot { position: fixed; width: 3px; height: 3px; border-radius: 50%; background: #fde68a; box-shadow: 0 0 8px 2px rgba(253,230,138,.7); z-index: 2; pointer-events: none; animation: dcTwinkle 4s ease-in-out infinite; }
@keyframes dcTwinkle { 0%, 100% { opacity: .1; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.4); } }
.dc-main { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 56px 14px 56px; }
.dc-back { align-self: flex-start; max-width: 720px; width: 100%; margin: 0 auto 14px; }
.dc-backbtn { display: inline-flex; align-items: center; gap: 4px; min-height: 40px; padding: 6px 12px 6px 6px; background: none; border: 0; color: #fbcfe8; font-size: 13px; cursor: pointer; font-family: Arial, sans-serif; }
.dc-backbtn:hover { color: #fff; }
.dc-card { width: 100%; max-width: 720px; margin: 0 auto; padding: clamp(22px, 5vw, 44px) clamp(16px, 5vw, 44px); border-radius: 18px;
  background: linear-gradient(180deg, rgba(60,10,30,.82), rgba(34,6,18,.88)); border: 1px solid rgba(251,191,36,.45);
  box-shadow: 0 0 0 5px rgba(251,191,36,.07), 0 0 60px rgba(251,191,36,.14), 0 24px 60px rgba(0,0,0,.55);
  backdrop-filter: blur(6px); animation: dcCard 1.4s ease both; }
@keyframes dcCard { from { opacity: 0; transform: translateY(26px) scale(.97); } to { opacity: 1; transform: none; } }
.dc-clap { text-align: center; font-family: "Courier New", monospace; font-size: clamp(9.5px, 2.6vw, 11px); letter-spacing: .32em; color: rgba(251,191,36,.8); text-transform: uppercase; }
.dc-title { text-align: center; font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: clamp(22px, 6.4vw, 36px); line-height: 1.25; margin: 10px 0 8px; color: #fff1d6; text-shadow: 0 0 22px rgba(251,191,36,.35); overflow-wrap: anywhere; }
.dc-sub { text-align: center; font-style: italic; font-family: Georgia, serif; font-size: clamp(14px, 3.8vw, 18px); color: #fbcfe8; margin-bottom: 4px; }
.dc-line { height: 1px; margin: 18px auto; width: 70%; background: linear-gradient(90deg, transparent, rgba(251,191,36,.7), transparent); }
.dc-body { font-family: Georgia, "Times New Roman", serif; font-size: clamp(14.5px, 3.9vw, 17px); line-height: 1.8; color: #fde7ec; }
.dc-body p { margin: 0 0 16px; opacity: 0; animation: dcPara 1.1s ease forwards; overflow-wrap: anywhere; }
@keyframes dcPara { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.dc-hl { color: #fbcfe8; font-weight: 700; background: linear-gradient(180deg, transparent 62%, rgba(244,114,182,.28) 62%); padding: 0 2px; text-shadow: 0 0 14px rgba(249,168,212,.45); }
.dc-sign { text-align: right; font-family: Georgia, serif; font-style: italic; color: #fde68a; font-size: clamp(14.5px, 4vw, 18px); line-height: 1.6; opacity: 0; animation: dcPara 1.1s ease forwards; }
.dc-sign small { display: block; font-style: normal; font-size: .78em; letter-spacing: .1em; color: rgba(253,230,138,.75); }
.dc-cta { margin-top: 26px; text-align: center; opacity: 0; animation: dcPara 1.1s ease forwards; }
.dc-go { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; max-width: 100%; padding: 14px 28px; border: 0; border-radius: 999px; cursor: pointer;
  font-family: Arial, sans-serif; font-weight: 800; font-size: clamp(13px, 3.6vw, 15px); color: #4c0519;
  background: linear-gradient(90deg, #fcd34d, #fbcfe8, #f9a8d4); box-shadow: 0 0 22px rgba(251,191,36,.45); transition: transform .3s, box-shadow .3s;
  animation: dcGlow 2.6s ease-in-out infinite; -webkit-tap-highlight-color: transparent; }
.dc-go:hover { transform: scale(1.05); box-shadow: 0 0 36px rgba(251,191,36,.7); }
.dc-go:active { transform: scale(.96); }
@keyframes dcGlow { 0%, 100% { box-shadow: 0 0 18px rgba(251,191,36,.35); } 50% { box-shadow: 0 0 34px rgba(251,191,36,.7); } }
@media (prefers-reduced-motion: reduce) { .dc-grain, .dc-strip, .dc-reel, .dc-float, .dc-dot, .dc-card, .dc-go { animation: none; } .dc-float { opacity: .5; } .dc-body p, .dc-sign, .dc-cta { animation: none; opacity: 1; } }
`;

function DirectorDisclaimerScreen({ onBack, onContinue }) {
  const base = 1.2; // seconds before first paragraph
  const step = 0.9;

  return (
    <div className="dc-root">
      <style>{DC_CSS}</style>

      <div className="dc-strip top" />
      <div className="dc-strip bot" />
      <div className="dc-reel a" />
      <div className="dc-reel b" />
      {DC_FLOATS.map((f, i) => (
        <span key={i} className="dc-float" style={{ left: f.l, animationDelay: f.d, fontSize: f.s }}>{f.e}</span>
      ))}
      {DC_DOTS.map((d, i) => (
        <span key={i} className="dc-dot" style={{ left: d.l, top: d.t, animationDelay: d.d }} />
      ))}
      <div className="dc-vignette" />
      <div className="dc-grain" />

      <div className="dc-main">
        <div className="dc-back">
          <button type="button" className="dc-backbtn" onClick={onBack}>
            <ChevronLeft size={18} /> Back to Certificate
          </button>
        </div>

        <div className="dc-card">
          <div className="dc-clap">🎬 Director's Note · Reel 00</div>
          <h2 className="dc-title">A Small Disclaimer from the Director 🎬❤️</h2>
          <p className="dc-sub">Before the story begins, ek chhoti si baat…</p>
          <div className="dc-line" />

          <div className="dc-body">
            {DIRECTOR_NOTE.map((para, i) => (
              <p key={i} style={{ animationDelay: `${base + i * step}s` }}>
                {para.map((seg, j) =>
                  seg.hl ? <span key={j} className="dc-hl">{seg.t}</span> : <span key={j}>{seg.t}</span>
                )}
              </p>
            ))}
          </div>

          <p className="dc-sign" style={{ animationDelay: `${base + DIRECTOR_NOTE.length * step}s` }}>
            With love and sincerity,
            <small>— The Director, Tanish 🎬</small>
          </p>

          <div className="dc-cta" style={{ animationDelay: `${base + (DIRECTOR_NOTE.length + 1) * step}s` }}>
            <button type="button" className="dc-go" onClick={onContinue}>
              I Understand, Continue ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateScreen({ rating, onRating, onEnter }) {
  const current = CERT_RATINGS.find((r) => r.id === rating) || CERT_RATINGS[0];

  return (
    <div className="bc-root bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950">
      <style>{CERT_CSS}</style>
      <div className="bc-wrap">
        <p className="bc-kicker">psst… ek chhoti si certification pehle ✨</p>

        <div className="bc-paper">
          <div className="bc-frame">
            {/* Fictional watermark emblem */}
            <svg className="bc-watermark" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#1f5c38" strokeWidth="2" />
              <path d="M50 74 C20 54 28 30 42 34 C47 36 50 40 50 40 C50 40 53 36 58 34 C72 30 80 54 50 74Z" fill="#1f5c38" />
            </svg>

            <div className="bc-head">
              <svg className="bc-emblem" viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="29" fill="#fbf8ee" stroke="#1f5c38" strokeWidth="2" />
                <circle cx="32" cy="32" r="24" fill="none" stroke="#1f5c38" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="32" y1="14" x2="32" y2="46" stroke="#1f5c38" strokeWidth="2" />
                <line x1="18" y1="22" x2="46" y2="22" stroke="#1f5c38" strokeWidth="2" />
                <path d="M14 34 L22 34 L18 24 Z M42 34 L50 34 L46 24 Z" fill="#1f5c38" />
                <path d="M14 34 Q18 40 22 34 M42 34 Q46 40 50 34" fill="none" stroke="#1f5c38" strokeWidth="1.6" />
                <path d="M32 55 C22 48 24 42 28 43 C30 43.5 32 46 32 46 C32 46 34 43.5 36 43 C40 42 42 48 32 55Z" fill="#e0436b" />
                <rect x="24" y="46" width="16" height="2" fill="#1f5c38" opacity="0" />
              </svg>
              <div className="bc-h-en">Supreme Court Birthday Certification Board</div>
              <div className="bc-h-hi">सुप्रीम कोर्ट बर्थडे सर्टिफिकेशन</div>
            </div>

            <div className="bc-rule" />

            <div className="bc-certno">
              <span>CERTIFICATE NO. <b>SC-261026</b></span>
              <span>DATE: <b>26 OCT 2026</b></span>
            </div>

            <div className="bc-title-block">
              <div className="bc-title-sub">Certificate of Birthday Film</div>
              <div className="bc-title-main">SUPREME COURT</div>
              <div className="bc-title-cert">Birthday Picture Certificate</div>
            </div>

            <div className="bc-body">
              <div className="bc-details">
                {CERT_DETAILS.map((d) => (
                  <div className="bc-row" key={d.label}>
                    <span>{d.label}</span>
                    <span>{d.value}</span>
                  </div>
                ))}
                <div className="bc-row">
                  <span>Category</span>
                  <span>{current.name}</span>
                </div>
              </div>

              <div className="bc-stampbox">
                <div className="bc-stamp" key={current.id}>
                  <small>Birthday Board Certified</small>
                  <div className="bc-stamp-code">{current.code}</div>
                  <div className="bc-stamp-name">{current.name}</div>
                </div>
              </div>
            </div>

            <div className="bc-banner">This certificate is valid for the birthday reveal only</div>

            <p className="bc-verdict">“The birthday bench recommends proceeding with a smile.”</p>
            <p className="bc-desc">{current.desc}</p>

            <div className="bc-sign">
              <div className="bc-sign-name">Tanish</div>
              <div className="bc-sign-sub">Presented with love ♡</div>
            </div>

            <div className="bc-foot">
              Fictional birthday certificate · Not an official government document
            </div>
          </div>
        </div>

        <div className="bc-picker">
          <div className="bc-picker-title">Apni rating chuno 👇</div>
          <div className="bc-opts" role="radiogroup" aria-label="Choose certification rating">
            {CERT_RATINGS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={rating === r.id}
                className={`bc-opt ${rating === r.id ? "on" : ""}`}
                onClick={() => onRating(r.id)}
              >
                <b>{r.code}</b>
                <span>{r.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bc-enter-wrap">
          <button type="button" className="bc-enter" onClick={onEnter}>
            PROCEED TO THE FILM
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sorry Letter scene (sealed envelope -> soft fade-in letter)
// ---------------------------------------------------------------------------
const SORRY_LETTER = {
  greeting: "Hey Supreme Court, 🤍",
  paragraphs: [
    "Aaj birthday ke is special din par bas ek chhoti si baat dil se kehni thi.",
    "Mujhe pata hai ki kabhi-kabhi meri wajah se tum kaafi hurt, irritated ya gussa ho jaati ho, especially mere immature behaviour ki wajah se. Shayad main har baar apni baat ya apne emotions sahi tareeke se handle nahi kar paata, aur kabhi-kabhi tumhe unnecessarily pareshan kar deta hoon.",
    "Us sab ke liye, I’m genuinely so sorry. 🥹❤️",
    "Main ye nahi keh raha ki ek sorry se sab theek ho jaata hai, bas aaj dil se maafi maangni thi. Main apne behaviour ko better karne ki koshish karunga, aur umeed hai ki dheere-dheere apni actions se bhi ye dikha paunga.",
    "Baaki sab baatein aaj ke liye side mein rakhte hain. Aaj tumhara birthday hai, toh no serious talks, no arguments—bas tumhari smile aur tumhari khushi. 🧸🎂",
    "I’m really sorry, Supreme Court. And once again, happiest birthday to you. Hamesha khush rehna. 🤍",
  ],
  sign: "— Tanish",
};

const SORRY_CSS = `
.sl-env { position: relative; width: min(86vw, 320px); height: 210px; margin: 0 auto; perspective: 900px; cursor: pointer; border: 0; padding: 0; background: none; display: block; -webkit-tap-highlight-color: transparent; }
.sl-env:hover .sl-body { transform: translateY(-3px); }
.sl-body { position: absolute; inset: 0; border-radius: 12px; background: linear-gradient(160deg, #fecdd3, #fda4af); box-shadow: 0 14px 34px rgba(0,0,0,.35); transition: transform .3s; overflow: hidden; }
.sl-fold-l, .sl-fold-r { position: absolute; inset: 0; }
.sl-fold-l { background: #fb90a3; clip-path: polygon(0 0, 0 100%, 55% 55%); opacity: .75; }
.sl-fold-r { background: #fb90a3; clip-path: polygon(100% 0, 100% 100%, 45% 55%); opacity: .75; }
.sl-fold-b { position: absolute; inset: 0; background: #fda4af; clip-path: polygon(0 100%, 100% 100%, 50% 45%); }
.sl-flap { position: absolute; top: 0; left: 0; right: 0; height: 58%; background: linear-gradient(180deg, #fb7185, #fda4af); clip-path: polygon(0 0, 100% 0, 50% 100%); transform-origin: top center; transition: transform .8s ease, opacity .4s ease .5s; border-radius: 12px 12px 0 0; }
.sl-env.open .sl-flap { transform: rotateX(180deg); opacity: 0; }
.sl-seal { position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%); font-size: 30px; transition: opacity .4s, transform .6s; filter: drop-shadow(0 2px 4px rgba(0,0,0,.25)); }
.sl-env.open .sl-seal { opacity: 0; transform: translate(-50%, -90%) scale(1.4); }
.sl-label { position: absolute; left: 0; right: 0; bottom: 14px; text-align: center; font-family: Georgia, serif; font-style: italic; color: #4c0519; font-size: clamp(14px, 4vw, 17px); text-shadow: 0 1px 0 rgba(255,255,255,.4); }
.sl-peek { position: absolute; left: 8%; right: 8%; top: 10%; height: 70%; background: #fff1f2; border-radius: 8px; transition: transform .8s ease; }
.sl-env.open .sl-peek { transform: translateY(-34px); }
.sl-tap { animation: slPulse 1.8s ease-in-out infinite; }
@keyframes slPulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
.sl-fade { animation: slFade 1.2s ease both; }
@keyframes slFade { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
.sl-line { animation: slFade 1s ease both; }
@media (prefers-reduced-motion: reduce) { .sl-fade, .sl-line, .sl-tap { animation: none; } .sl-flap, .sl-peek, .sl-seal { transition: none; } }
`;

function SorryLetterScene({ onBack, onNext, onHug }) {
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [hugged, setHugged] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setShowLetter(true), 900);
    return () => clearTimeout(t);
  }, [open]);

  const sendHug = () => {
    if (hugged) return;
    setHugged(true);
    if (onHug) onHug();
  };

  return (
    <section className="max-w-md mx-auto w-full space-y-6 text-center">
      <style>{SORRY_CSS}</style>

      <div className="space-y-1">
        <p className="font-serif italic text-2xl text-rose-200">a little note</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">Ek chhoti si baat 🧸</h2>
      </div>

      {!showLetter ? (
        <div className="py-6 space-y-5">
          <button
            type="button"
            className={`sl-env ${open ? "open" : ""}`}
            onClick={() => setOpen(true)}
            aria-label="Open the little sorry letter"
          >
            <div className="sl-body">
              <div className="sl-peek" />
              <div className="sl-fold-l" />
              <div className="sl-fold-r" />
              <div className="sl-fold-b" />
              <div className="sl-label">Ek chhoti si sorry… 🤍</div>
            </div>
            <div className="sl-flap" />
            <div className="sl-seal">💌</div>
          </button>
          <p className={`text-xs text-rose-200/70 ${open ? "" : "sl-tap"}`}>
            {open ? "Khul raha hai…" : "Tap karke kholo"}
          </p>
        </div>
      ) : (
        <div
          className="sl-fade relative text-left bg-rose-100 text-rose-950 p-6 sm:p-8 rounded-3xl shadow-2xl border border-rose-300/40 max-h-[70vh] overflow-y-auto"
          style={{ backgroundImage: "repeating-linear-gradient(transparent 0 35px, rgba(139,18,52,0.08) 36px)" }}
        >
          <h3 className="font-serif text-2xl font-bold text-rose-900 mb-4">{SORRY_LETTER.greeting}</h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-rose-950/90 font-sans">
            {SORRY_LETTER.paragraphs.map((p, i) => (
              <p key={i} className="sl-line" style={{ animationDelay: `${0.4 + i * 0.5}s` }}>{p}</p>
            ))}
          </div>

          <p
            className="sl-line font-serif italic text-xl text-rose-900 text-right mt-6"
            style={{ animationDelay: `${0.4 + SORRY_LETTER.paragraphs.length * 0.5}s` }}
          >
            {SORRY_LETTER.sign}
          </p>

          <div
            className="sl-line pt-5 text-center"
            style={{ animationDelay: `${0.8 + SORRY_LETTER.paragraphs.length * 0.5}s` }}
          >
            {!hugged ? (
              <button
                type="button"
                onClick={sendHug}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Sorry accepted? 🥹🤍
              </button>
            ) : (
              <div className="sl-fade space-y-1">
                <p className="font-serif text-lg font-bold text-rose-900">Sending you a little hug 🧸</p>
                <p className="text-xs text-rose-900/60 font-sans">Koi jawaab zaroori nahi. Bas muskurao. 🤍</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={onNext}
          className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
        >
          Go to Finale <ChevronRight size={18} className="inline" />
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Virtual Teddy Surprise (pure CSS teddy, optional mini-surprise on Scene 0)
// ---------------------------------------------------------------------------
const TEDDY_MESSAGE =
  "A little teddy hug for you, Supreme Court 🧸💕. Jab bhi tumhe hug chahiye ho, samajh lena ki Tanish ki taraf se ek warm, tight wala virtual hug tumhare paas hai. You deserve all the love, happiness and smiles in the world. Happy Birthday, meri favourite person! ❤️";

const TEDDY_FLOATERS = [
  { e: "💖", l: "6%", d: "0s", s: 18 },
  { e: "✨", l: "20%", d: "1.2s", s: 14 },
  { e: "💗", l: "80%", d: "0.6s", s: 16 },
  { e: "✨", l: "92%", d: "1.8s", s: 13 },
  { e: "💕", l: "12%", d: "2.4s", s: 15 },
  { e: "💖", l: "70%", d: "2.1s", s: 14 },
];

const TEDDY_BURST = [
  { e: "💖", x: "-90px", y: "-80px" },
  { e: "💕", x: "90px", y: "-70px" },
  { e: "✨", x: "-60px", y: "-120px" },
  { e: "💗", x: "60px", y: "-125px" },
  { e: "🤍", x: "0px", y: "-140px" },
  { e: "✨", x: "-110px", y: "-30px" },
  { e: "💖", x: "110px", y: "-35px" },
];

const TEDDY_CSS = `
.td-stage { position: relative; width: min(100%, 300px); height: 190px; margin: 0 auto; }
.td-floater { position: absolute; bottom: 0; animation: tdFloat 5s ease-in infinite; opacity: 0; pointer-events: none; }
@keyframes tdFloat { 0% { transform: translateY(10px); opacity: 0; } 15% { opacity: .9; } 100% { transform: translateY(-170px) translateX(8px); opacity: 0; } }
.td-balloon { position: absolute; width: 26px; height: 32px; border-radius: 50% 50% 48% 48%; animation: tdSway 3.2s ease-in-out infinite; pointer-events: none; }
.td-balloon::after { content: ""; position: absolute; left: 50%; top: 100%; width: 1px; height: 40px; background: rgba(255,255,255,.5); }
.td-b1 { left: 4%; top: 6px; background: radial-gradient(circle at 30% 30%, #ffd4d8, #fb7185); }
.td-b2 { right: 4%; top: 18px; background: radial-gradient(circle at 30% 30%, #fff1b8, #f4b43c); animation-delay: -1.2s; }
.td-b3 { left: 20%; top: -6px; width: 20px; height: 26px; background: radial-gradient(circle at 30% 30%, #f5d0fe, #c084fc); animation-delay: -2s; }
@keyframes tdSway { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-8px) rotate(4deg); } }
.td-btn { position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); width: 130px; height: 150px; background: none; border: 0; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.td-btn:disabled { cursor: default; }
.td-bear { position: absolute; inset: 0; transform-origin: 50% 100%; animation: tdIdle 3s ease-in-out infinite; }
.td-bear.hug { animation: tdHug 1.5s ease-in-out both; }
@keyframes tdIdle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes tdHug { 0% { transform: scale(1); } 25% { transform: scale(1.1, .94) translateY(-6px); } 50% { transform: scale(.94, 1.08); } 75% { transform: scale(1.08, .95); } 100% { transform: scale(1); } }
.td-p { position: absolute; border-radius: 50%; }
.td-fur { background: radial-gradient(circle at 35% 30%, #e6b27a, #c98a4f); }
.td-light { background: radial-gradient(circle at 40% 30%, #f8dfbc, #eac493); }
.td-ear { width: 38px; height: 38px; top: 2px; }
.td-ear::after { content: ""; position: absolute; inset: 9px; border-radius: 50%; background: #f8b4c4; }
.td-ear-l { left: 8px; } .td-ear-r { right: 8px; }
.td-head { width: 90px; height: 80px; top: 14px; left: 20px; }
.td-eye { width: 9px; height: 11px; background: #3b2314; top: 44px; }
.td-eye::after { content: ""; position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #fff; top: 2px; left: 2px; }
.td-eye-l { left: 47px; } .td-eye-r { right: 47px; }
.td-snout { width: 38px; height: 28px; top: 56px; left: 46px; }
.td-nose { width: 14px; height: 9px; background: #3b2314; top: 60px; left: 58px; border-radius: 50% 50% 60% 60%; }
.td-cheek { width: 14px; height: 9px; background: rgba(251,113,133,.5); top: 62px; }
.td-cheek-l { left: 32px; } .td-cheek-r { right: 32px; }
.td-body { width: 88px; height: 70px; top: 82px; left: 21px; border-radius: 45% 45% 50% 50%; }
.td-belly { width: 48px; height: 44px; top: 96px; left: 41px; }
.td-leg { width: 34px; height: 24px; top: 128px; border-radius: 50%; }
.td-leg-l { left: 18px; } .td-leg-r { right: 18px; }
.td-arm { width: 22px; height: 46px; top: 88px; border-radius: 12px; transform-origin: 50% 8px; transition: transform .3s; }
.td-arm-l { left: 6px; } .td-arm-r { right: 6px; }
.td-bear.hug .td-arm-l { animation: tdArmL 1.5s ease-in-out both; }
.td-bear.hug .td-arm-r { animation: tdArmR 1.5s ease-in-out both; }
@keyframes tdArmL { 0%, 100% { transform: rotate(0); } 25%, 75% { transform: rotate(-72deg) translateX(-4px); } }
@keyframes tdArmR { 0%, 100% { transform: rotate(0); } 25%, 75% { transform: rotate(72deg) translateX(4px); } }
.td-burst { position: absolute; left: 50%; top: 60%; font-size: 20px; pointer-events: none; animation: tdBurst 1.6s ease-out both; }
@keyframes tdBurst { 0% { transform: translate(-50%, -50%) scale(.3); opacity: 1; } 100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.3); opacity: 0; } }
.td-msg { animation: tdMsg 1s ease both; }
@keyframes tdMsg { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
.td-hint { animation: tdPulse 1.8s ease-in-out infinite; }
@keyframes tdPulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .td-floater, .td-balloon, .td-bear, .td-bear.hug, .td-bear.hug .td-arm, .td-burst, .td-msg, .td-hint { animation: none; } }
`;

function TeddySurprise({ onReveal }) {
  const [hugCount, setHugCount] = useState(0);
  const [hugging, setHugging] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const hug = () => {
    if (hugging) return;
    setHugging(true);
    setHugCount((c) => c + 1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHugging(false);
      setRevealed(true);
      setBurstKey((k) => k + 1);
      if (onReveal) onReveal();
    }, 1500);
  };

  return (
    <div className="pt-4 space-y-3">
      <style>{TEDDY_CSS}</style>

      <div className="td-stage">
        <div className="td-balloon td-b1" />
        <div className="td-balloon td-b2" />
        <div className="td-balloon td-b3" />
        {TEDDY_FLOATERS.map((f, i) => (
          <span key={i} className="td-floater" style={{ left: f.l, animationDelay: f.d, fontSize: f.s }}>{f.e}</span>
        ))}
        {burstKey > 0 && TEDDY_BURST.map((b, i) => (
          <span key={`${burstKey}-${i}`} className="td-burst" style={{ "--x": b.x, "--y": b.y, animationDelay: `${i * 0.05}s` }}>{b.e}</span>
        ))}

        <button
          type="button"
          className="td-btn"
          onClick={hug}
          disabled={hugging}
          aria-label="Tap the teddy for a hug"
        >
          <div key={hugCount} className={`td-bear ${hugging ? "hug" : ""}`}>
            <div className="td-p td-fur td-ear td-ear-l" />
            <div className="td-p td-fur td-ear td-ear-r" />
            <div className="td-p td-fur td-leg td-leg-l" />
            <div className="td-p td-fur td-leg td-leg-r" />
            <div className="td-p td-fur td-body" />
            <div className="td-p td-light td-belly" />
            <div className="td-p td-fur td-head" />
            <div className="td-p td-light td-snout" />
            <div className="td-p td-eye td-eye-l" />
            <div className="td-p td-eye td-eye-r" />
            <div className="td-p td-cheek td-cheek-l" />
            <div className="td-p td-cheek td-cheek-r" />
            <div className="td-p td-nose" />
            <div className="td-p td-fur td-arm td-arm-l" />
            <div className="td-p td-fur td-arm td-arm-r" />
          </div>
        </button>
      </div>

      {!revealed && (
        <p className={`text-xs text-rose-200/80 ${hugging ? "" : "td-hint"}`}>
          {hugging ? "Hug aa raha hai… 🤗" : "Ek chhota sa surprise: teddy ko tap karo 🧸"}
        </p>
      )}

      {revealed && (
        <div className="td-msg space-y-3">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-rose-300/30 shadow-xl">
            <p className="font-serif text-sm sm:text-base text-rose-50 leading-relaxed">{TEDDY_MESSAGE}</p>
          </div>
          <button
            type="button"
            onClick={hug}
            disabled={hugging}
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-white/10 border border-rose-300/40 text-rose-100 text-xs font-bold hover:bg-white/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            Give Teddy Another Hug 🤗
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Post-Credit Scene (scene 13): opened only from the finale's "One Last Scene" button
// ---------------------------------------------------------------------------
const PC_CREDITS = [
  { big: "A Tanish Original Presentation" },
  { big: "Created with Love and Lots of Little Details" },
  { k: "Starring", big: "Supreme Court 💗" },
  { k: "Special Moments", big: "Memories, Smiles and Birthday Wishes" },
  { k: "Music, Feelings & Tiny Surprises", big: "From the Heart" },
  { k: "Director & Creator", big: "Tanish" },
  { k: "Dedicated to", big: "Someone Special ❤️" },
];

const PC_PARAS = [
  "Aaj tumhare birthday ke liye maine tumhare liye ek chhoti si duniya banayi. Har screen, har animation aur har message ke peeche bas ek hi wish thi—ki tumhare chehre par ek genuine smile aaye.",
  "Birthday ka din khatam ho jayega aur ye little movie bhi end ho jayegi. Lekin meri taraf se tumhare liye ye wish hamesha rahegi: tum khush raho, apne dreams poore karo aur zindagi tumhe bahut saari beautiful memories de.",
  "Main nahi chahta ki tum is surprise ko kisi pressure ya expectation ki tarah lo. Ye bas meri taraf se ek chhoti si birthday wish hai, jo dil se banayi gayi hai.",
];

const PC_DOTS = Array.from({ length: 14 }, (_, i) => ({
  l: `${(i * 37 + 8) % 96}%`, d: `${(i * 1.7) % 9}s`, t: `${9 + (i % 5) * 2}s`, c: i % 3 === 0 ? "#fbcfe8" : "#fde68a",
}));
const PC_HEARTS = ["💖", "💗", "💕", "🤍", "💖", "💗", "💕", "🤍", "💖", "💗"].map((e, i) => ({
  e, l: `${(i * 23 + 5) % 94}%`, d: `${(i * 1.3) % 7}s`, s: 14 + (i % 4) * 3,
}));
const PC_CONF = Array.from({ length: 26 }, (_, i) => ({
  l: `${(i * 29 + 3) % 98}%`, d: `${(i * 0.37) % 5}s`, t: `${5 + (i % 4)}s`,
  c: ["#fbcfe8", "#fde68a", "#f9a8d4", "#fff1f2", "#fcd34d"][i % 5],
}));

const PC_CSS = `
.pc-root, .pc-root * { box-sizing: border-box; }
.pc-root { position: fixed; inset: 0; z-index: 70; overflow-y: auto; overflow-x: hidden; color: #fde7ec; background: #07020a; font-family: Georgia, "Times New Roman", serif; }
.pc-glow { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0; animation: pcGlow 3.2s ease forwards;
  background: radial-gradient(ellipse at 50% 20%, rgba(253,224,130,.55), transparent 55%), linear-gradient(160deg, #831843 0%, #be185d 45%, #f9a8d4 100%); }
@keyframes pcGlow { to { opacity: 1; } }
.pc-grain { position: fixed; inset: 0; pointer-events: none; z-index: 3; opacity: .14; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: pcGrain .9s steps(4) infinite; }
@keyframes pcGrain { 0% { transform: translate(0,0); } 25% { transform: translate(-3%,2%); } 50% { transform: translate(2%,-3%); } 75% { transform: translate(-2%,-1%); } 100% { transform: translate(0,0); } }
.pc-lights { position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background: radial-gradient(circle at 15% 85%, rgba(244,114,182,.22), transparent 40%), radial-gradient(circle at 85% 15%, rgba(251,191,36,.18), transparent 40%); }
.pc-dot { position: fixed; bottom: -10px; width: 3px; height: 3px; border-radius: 50%; z-index: 2; pointer-events: none; opacity: 0; animation: pcRise linear infinite; box-shadow: 0 0 8px 2px currentColor; }
@keyframes pcRise { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: .8; } 100% { transform: translateY(-105vh); opacity: 0; } }
.pc-heart { position: fixed; bottom: -30px; z-index: 4; pointer-events: none; opacity: 0; animation: pcRise 9s linear infinite; }
.pc-conf { position: fixed; top: -14px; width: 8px; height: 12px; z-index: 4; pointer-events: none; opacity: .9; animation: pcFall linear infinite; }
@keyframes pcFall { to { transform: translateY(110vh) rotate(540deg); } }
.pc-top { position: fixed; top: 0; left: 0; right: 0; z-index: 20; padding: 10px 12px; display: flex; justify-content: space-between; }
.pc-small { min-height: 40px; padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.25); background: rgba(0,0,0,.35); color: #fde7ec; font-family: Arial, sans-serif; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
.pc-small:hover { background: rgba(255,255,255,.15); }
.pc-stage { position: relative; z-index: 10; min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; padding: 64px 14px 40px; }
.pc-window { position: fixed; inset: 0; z-index: 10; overflow: hidden; -webkit-mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent); mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent); }
.pc-roll { position: absolute; left: 0; right: 0; text-align: center; padding: 0 16px; animation: pcRoll 30s linear forwards; }
@keyframes pcRoll { from { transform: translateY(100vh); } to { transform: translateY(-100%); } }
.pc-item { margin-bottom: 54px; }
.pc-k { font-family: "Courier New", monospace; font-size: clamp(10px, 2.8vw, 13px); letter-spacing: .3em; text-transform: uppercase; color: rgba(251,191,36,.85); margin-bottom: 8px; overflow-wrap: anywhere; }
.pc-big { font-size: clamp(20px, 6vw, 32px); font-weight: 700; color: #fff1f2; text-shadow: 0 0 20px rgba(244,114,182,.45); line-height: 1.3; overflow-wrap: anywhere; }
.pc-wait { text-align: center; font-style: italic; font-size: clamp(22px, 6.5vw, 38px); color: #fde68a; text-shadow: 0 0 24px rgba(253,230,138,.5); animation: pcIn 2s ease both; padding: 0 12px; }
@keyframes pcIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
.pc-reveal { margin-top: 28px; display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 14px 28px; border: 0; border-radius: 999px; cursor: pointer; max-width: 100%;
  font-family: Arial, sans-serif; font-weight: 800; font-size: clamp(13px, 3.6vw, 15px); color: #4c0519; background: linear-gradient(90deg, #fcd34d, #fbcfe8, #f9a8d4);
  box-shadow: 0 0 26px rgba(251,191,36,.55); animation: pcIn 1.6s ease both; transition: transform .3s; }
.pc-reveal:hover { transform: scale(1.05); } .pc-reveal:active { transform: scale(.96); }
.pc-card { position: relative; width: 100%; max-width: 640px; padding: clamp(20px, 5vw, 40px) clamp(16px, 5vw, 38px); border-radius: 22px;
  background: rgba(255,247,248,.96); color: #4c0519; border: 1px solid rgba(251,191,36,.7);
  box-shadow: 0 0 0 5px rgba(255,255,255,.18), 0 0 60px rgba(253,224,130,.5), 0 24px 60px rgba(80,0,40,.45); animation: pcCard 1.6s ease 1.6s both; }
@keyframes pcCard { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: none; } }
.pc-card h2 { font-size: clamp(21px, 6vw, 30px); font-weight: 700; color: #9d174d; margin: 0 0 14px; text-align: center; line-height: 1.3; overflow-wrap: anywhere; }
.pc-card p { font-size: clamp(14px, 3.8vw, 16.5px); line-height: 1.8; margin: 0 0 14px; overflow-wrap: anywhere; opacity: 0; animation: pcIn 1.1s ease forwards; }
.pc-card strong { color: #be185d; }
.pc-sign { text-align: right; font-style: italic; color: #9d174d; font-size: clamp(15px, 4vw, 18px); }
.pc-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 18px; opacity: 0; animation: pcIn 1.1s ease forwards; }
.pc-btn { min-height: 44px; padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(190,24,93,.35); background: #fff; color: #9d174d; font-family: Arial, sans-serif; font-weight: 700; font-size: 12.5px; cursor: pointer; transition: transform .2s, background .2s; }
.pc-btn:hover { background: #fce7f3; transform: scale(1.04); } .pc-btn:active { transform: scale(.96); }
.pc-btn.main { background: linear-gradient(90deg, #f9a8d4, #fcd34d); border: 0; color: #4c0519; }
@media (prefers-reduced-motion: reduce) { .pc-grain, .pc-dot, .pc-heart, .pc-conf { animation: none; } .pc-roll { animation-duration: 1ms; } .pc-glow { animation-duration: 1ms; } .pc-card, .pc-card p, .pc-actions, .pc-wait, .pc-reveal { animation: none; opacity: 1; } }
`;

function PostCreditScene({ onBackToFinale, onReplayAll }) {
  const [stage, setStage] = useState("credits"); // credits -> wait -> secret
  const [secretKey, setSecretKey] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (stage !== "credits") return;
    const t = setTimeout(() => setStage("wait"), 30500);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (rootRef.current) rootRef.current.scrollTo({ top: 0 });
  }, [stage, secretKey]);

  const secret = stage === "secret";
  const base = 2.6; // seconds, after the card starts fading in

  return (
    <div className="pc-root" ref={rootRef}>
      <style>{PC_CSS}</style>

      {secret && <div key={`g${secretKey}`} className="pc-glow" />}
      <div className="pc-lights" />
      {PC_DOTS.map((d, i) => (
        <span key={i} className="pc-dot" style={{ left: d.l, animationDelay: d.d, animationDuration: d.t, color: d.c, background: d.c }} />
      ))}
      <div className="pc-grain" />

      {secret && (
        <div key={`h${secretKey}`}>
          {PC_HEARTS.map((h, i) => (
            <span key={i} className="pc-heart" style={{ left: h.l, animationDelay: h.d, fontSize: h.s }}>{h.e}</span>
          ))}
          {PC_CONF.map((c, i) => (
            <span key={i} className="pc-conf" style={{ left: c.l, animationDelay: c.d, animationDuration: c.t, background: c.c }} />
          ))}
        </div>
      )}

      <div className="pc-top">
        <button type="button" className="pc-small" onClick={onBackToFinale}>
          <ChevronLeft size={14} /> Finale
        </button>
        {stage === "credits" && (
          <button type="button" className="pc-small" onClick={() => setStage("wait")}>Skip ▸</button>
        )}
      </div>

      {stage === "credits" && (
        <div className="pc-window">
          <div className="pc-roll">
            {PC_CREDITS.map((c, i) => (
              <div className="pc-item" key={i}>
                {c.k && <div className="pc-k">{c.k}</div>}
                <div className="pc-big">{c.big}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "wait" && (
        <div className="pc-stage">
          <div style={{ textAlign: "center" }}>
            <p className="pc-wait">Wait… the story isn't over yet.</p>
            <button type="button" className="pc-reveal" style={{ animationDelay: "2s" }} onClick={() => setStage("secret")}>
              Reveal the Secret Scene ❤️
            </button>
          </div>
        </div>
      )}

      {secret && (
        <div className="pc-stage" key={`s${secretKey}`}>
          <div className="pc-card">
            <h2>One Last Thing, Supreme Court… ❤️</h2>
            {PC_PARAS.map((p, i) => (
              <p key={i} style={{ animationDelay: `${base + i * 1}s` }}>{p}</p>
            ))}
            <p style={{ animationDelay: `${base + PC_PARAS.length}s` }}>
              <strong>And if you ever replay this little movie, I hope it makes you smile all over again.</strong> 🧸💗
            </p>
            <p style={{ animationDelay: `${base + PC_PARAS.length + 1}s` }}>
              Happy Birthday, Supreme Court. Keep smiling, keep shining, and always take care of yourself.
            </p>
            <p className="pc-sign" style={{ animationDelay: `${base + PC_PARAS.length + 2}s` }}>— With love, Tanish ❤️</p>

            <div className="pc-actions" style={{ animationDelay: `${base + PC_PARAS.length + 3}s` }}>
              <button type="button" className="pc-btn main" onClick={() => setSecretKey((k) => k + 1)}>Replay the Secret Scene ↻</button>
              <button type="button" className="pc-btn" onClick={onBackToFinale}>Back to Finale ❤️</button>
              <button type="button" className="pc-btn" onClick={onReplayAll}>Replay from Beginning 🎬</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Appears a few seconds after the finale is shown (never auto-opens the scene)
function FinaleLastSceneButton({ onClick }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <div className="pt-2 text-center">
      <style>{`@keyframes flsIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-r from-amber-200 via-pink-200 to-rose-300 text-rose-950 font-bold text-sm shadow-lg shadow-amber-300/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        style={{ animation: "flsIn 1.2s ease both" }}
      >
        Wait… One Last Scene 🎬
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Illustrated photo-card art (self-contained SVG, no external images).
// Shown while a photo loads, or if the photo file is missing; a real photo
// placed in /public covers it automatically.
// ---------------------------------------------------------------------------
const HEART_PATH = "M0 12 C-26 -8 -22 -30 -8 -30 C-2 -30 0 -24 0 -22 C0 -24 2 -30 8 -30 C22 -30 26 -8 0 12Z";
const MEMORY_ART_BY_SUBTITLE = {
  "The Unexpected Call": "call",
  "Midnight Conversations": "night",
  "A Lifeline Call": "care",
  "Warm Comfort": "comfort",
};
const PEOPLE_ART_BY_NAME = {
  "Family & Loved Ones": "family",
  "Best Friends": "friends",
  "Special Circle": "circle",
};

function MemoryArt({ kind }) {
  const sparkles = [[60, 50, 1], [340, 70, 0.8], [90, 230, 0.7], [320, 220, 1], [200, 40, 0.6]];
  const bgs = {
    call: ["#fb7185", "#9d174d", "#4a0d24"],
    night: ["#312e81", "#6b21a8", "#2a0612"],
    care: ["#fdba74", "#f472b6", "#9d174d"],
    comfort: ["#fcd34d", "#fb7185", "#9f1239"],
  };
  const [c1, c2, c3] = bgs[kind] || bgs.call;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="w-full h-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`ma-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} /><stop offset=".55" stopColor={c2} /><stop offset="1" stopColor={c3} />
        </linearGradient>
        <radialGradient id={`mg-${kind}`} cx=".5" cy=".45" r=".6">
          <stop offset="0" stopColor="#fff7d6" stopOpacity=".55" /><stop offset="1" stopColor="#fff7d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#ma-${kind})`} />
      <rect width="400" height="300" fill={`url(#mg-${kind})`} />
      {sparkles.map(([x, y, s], i) => (
        <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5Z" fill="#fff7d6" opacity=".85" />
      ))}

      {kind === "call" && (
        <g>
          <g transform="translate(100 150) rotate(-12)">
            <rect x="-34" y="-62" width="68" height="124" rx="14" fill="#2a0612" stroke="#fde68a" strokeWidth="3" />
            <rect x="-27" y="-50" width="54" height="92" rx="7" fill="#fbcfe8" />
            <path transform="translate(0 -4) scale(.7)" d={HEART_PATH} fill="#e11d48" />
          </g>
          <g transform="translate(300 150) rotate(12)">
            <rect x="-34" y="-62" width="68" height="124" rx="14" fill="#2a0612" stroke="#fde68a" strokeWidth="3" />
            <rect x="-27" y="-50" width="54" height="92" rx="7" fill="#fbcfe8" />
            <path transform="translate(0 -4) scale(.7)" d={HEART_PATH} fill="#e11d48" />
          </g>
          <path d="M138 110 Q200 40 262 110" fill="none" stroke="#fff7d6" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
          <path transform="translate(200 66) scale(.9)" d={HEART_PATH} fill="#fff1f2" />
          <path d="M60 120 q-12 20 0 40 M48 112 q-20 28 0 56" fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity=".8" />
          <path d="M340 120 q12 20 0 40 M352 112 q20 28 0 56" fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity=".8" />
        </g>
      )}

      {kind === "night" && (
        <g>
          <circle cx="285" cy="82" r="46" fill="#fef3c7" />
          <circle cx="303" cy="72" r="40" fill="#4c1d95" opacity=".85" />
          {[[60, 60], [130, 34], [200, 80], [350, 160], [40, 150], [250, 30]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#fff7d6" />
          ))}
          <g transform="translate(150 190) rotate(-8)">
            <rect x="-40" y="-66" width="80" height="132" rx="16" fill="#1c0b2e" stroke="#fde68a" strokeWidth="3" />
            <rect x="-32" y="-54" width="64" height="104" rx="8" fill="#a78bfa" opacity=".35" />
            <rect x="-26" y="-40" width="40" height="16" rx="8" fill="#fbcfe8" />
            <rect x="-14" y="-16" width="40" height="16" rx="8" fill="#fde68a" />
            <rect x="-26" y="8" width="30" height="16" rx="8" fill="#fbcfe8" />
          </g>
          <path transform="translate(240 200) scale(.9)" d={HEART_PATH} fill="#fb7185" />
          <path d="M20 270 Q70 235 120 262 T230 262 T340 258 T400 270 V300 H0Z" fill="#2a0612" opacity=".55" />
        </g>
      )}

      {kind === "care" && (
        <g>
          <path transform="translate(200 120) scale(3.1)" d={HEART_PATH} fill="#fff1f2" />
          <path transform="translate(200 118) scale(1.9)" d={HEART_PATH} fill="#fb7185" />
          <path d="M70 225 Q120 270 200 262 Q280 270 330 225 Q270 238 200 236 Q130 238 70 225Z" fill="#fde68a" opacity=".95" />
          <ellipse cx="96" cy="222" rx="34" ry="16" transform="rotate(-18 96 222)" fill="#fed7aa" />
          <ellipse cx="304" cy="222" rx="34" ry="16" transform="rotate(18 304 222)" fill="#fed7aa" />
        </g>
      )}

      {kind === "comfort" && (
        <g>
          <g transform="translate(125 160) rotate(-14)">
            <path d="M0 -84 L62 70 Q0 96 -62 70Z" fill="#fde68a" />
            <path d="M-62 70 Q0 96 62 70 L58 56 Q0 80 -58 56Z" fill="#d97706" />
            <circle cx="-14" cy="-6" r="13" fill="#be123c" /><circle cx="18" cy="26" r="12" fill="#be123c" />
            <circle cx="-4" cy="40" r="9" fill="#be123c" /><circle cx="14" cy="-34" r="8" fill="#be123c" />
          </g>
          <g transform="translate(280 160)">
            <path d="M-38 -56 H38 L30 76 Q0 90 -30 76Z" fill="#fff1f2" opacity=".9" />
            <path d="M-34 -10 H34 L30 76 Q0 90 -30 76Z" fill="#fb7185" />
            <path d="M-8 -56 L-22 -104 M8 -56 L26 -100" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            <path transform="translate(0 28) scale(.9)" d={HEART_PATH} fill="#fff1f2" />
          </g>
          <path transform="translate(206 70) scale(.7)" d={HEART_PATH} fill="#fff1f2" />
        </g>
      )}
    </svg>
  );
}

function PeopleArt({ kind }) {
  const person = (x, h, color, key, smile) => (
    <g key={key}>
      <circle cx={x} cy={52 - h / 3} r="9" fill="#fed7aa" />
      <rect x={x - 11} y={63 - h / 3} width="22" height={h} rx="10" fill={color} />
      {smile && <path d={`M${x - 4} ${54 - h / 3} q4 5 8 0`} fill="none" stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round" />}
    </g>
  );
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`pa-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fda4af" /><stop offset="1" stopColor="#9d174d" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#pa-${kind})`} />
      {kind === "family" && [person(32, 30, "#fde68a", "a", true), person(66, 32, "#f9a8d4", "b", true), person(49, 20, "#c4b5fd", "c", true)]}
      {kind === "friends" && [person(36, 30, "#fde68a", "a", true), person(64, 30, "#a5f3fc", "b", true),
        <path key="h" transform="translate(50 24) scale(.45)" d={HEART_PATH} fill="#fff1f2" />]}
      {kind === "circle" && [person(24, 26, "#fde68a", "a", true), person(42, 28, "#a5f3fc", "b", true), person(60, 28, "#f9a8d4", "c", true), person(78, 26, "#c4b5fd", "d", true),
        <path key="h" transform="translate(50 22) scale(.4)" d={HEART_PATH} fill="#fff1f2" />]}
    </svg>
  );
}

// Photo layered over an illustrated fallback: art shows while loading or if the file is missing
function PhotoWithFallback({ src, alt, className, fallback }) {
  const [status, setStatus] = useState("loading");
  const imgRef = useRef(null);
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setStatus("loaded");
  }, [src]);
  return (
    <>
      <div className="absolute inset-0">{fallback}</div>
      {status !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${className} absolute inset-0 transition-opacity duration-700 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Video diagnostics: finds out WHY the video failed (missing file / wrong path / codec)
// ---------------------------------------------------------------------------
const VIDEO_ERROR_CODES = {
  1: "Playback abort ho gaya",
  2: "Network error",
  3: "Decode error (file corrupt ya codec unsupported)",
  4: "Source supported nahi hai ya file mili nahi",
};

async function diagnoseVideo(src, el) {
  const lines = [];
  const code = el && el.error ? el.error.code : null;
  lines.push(`MediaError: ${code ? `${code} - ${VIDEO_ERROR_CODES[code] || "unknown"}` : "n/a"}`);
  lines.push(`Browser h264: ${(el && el.canPlayType('video/mp4; codecs="avc1.64001E"')) || "no"}, hevc: ${(el && el.canPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"')) || "no"}`);
  let cause = "Video load nahi ho paayi.";
  try {
    const res = await fetch(src, { headers: { Range: "bytes=0-524287" } });
    const type = res.headers.get("content-type") || "";
    lines.push(`HTTP ${res.status}, content-type: ${type || "n/a"}`);
    if (type.includes("text/html")) {
      cause = "Video file path galat hai ya file nahi mili (server ne video ki jagah HTML page diya).";
    } else if (!res.ok) {
      cause = `Server ne video nahi diya (HTTP ${res.status}). File ka naam/path check karo.`;
    } else if (res.status === 206) {
      const decode = (buf) => new TextDecoder("latin1").decode(buf);
      let text = decode(await res.arrayBuffer());
      const range = res.headers.get("content-range") || "";
      const total = parseInt(range.split("/")[1], 10);
      if (!text.includes("moov") && total > 524288) {
        const tail = await fetch(src, { headers: { Range: `bytes=${Math.max(0, total - 524288)}-${total - 1}` } });
        if (tail.ok) text += decode(await tail.arrayBuffer());
      }
      const hevc = /hvc1|hev1/.test(text);
      const avc = /avc1/.test(text);
      const other = /av01|vp09/.test(text);
      lines.push(`Codec tags: ${[hevc && "HEVC/H.265", avc && "H.264", other && "AV1/VP9"].filter(Boolean).join(", ") || "detect nahi hua"}`);
      if (hevc && !avc) {
        cause = "Video HEVC (H.265) codec mein hai. Chrome/Firefox aksar ise play nahi karte. Ise H.264 MP4 mein convert karna hoga.";
      } else if (code === 3 || code === 4) {
        cause = "File mil gayi hai, par browser ise decode nahi kar pa raha (codec ya file corrupt ho sakti hai). Ise H.264 + AAC MP4 mein convert karke try karo.";
      } else {
        cause = "Video mil gayi, par load fail hui. Retry karo; na chale to console (F12) mein details dekho.";
      }
    } else {
      cause = code === 3 || code === 4
        ? "File mil gayi hai, par browser ise play nahi kar pa raha (codec issue ho sakta hai). Ise H.264 + AAC MP4 mein convert karke try karo."
        : "Video load fail hui. Retry karo.";
    }
  } catch (err) {
    lines.push(`Fetch error: ${err && err.message}`);
    cause = "Video file tak pahunch nahi paaye (network ya path issue).";
  }
  return { message: cause, detail: lines.join(" | ") };
}

function AmbientFireflies() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 2.2,
      a: Math.random() * 6.28,
      s: 0.15 + Math.random() * 0.45,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.a += 0.015;
        p.y -= p.s * 0.35;
        p.x += Math.sin(p.a) * 0.25;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, `rgba(255, 215, 225, ${0.3 + 0.5 * ((Math.sin(p.a) + 1) / 2)})`);
        g.addColorStop(1, "rgba(255, 215, 225, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}

function FestiveConfetti({ trigger }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth, h = window.innerHeight, raf;
    canvas.width = w; canvas.height = h;

    const colors = ["#ffb6b8", "#ffd4d8", "#f49db9", "#ffeaf0", "#ffd700", "#ff85a2"];
    const pieces = Array.from({ length: trigger ? 90 : 40 }, () => ({
      x: Math.random() * w,
      y: trigger ? Math.random() * h * 0.5 : Math.random() * h - h,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;
        if (p.y > h) { p.y = -20; p.x = Math.random() * w; }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      raf = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-10" />;
}

function ParticleHeart({ replay }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const x = c.getContext("2d");
    const w = 340, h = 300;
    c.width = w * 2; c.height = h * 2;
    c.style.width = `${w}px`; c.style.height = `${h}px`;
    x.scale(2, 2);

    let f = 0, raf;
    const p = Array.from({ length: 550 }, (_, i) => {
      const t = Math.random() * Math.PI * 2;
      const s = Math.sqrt(Math.random());
      const hx = 16 * Math.sin(t) ** 3;
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        tx: w / 2 + hx * 8.3 * s,
        ty: h / 2 + hy * 8.3 * s,
        r: 0.6 + Math.random() * 1.6,
        gold: i % 5 === 0,
      };
    });

    const tick = () => {
      x.clearRect(0, 0, w, h);
      f = Math.min(1, f + 0.009);
      const e = 1 - (1 - f) ** 3;
      const beat = f > 0.98 ? 1 + 0.035 * Math.sin(Date.now() / 250) : 1;
      p.forEach((q, i) => {
        const px = q.x + (q.tx - q.x) * e;
        const py = q.y + (q.ty - q.y) * e;
        x.fillStyle = q.gold ? "rgba(255, 215, 0, 0.9)" : "rgba(255, 150, 180, 0.88)";
        x.beginPath();
        x.arc(
          w / 2 + (px - w / 2) * beat + Math.sin(Date.now() / 600 + i) * 0.7,
          h / 2 + (py - h / 2) * beat,
          q.r,
          0,
          Math.PI * 2
        );
        x.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [replay]);

  return <canvas ref={ref} className="mx-auto max-w-full drop-shadow-[0_0_25px_rgba(255,182,184,0.4)]" aria-label="Glowing Heart" />;
}

function TimeCapsuleCounter({ startDate }) {
  const [time, setTime] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const days = totalDays % 365;

      setTime({ years, days, hours, minutes, seconds });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
      {[
        { label: "YEARS", val: time.years },
        { label: "DAYS", val: time.days },
        { label: "HOURS", val: time.hours },
        { label: "MINS", val: time.minutes },
        { label: "SECS", val: time.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="font-mono text-lg sm:text-2xl font-bold text-amber-200">
            {String(item.val).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-wider text-rose-200/70 uppercase font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function BirthdayCake({ blown, onBlow }) {
  return (
    <div 
      onClick={onBlow}
      className="relative w-60 h-56 sm:w-72 sm:h-64 my-4 mx-auto flex flex-col items-center justify-end cursor-pointer group select-none"
      title="Click/Tap to blow the candles!"
    >
      <div className="relative z-20 flex gap-5 sm:gap-6 mb-1">
        {[1, 2, 3].map((id) => (
          <div key={id} className="flex flex-col items-center">
            {!blown ? (
              <div className="w-3 h-5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-200 to-white shadow-[0_0_15px_#ffd700] animate-pulse group-hover:scale-125 transition-transform" />
            ) : (
              <div className="w-2 h-3 rounded-full bg-gray-400/50 blur-[1px] animate-ping" />
            )}
            <div className="w-2 h-8 rounded-t bg-gradient-to-b from-pink-200 to-rose-500 border border-white/40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-36 sm:w-44 h-14 sm:h-16 rounded-t-2xl bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 flex items-center justify-center border border-white/30 shadow-lg">
        <div className="absolute top-0 inset-x-0 h-3 bg-white/50 rounded-t-2xl" />
        <span className="text-2xl sm:text-3xl">🎂</span>
      </div>

      <div className="relative z-10 -mt-1 w-40 sm:w-48 h-3 bg-white/80 rounded-full shadow-sm" />

      <div className="relative z-0 -mt-1 w-48 sm:w-56 h-18 sm:h-20 rounded-b-2xl rounded-t-xl bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 flex items-center justify-evenly border border-white/30 shadow-2xl">
        <span className="text-xs text-amber-200">✨</span>
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-white uppercase drop-shadow-sm">
          Supreme Court
        </span>
        <span className="text-xs text-amber-200">✨</span>
      </div>

      <div className="w-56 sm:w-64 h-3 rounded-full bg-gradient-to-r from-white/30 via-white/70 to-white/30 shadow-md" />
    </div>
  );
}

function AnimatedLetter({ paragraphs, onClose, from }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < paragraphs.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, paragraphs.length]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-rose-100 text-rose-950 p-8 sm:p-10 rounded-3xl shadow-2xl border border-rose-300/40 space-y-4 font-serif max-h-[85vh] overflow-y-auto"
        style={{
          backgroundImage: "repeating-linear-gradient(transparent 0 35px, rgba(139,18,52,0.1) 36px)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-rose-900/60 hover:text-rose-950 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-rose-900">
          Dear Supreme Court, 🤍
        </h3>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-rose-950/90 font-sans">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`transition-all duration-700 ${
                idx < visibleLines 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        {visibleLines >= paragraphs.length && (
          <div className="pt-6 text-right transition-all duration-1000">
            <p className="font-serif italic text-2xl text-rose-900">Yours truly,</p>
            <p className="font-serif text-lg font-bold text-rose-900">{from}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [scene, setScene] = useState(0); 
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [confettiBlast, setConfettiBlast] = useState(false);

  // Birthday certificate screen state
  const [certPassed, setCertPassed] = useState(false);
  const [certRating, setCertRating] = useState("U");
  const [disclaimerDone, setDisclaimerDone] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // 21 Jar Floating Heart State
  // Jar notes open in order: null = jar closed, 0..20 = index into CONFIG.jar21Notes
  const [jarIndex, setJarIndex] = useState(null);
  const [jarDone, setJarDone] = useState(false);
  const [jarShaking, setJarShaking] = useState(false);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [letterUnlocked, setLetterUnlocked] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const [wishText, setWishText] = useState("");
  const [wishSent, setWishSent] = useState(false);

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);
  const [videoAspect, setVideoAspect] = useState(null);
  const [videoError, setVideoError] = useState(null); // { message, detail } | null
  const [videoReady, setVideoReady] = useState(false);
  const [videoRetry, setVideoRetry] = useState(0);
  const musicPausedByVideo = useRef(false);

  const [musicOn, setMusicOn] = useState(false);
  const [replay, setReplay] = useState(0);
  const audioRef = useRef(null);

  // One persistent Audio object (not a JSX element), so it never remounts between scenes.
  // It is created paused: nothing plays until startMusic() is called from a click.
  useEffect(() => {
    if (!CONFIG.music) return;
    const a = new Audio(CONFIG.music);
    a.loop = false; // looping is manual so it returns to 0:15, not 0:00
    a.preload = "auto";
    const onPlay = () => setMusicOn(true);
    const onPause = () => setMusicOn(false);
    const onEnded = () => {
      const start = isFinite(a.duration) && a.duration > MUSIC_START_SECONDS ? MUSIC_START_SECONDS : 0;
      a.currentTime = start;
      a.play().catch(() => setMusicOn(false));
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    audioRef.current = a;
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.pause();
      audioRef.current = null;
    };
  }, []);

  // Called from a real click (disclaimer Continue) so browsers allow playback
  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    // Fresh start: always begin at 0:15 (only if the track is longer than 15s)
    const seekToStart = () => {
      const ok = !isFinite(a.duration) || a.duration > MUSIC_START_SECONDS;
      try { a.currentTime = ok ? MUSIC_START_SECONDS : 0; } catch (e) { /* ignore */ }
    };
    seekToStart(); // sets the start position before playback
    if (a.readyState < 1) a.addEventListener("loadedmetadata", seekToStart, { once: true });
    const p = a.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => setMusicOn(false)); // autoplay blocked: toggle/begin button can retry
    }
  };

  // Video plays on its own: background music pauses (position kept) and resumes afterwards
  const resumeMusicAfterVideo = () => {
    if (!musicPausedByVideo.current) return;
    musicPausedByVideo.current = false;
    if (audioRef.current) audioRef.current.play().catch(() => setMusicOn(false));
  };
  const handleVideoPlay = () => {
    setIsPlayingVideo(true);
    const a = audioRef.current;
    if (a && !a.paused) {
      musicPausedByVideo.current = true;
      a.pause();
    }
  };
  const handleVideoError = (el) => {
    console.error("[video] failed to load:", CONFIG.videoSrc, el && el.error);
    setIsPlayingVideo(false);
    setVideoReady(false);
    setVideoError({ message: "Video load nahi ho paayi. Check kar raha hoon kyun…", detail: "" });
    diagnoseVideo(CONFIG.videoSrc, el).then((d) => {
      console.error("[video] diagnosis:", d);
      setVideoError(d);
    });
  };
  const retryVideo = () => {
    setVideoError(null);
    setVideoReady(false);
    setVideoRetry((r) => r + 1);
  };
  const handleVideoStop = () => {
    setIsPlayingVideo(false);
    resumeMusicAfterVideo();
  };
  useEffect(() => {
    if (scene !== 5) resumeMusicAfterVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  const pauseMusic = () => {
    if (audioRef.current) audioRef.current.pause();
    setMusicOn(false);
  };

  const go = (n) => {
    setScene(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const begin = () => {
    go(1);
    if (audioRef.current) {
      audioRef.current.play().then(() => setMusicOn(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicOn(!musicOn);
  };

  const blowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      setConfettiBlast(true);
      setTimeout(() => setConfettiBlast(false), 3000);
    }
  };

  // Opens the jar (only when closed); always starts at Note 1 (index 0)
  const popJarHeart = () => {
    if (jarIndex !== null || jarShaking) return;
    setJarShaking(true);
    setTimeout(() => {
      setJarShaking(false);
      setJarIndex(0);
      setConfettiBlast(true);
      setTimeout(() => setConfettiBlast(false), 2000);
    }, 500);
  };

  // Moves exactly one note per click, clamped to 0..last
  const stepJarNote = (delta) => {
    setJarIndex((i) => {
      if (i === null) return i;
      return Math.min(Math.max(i + delta, 0), CONFIG.jar21Notes.length - 1);
    });
  };

  const finishJar = () => {
    setJarDone(true);
    setConfettiBlast(true);
    setTimeout(() => setConfettiBlast(false), 2500);
  };

  const handleQuizAnswer = (optIndex) => {
    setQuizSelected(optIndex);
    if (optIndex === CONFIG.quiz[quizIndex].ans) {
      setQuizScore((s) => s + 1);
      setConfettiBlast(true);
      setTimeout(() => setConfettiBlast(false), 2000);
    }
  };

  const nextQuizQuestion = () => {
    setQuizSelected(null);
    if (quizIndex < CONFIG.quiz.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      go(4); 
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === CONFIG.pin) {
      setLetterUnlocked(true);
      setShowPinModal(false);
      setLetterOpen(true);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (wishText.trim()) {
      setWishSent(true);
      setConfettiBlast(true);
      setTimeout(() => setConfettiBlast(false), 3000);
    }
  };

  const memory = CONFIG.moments[memoryIndex] || CONFIG.moments[0];

  // Certificate screen shows first; all hooks above run on every render
  if (!certPassed) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 text-rose-50 font-sans overflow-x-hidden selection:bg-rose-400 selection:text-rose-950">
        <div className="fixed -top-20 -left-20 w-96 h-96 rounded-full bg-pink-500/20 blur-[100px] pointer-events-none z-0" />
        <div className="fixed top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-rose-500/15 blur-[120px] pointer-events-none z-0" />
        <AmbientFireflies />
        <CertificateScreen
          rating={certRating}
          onRating={setCertRating}
          onEnter={() => {
            setCertPassed(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    );
  }

  // Director's disclaimer shows once, right after the certificate
  if (!disclaimerDone) {
    return (
      <DirectorDisclaimerScreen
        onBack={() => {
          pauseMusic();
          setCertPassed(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onContinue={() => {
          startMusic();
          setDisclaimerDone(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 text-rose-50 font-sans overflow-x-hidden selection:bg-rose-400 selection:text-rose-950">
      
      <div className="fixed -top-20 -left-20 w-96 h-96 rounded-full bg-pink-500/20 blur-[100px] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-rose-500/15 blur-[120px] pointer-events-none z-0" />

      <AmbientFireflies />
      <FestiveConfetti trigger={confettiBlast} />

      {/* Music is a persistent Audio object created in App() (see audioRef effect) */}

      {/* SCENE 12: Post-Credit Scene (overlay keeps music/audio mounted) */}
      {scene === 12 && (
        <PostCreditScene
          onBackToFinale={() => go(11)}
          onReplayAll={() => {
            setMemoryIndex(0);
            setCandlesBlown(false);
            setConfettiBlast(false);
            setQuizIndex(0);
            setQuizSelected(null);
            setQuizScore(0);
            setJarIndex(null);
            setJarDone(false);
            setJarShaking(false);
            setShowPinModal(false);
            setPinInput("");
            setPinError(false);
            setLetterUnlocked(false);
            setLetterOpen(false);
            setWishText("");
            setWishSent(false);
            setIsPlayingVideo(false);
            if (audioRef.current) audioRef.current.pause();
            setMusicOn(false);
            setReplay((r) => r + 1);
            setScene(0);
            setCertPassed(false);
            setDisclaimerDone(false);
            window.scrollTo({ top: 0 });
          }}
        />
      )}

      {/* SCENE 0: Entrance Landing */}
      {scene === 0 ? (
        <section className="relative z-20 min-h-screen flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-6">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-rose-300 shadow-xl animate-bounce">
              <Gift size={44} strokeWidth={1.2} />
            </div>
            <div>
              <p className="font-serif italic text-3xl text-rose-200">psst… happy birthday!</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2 leading-tight">
                A birthday surprise<br />
                <span className="bg-gradient-to-r from-rose-200 via-amber-200 to-pink-300 bg-clip-text text-transparent">
                  crafted just for you.
                </span>
              </h1>
            </div>
            <p className="text-sm text-rose-100/80 leading-relaxed max-w-sm mx-auto">
              No need to rush. Tap below and let your birthday universe unfold, one sweet moment at a time.
            </p>
            <div className="pt-2">
              <button
                onClick={begin}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Sparkles size={18} /> Open your birthday surprise
              </button>
            </div>

            {/* Optional mini-surprise: Virtual Teddy (below the main begin button) */}
            <TeddySurprise
              onReveal={() => {
                setConfettiBlast(true);
                setTimeout(() => setConfettiBlast(false), 2500);
              }}
            />
            <p className="pt-6 text-[10px] tracking-widest text-rose-300/50 uppercase">
              MADE WITH CARE · FROM TANISH
            </p>
          </div>
        </section>
      ) : (
        <div className="relative z-20 min-h-screen flex flex-col justify-between max-w-4xl mx-auto px-4 py-6">
          
          <header className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm text-rose-200">
              <PartyPopper size={18} className="text-rose-300" />
              <span className="font-semibold">Happy Birthday</span>
              <span className="text-pink-300">♡</span>
            </div>
            <div className="text-xs tracking-widest text-rose-200/50 uppercase font-mono">
              SCENE {String(scene).padStart(2, "0")} <span className="opacity-30">/ 12</span>
            </div>
            {CONFIG.music && (
              <button
                onClick={toggleMusic}
                className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
              >
                {musicOn ? <Music size={16} /> : <VolumeX size={16} />}
              </button>
            )}
          </header>

          <main className="my-auto py-8">
            
            {/* SCENE 1: Cake & Time Capsule */}
            {scene === 1 && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left space-y-4">
                  <p className="font-serif italic text-2xl text-rose-200">sirf tumhare liye</p>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-100 via-amber-200 to-pink-300 bg-clip-text text-transparent">
                    {CONFIG.name}
                  </h1>
                  <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed max-w-md mx-auto md:mx-0">
                    {CONFIG.heroLine}
                  </p>
                  
                  <div className="pt-2">
                    <p className="text-xs font-semibold tracking-wider text-rose-300 uppercase mb-2">
                      ⏳ Time Capsule Since We Met:
                    </p>
                    <TimeCapsuleCounter startDate={CONFIG.metOn} />
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => go(2)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Explore Photo Memories <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center max-w-sm mx-auto w-full space-y-2">
                  <BirthdayCake blown={candlesBlown} onBlow={blowCandles} />
                  <p className="font-serif italic text-lg text-rose-200">
                    {candlesBlown ? "✨ Wish Granted! Happy Birthday! ✨" : "👇 Tap on the cake to blow the candles!"}
                  </p>
                </div>
              </section>
            )}

            {/* SCENE 2: Chapter One - Photo Memories Carousel */}
            {scene === 2 && (
              <section className="max-w-3xl mx-auto w-full space-y-6">
                <div className="text-center space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter one</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    Moments captured in time <span className="text-rose-300">📸</span>
                  </h2>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative group rounded-2xl overflow-hidden bg-rose-900/40 border border-white/30 aspect-[4/3] shadow-lg flex items-center justify-center">
                      <PhotoWithFallback
                        key={memory.photo}
                        src={memory.photo}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fallback={<MemoryArt kind={MEMORY_ART_BY_SUBTITLE[memory.subtitle] || "call"} />}
                      />
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-center">
                        <p className="text-xs text-rose-100 font-serif italic">"{memory.caption}"</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-center md:text-left">
                      <span className="inline-block px-3 py-1 rounded-full bg-rose-400/20 text-rose-200 font-serif italic text-xs border border-rose-300/30">
                        {memory.date}
                      </span>
                      <h3 className="font-serif text-2xl font-bold leading-snug text-white">{memory.title}</h3>
                      <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">{memory.text}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      disabled={memoryIndex === 0}
                      onClick={() => setMemoryIndex((v) => v - 1)}
                      className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    {memoryIndex < CONFIG.moments.length - 1 ? (
                      <button
                        onClick={() => setMemoryIndex((v) => v + 1)}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 transition-all cursor-pointer"
                      >
                        Next <ChevronRight size={14} className="inline" />
                      </button>
                    ) : (
                      <button
                        onClick={() => go(3)}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 transition-all cursor-pointer"
                      >
                        Take Vibe Quiz <ChevronRight size={14} className="inline" />
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* SCENE 3: Chapter Two - Vibe Check Quiz */}
            {scene === 3 && (
              <section className="max-w-xl mx-auto w-full space-y-6">
                <div className="text-center space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter two</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    Supreme Court <span className="text-rose-300 italic">Vibe Check 🎯</span>
                  </h2>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-rose-300 uppercase tracking-widest border-b border-white/10 pb-3">
                    <span>Question {quizIndex + 1} of {CONFIG.quiz.length}</span>
                    <span>Score: {quizScore}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                    {CONFIG.quiz[quizIndex].q}
                  </h3>

                  <div className="space-y-3 pt-2">
                    {CONFIG.quiz[quizIndex].options.map((opt, idx) => {
                      const isChosen = quizSelected === idx;
                      const isCorrect = idx === CONFIG.quiz[quizIndex].ans;
                      return (
                        <button
                          key={opt}
                          disabled={quizSelected !== null}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all text-sm font-medium flex items-center justify-between cursor-pointer ${
                            quizSelected !== null
                              ? isCorrect
                                ? "bg-emerald-500/30 border-emerald-400 text-white font-bold"
                                : isChosen
                                ? "bg-rose-500/30 border-rose-400 text-rose-200"
                                : "bg-white/5 border-white/10 opacity-50"
                              : "bg-white/10 border-white/20 hover:bg-white/20 hover:translate-x-1"
                          }`}
                        >
                          <span>{opt}</span>
                          {quizSelected !== null && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSelected !== null && (
                    <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-300/40 text-xs text-rose-100 space-y-1">
                      <p className="font-bold text-rose-200">
                        {quizSelected === CONFIG.quiz[quizIndex].ans ? "🎉 Sahi Jawaab!" : "💡 Fun Fact:"}
                      </p>
                      <p>{CONFIG.quiz[quizIndex].fact}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={() => go(2)}
                      className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>

                    {quizSelected !== null && (
                      <button
                        onClick={nextQuizQuestion}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 transition-all cursor-pointer"
                      >
                        {quizIndex < CONFIG.quiz.length - 1 ? "Next Question" : "See Important People"} <ChevronRight size={14} className="inline" />
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* SCENE 4: Chapter Three - People Who Love You */}
            {scene === 4 && (
              <section className="max-w-2xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter three</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    People Who Make You Smile <Users className="inline text-rose-300 ml-1" size={28} />
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-2">
                  {CONFIG.importantPeople.map((person, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-3 hover:scale-105 transition-all shadow-xl flex flex-col items-center"
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rose-300/50 shadow-md bg-rose-900/40 flex items-center justify-center relative">
                        <PhotoWithFallback
                          src={person.photo}
                          alt={person.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          fallback={<PeopleArt kind={PEOPLE_ART_BY_NAME[person.name] || "circle"} />}
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-white">{person.name}</h4>
                        <p className="text-[10px] text-rose-300 font-semibold uppercase tracking-wider">{person.relation}</p>
                      </div>
                      <p className="text-xs text-rose-100/80 italic">{person.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(3)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(5)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    Watch Video Message <Video size={16} className="inline ml-1" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 5: Chapter Four - Recorded Video Message */}
            {scene === 5 && (
              <section className="max-w-xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter four</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    A Special Video Message 🎥
                  </h2>
                </div>

                <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black border border-white/20 aspect-video flex items-center justify-center group shadow-xl mx-auto"
                    style={videoAspect ? { aspectRatio: String(videoAspect), width: `min(100%, ${(70 * videoAspect).toFixed(1)}vh)` } : undefined}
                  >
                    <video
                      key={videoRetry}
                      ref={videoRef}
                      src={CONFIG.videoSrc}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        const v = e.target;
                        console.info("[video] metadata loaded:", CONFIG.videoSrc, `${v.videoWidth}x${v.videoHeight}`, `${v.duration}s`);
                        if (v.videoWidth && v.videoHeight) setVideoAspect(v.videoWidth / v.videoHeight);
                      }}
                      onCanPlay={() => { setVideoReady(true); setVideoError(null); }}
                      onPlay={handleVideoPlay}
                      onPause={handleVideoStop}
                      onEnded={handleVideoStop}
                      onError={(e) => handleVideoError(e.currentTarget)}
                    />

                    {!videoReady && !videoError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-rose-100 pointer-events-none">
                        Video load ho rahi hai… 🎞️
                      </div>
                    )}

                    {videoError && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-rose-950/90 p-4 text-center overflow-y-auto">
                        <p className="text-sm text-rose-50 font-semibold leading-snug">⚠️ {videoError.message}</p>
                        {videoError.detail && (
                          <p className="text-[10px] text-rose-200/70 font-mono leading-snug break-words max-w-full">{videoError.detail}</p>
                        )}
                        <button
                          type="button"
                          onClick={retryVideo}
                          className="min-h-[44px] px-6 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          Retry ↻
                        </button>
                      </div>
                    )}

                    {!isPlayingVideo && !videoError && (
                      <button
                        onClick={toggleVideo}
                        aria-label="Play video"
                        className="absolute p-5 rounded-full bg-rose-500/80 text-white hover:bg-rose-500 hover:scale-110 transition-all cursor-pointer shadow-2xl backdrop-blur-md"
                      >
                        <Play size={28} className="ml-1" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-rose-200/80 italic">
                    {isPlayingVideo ? "▶ Playing Tanish's message..." : "Tap play to watch the video note"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(4)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(6)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    See Court Verdicts <Scale size={16} className="inline ml-1" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 6: Chapter Five - Supreme Court Verdicts */}
            {scene === 6 && (
              <section className="max-w-2xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter five</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    Supreme Court's Official Verdicts ⚖️
                  </h2>
                </div>

                <div className="space-y-4 py-2">
                  {CONFIG.verdicts.map((v, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between text-left gap-4 shadow-lg hover:bg-white/15 transition-all"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-amber-200">{v.title}</h4>
                        <p className="text-xs text-rose-100/90 leading-relaxed">{v.verdict}</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                        {v.stamp}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(5)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(7)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    Open 21 Notes Jar 🫙 <ChevronRight size={18} className="inline" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 7: NEW CHAPTER - 21 Heart Notes Inside Magical Jar 🫙💖 */}
            {scene === 7 && (
              <section className="max-w-xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">special chapter</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    The Jar of 21 Heart Notes 🫙💖
                  </h2>
                  <p className="text-xs text-rose-200/70">
                    Is Glass Jar mein 21 dil bhari baatein hain! Jar kholo, aur ek-ek karke padho.
                  </p>
                </div>

                {/* Glass Jar Graphic */}
                <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative flex flex-col items-center justify-center space-y-4">
                  
                  {/* Interactive Jar */}
                  <div
                    onClick={popJarHeart}
                    className={`relative w-40 h-52 border-4 border-white/40 rounded-b-3xl rounded-t-xl bg-gradient-to-b from-white/10 via-rose-300/10 to-rose-500/20 shadow-[0_0_30px_rgba(255,182,184,0.3)] cursor-pointer flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
                      jarShaking ? "animate-bounce scale-110" : "hover:scale-105"
                    }`}
                  >
                    {/* Jar Lid */}
                    <div className="absolute top-0 inset-x-4 h-4 bg-amber-200/60 rounded-t-lg border-b border-white/40" />

                    {/* Glowing Floating Hearts Inside */}
                    <div className="flex flex-wrap justify-center gap-2 p-4 animate-pulse">
                      <span className="text-xl">💖</span>
                      <span className="text-2xl">💝</span>
                      <span className="text-lg">💗</span>
                      <span className="text-2xl">💕</span>
                      <span className="text-xl">💖</span>
                      <span className="text-lg">💓</span>
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200 mt-2 bg-black/30 px-3 py-1 rounded-full border border-white/20">
                      {jarIndex === null ? "TAP ME ME! ✨" : "OPENED 💖"}
                    </p>
                  </div>

                  {/* Sequential Heart Note (Note 1 → 21, never random) */}
                  {jarIndex !== null && (
                    <div
                      key={jarIndex}
                      className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/30 via-pink-500/30 to-rose-500/30 border border-rose-300/50 shadow-2xl space-y-3 max-w-md w-full"
                      style={{ animation: "jarNoteIn .7s ease both" }}
                    >
                      <style>{`
                        @keyframes jarNoteIn { from { opacity: 0; transform: translateY(14px) scale(.96); } to { opacity: 1; transform: none; } }
                        @keyframes jarHeartOpen { 0% { transform: scale(.2) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.25) rotate(6deg); opacity: 1; } 100% { transform: scale(1) rotate(0); } }
                        @media (prefers-reduced-motion: reduce) { .jar-heart-open { animation: none !important; } }
                      `}</style>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-amber-200">
                        Note {jarIndex + 1} of {CONFIG.jar21Notes.length}
                      </p>
                      <div
                        className="jar-heart-open w-12 h-12 mx-auto rounded-full bg-rose-400/20 flex items-center justify-center text-rose-200 text-2xl"
                        style={{ animation: "jarHeartOpen .8s ease both" }}
                      >
                        💖
                      </div>
                      <p className="font-serif text-sm sm:text-base text-white leading-relaxed">
                        {CONFIG.jar21Notes[jarIndex]}
                      </p>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => stepJarNote(-1)}
                          disabled={jarIndex === 0}
                          className="inline-flex items-center justify-center gap-1 min-h-[44px] px-4 rounded-full bg-white/10 border border-white/25 text-xs text-rose-100 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                        >
                          <ChevronLeft size={14} /> Previous
                        </button>

                        {jarIndex < CONFIG.jar21Notes.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => stepJarNote(1)}
                            className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            Next Note ❤️
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={finishJar}
                            disabled={jarDone}
                            className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-gradient-to-r from-amber-200 to-pink-300 text-rose-950 font-bold text-xs shadow hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-80 disabled:cursor-default"
                          >
                            {jarDone ? "All 21 Notes Opened 💖" : "Finish ❤️"}
                          </button>
                        )}
                      </div>

                      {jarDone && jarIndex === CONFIG.jar21Notes.length - 1 && (
                        <p className="text-xs text-amber-100 italic pt-1">
                          💖 Saare 21 notes khul gaye! Ab chaho toh Previous se dobara padh sakti ho.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(6)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(8)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    Memory Spots <MapPin size={16} className="inline ml-1" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 8: Chapter Seven - Memory Spots Map */}
            {scene === 8 && (
              <section className="max-w-2xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter six</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    Memory Spots We Remember 📍
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                  {CONFIG.memorySpots.map((spot, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-2 hover:scale-105 transition-all text-center shadow-lg"
                    >
                      <MapPin size={28} className="mx-auto text-rose-300" />
                      <h4 className="font-serif text-base font-bold text-white">{spot.place}</h4>
                      <p className="text-[10px] text-amber-200 uppercase font-semibold">{spot.spot}</p>
                      <p className="text-xs text-rose-100/80 italic">{spot.note}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(7)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(9)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    Open Sealed Letter <ChevronRight size={18} className="inline" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 9: Chapter Eight - Passcode Sealed Letter */}
            {scene === 9 && (
              <section className="max-w-md mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">chapter seven</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    A note sealed with care.
                  </h2>
                  <p className="text-xs text-rose-200/70">
                    Yeh letter locked hai! Isko kholne ke liye password chahiye.
                  </p>
                </div>

                <div
                  onClick={() => {
                    if (letterUnlocked) {
                      setLetterOpen(true);
                    } else {
                      setShowPinModal(true);
                    }
                  }}
                  className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all cursor-pointer group hover:scale-105 relative overflow-hidden"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-300 group-hover:rotate-6 transition-transform">
                    {letterUnlocked ? <MailOpen size={48} strokeWidth={1.2} /> : <Lock size={44} strokeWidth={1.2} />}
                  </div>
                  <h3 className="font-serif text-2xl font-bold">To Supreme Court</h3>
                  <p className="text-xs text-rose-300 mt-1">
                    {letterUnlocked ? "Unlocked! Click to read animated letter" : "🔒 Click to enter password"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(8)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => go(10)}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                  >
                    A Little Note 🤍 <ChevronRight size={18} className="inline" />
                  </button>
                </div>
              </section>
            )}

            {/* SCENE 10: Sorry Letter */}
            {scene === 10 && (
              <SorryLetterScene
                onBack={() => go(9)}
                onNext={() => go(11)}
                onHug={() => {
                  setConfettiBlast(true);
                  setTimeout(() => setConfettiBlast(false), 2000);
                }}
              />
            )}

            {/* SCENE 11: Finale */}
            {scene === 11 && (
              <section className="max-w-xl mx-auto w-full space-y-6 text-center">
                <div className="space-y-1">
                  <p className="font-serif italic text-2xl text-rose-200">finale</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-100 via-amber-200 to-pink-300 bg-clip-text text-transparent">
                    Tum hamesha khush raho.
                  </h2>
                </div>

                <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                  <ParticleHeart replay={replay} />
                  
                  <div className="space-y-2 pt-2">
                    {CONFIG.finale.map((line, idx) => (
                      <p key={idx} className="font-serif text-lg sm:text-xl text-rose-100">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed italic">
                      "{CONFIG.closingNote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <p className="text-xs font-semibold text-amber-200 flex items-center justify-center gap-1">
                      <Sparkles size={14} /> Make a Birthday Wish to the Universe:
                    </p>

                    {!wishSent ? (
                      <form onSubmit={handleSendWish} className="flex gap-2">
                        <input
                          type="text"
                          value={wishText}
                          onChange={(e) => setWishText(e.target.value)}
                          placeholder="Type your wish here..."
                          className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-rose-200/50 focus:outline-none focus:border-rose-300"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-300 to-pink-300 text-rose-950 font-bold text-xs hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Send <Send size={12} />
                        </button>
                      </form>
                    ) : (
                      <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/40 text-xs text-amber-100 animate-pulse">
                        🌟 Your wish has been sent into the birthday stars! ✨
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => go(10)}
                    className="inline-flex items-center gap-1 text-xs text-rose-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => setReplay((r) => r + 1)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    <RotateCcw size={14} /> Replay Heart Beat
                  </button>
                </div>

                <FinaleLastSceneButton onClick={() => go(12)} />
              </section>
            )}

          </main>

          <footer className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-rose-200/50">
            <span>Supreme Court's Birthday Celebration</span>
            <span>Made with ♡ by {CONFIG.from}</span>
          </footer>

          {/* Passcode Modal */}
          {showPinModal && (
            <div
              onClick={() => setShowPinModal(false)}
              className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-sm w-full bg-rose-900/90 text-rose-50 p-6 sm:p-8 rounded-3xl shadow-2xl border border-rose-400/30 space-y-4 text-center"
              >
                <button
                  onClick={() => setShowPinModal(false)}
                  className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300">
                  <KeyRound size={28} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold">Secret Password Required</h3>
                  <p className="text-xs text-rose-200/80 mt-1">
                    Is letter ko kholne ke liye Tanish ke mobile ka password daalo:
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-4 pt-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="****"
                    className="w-full text-center text-2xl tracking-[10px] font-bold py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:border-rose-300 text-white placeholder-rose-300/40"
                    autoFocus
                  />

                  {pinError && (
                    <p className="text-xs text-rose-300 font-semibold animate-pulse">
                      ❌ Galat password! Hint: 1326
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 text-rose-950 font-bold text-sm shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    Unlock Letter ✨
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Animated Letter Modal */}
          {letterOpen && (
            <AnimatedLetter
              paragraphs={CONFIG.letter}
              from={CONFIG.from}
              onClose={() => setLetterOpen(false)}
            />
          )}

        </div>
      )}
    </div>
  );
}

export default App;