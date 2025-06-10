  // 1) Import everything you need exactly once
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    push,
    query,
    orderByChild,
    onChildAdded
  } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

  // 2) Your Firebase config
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

  // 3) Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db  = getDatabase(app);
  const guestbookRef = ref(db, 'guestbook');
  const orderedRef   = query(guestbookRef, orderByChild('ts'));

  // 4) Element refs
  const messagesEl = document.getElementById('gbMessages');
  const inputEl    = document.getElementById('gbText');
  const submitBtn  = document.getElementById('gbSubmit');

  
  inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitBtn.click();
  }
});

  // 5) Date formatter
  function formatDate(ts) {
    const d   = new Date(ts);
    const m   = d.getMonth() + 1;
    const day = d.getDate();
    const yy  = String(d.getFullYear()).slice(-2);
    return `${m}/${day}/${yy}`;
  }

  // 6) Single listener for both normal & admin messages
onChildAdded(orderedRef, snap => {
  const { text, ts, admin } = snap.val();
  const div = document.createElement('div');
  div.className = 'gb-message';

  if (admin) {
    // ADMIN: message [date]
    div.innerHTML = `
      <span class="gb-admin-label">MODERATOR:</span>
      ${text}
    `;
  } else {
    // Normal users: [date]: message
    div.innerHTML = `<strong>[${formatDate(ts)}]:</strong> ${text}`;
  }

  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});


  // 7) Submit new messages
const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const txt = inputEl.value.trim();
  if (!txt) return;
  push(guestbookRef, {
    text:  txt,
    ts:    Date.now(),
    admin: isAdmin
  });
  inputEl.value = '';
});
function checkMobileAndMinimize() {
  if (window.matchMedia("(max-width: 600px)").matches) {
    guestbookEl.classList.add('minimized');
  }
}

