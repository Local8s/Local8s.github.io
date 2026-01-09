
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  onChildAdded,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

/* ------------------ Firebase Config ------------------ */
const firebaseConfig = {
  apiKey: "AIzaSyDFUmElnuRTT0Ibv9yrs-evnHM74iH_Biw",
  authDomain: "l8-guestbook.firebaseapp.com",
  databaseURL: "https://l8-guestbook-default-rtdb.firebaseio.com",
  projectId: "l8-guestbook",
  storageBucket: "l8-guestbook.firebasestorage.app",
  messagingSenderId: "917726834255",
  appId: "1:917726834255:web:67ccde2898edf876d9c43a",
  measurementId: "G-DV3X7Y672C"
};

/* ------------------ Init Firebase ------------------ */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const guestbookRef = ref(db, "guestbook");
const orderedRef = query(guestbookRef, orderByChild("ts"));

/* ------------------ DOM Elements ------------------ */
const messagesEl = document.getElementById("gbMessages");
const inputEl = document.getElementById("gbText");
const submitBtn = document.getElementById("gbSubmit");
const guestbookEl = document.getElementById("guestbook"); // optional

/* ------------------ Admin Flag ------------------ */
const isAdmin =
  new URLSearchParams(window.location.search).get("admin") === "1";

/* ------------------ Helpers ------------------ */
function formatDate(ts) {
  if (!ts || typeof ts !== "number") return "";
  const d = new Date(ts);
  if (isNaN(d)) return "";
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const yy = String(d.getFullYear()).slice(-2);
  return `${m}/${day}/${yy}`;
}

function shortenUrl(url) {
  const domain = new URL(url).hostname.replace("www.", "");
  return `<a href="${url}" target="_blank" rel="noopener">${domain}</a>`;
}

/* ------------------ Listen for Messages ------------------ */
onChildAdded(orderedRef, snap => {
  const data = snap.val();
  if (!data || !data.text) return;

  const ts = typeof data.ts === "number" ? data.ts : Date.now();
  const div = document.createElement("div");
  div.className = "gb-message";

  const linkedText = data.text.replace(
    /(https?:\/\/[^\s]+)/g,
    match => shortenUrl(match)
  );

  if (data.admin) {
    div.innerHTML = `
      <span class="gb-admin-label">MODERATOR:</span>
      ${linkedText}
    `;
  } else {
    div.innerHTML = `
      <span class="msg-date">[${formatDate(ts)}]:</span>
      ${linkedText}
    `;
  }

  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});

/* ------------------ Submit Message ------------------ */
submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const txt = inputEl.value.trim();
  if (!txt) return;

  push(guestbookRef, {
    text: txt,
    ts: serverTimestamp(),
    admin: isAdmin
  });

  inputEl.value = "";
});

/* ------------------ Enter Key Submit ------------------ */
inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitBtn.click();
  }
});

/* ------------------ Prevent Space Propagation ------------------ */
inputEl.addEventListener("keydown", e => {
  if (e.key === " ") {
    e.stopPropagation();
  }
});

/* ------------------ Mobile Minimize (Optional) ------------------ */
function checkMobileAndMinimize() {
  if (
    guestbookEl &&
    window.matchMedia("(max-width: 600px)").matches
  ) {
    guestbookEl.classList.add("minimized");
  }
}

