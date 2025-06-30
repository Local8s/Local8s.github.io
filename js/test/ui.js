// ─── DRAG & MINIMIZE ───────────────────────────────────────────────────────
const guestbook = document.getElementById('guestbook');
const gbHeader = guestbook.querySelector('.gb-header');
const minimizeBtn = guestbook.querySelector('.gb-minimize');

let isDragging = false;
let startX = 0, startY = 0;

gbHeader.addEventListener('pointerdown', e => {
  if (e.target === minimizeBtn) return;
  isDragging = true;
  startX = e.clientX - guestbook.offsetLeft;
  startY = e.clientY - guestbook.offsetTop;
  gbHeader.setPointerCapture(e.pointerId);
  guestbook.style.cursor = 'grabbing';
});

gbHeader.addEventListener('pointermove', e => {
  if (!isDragging) return;
  guestbook.style.left = `${e.clientX - startX}px`;
  guestbook.style.top = `${e.clientY - startY}px`;
});

gbHeader.addEventListener('pointerup', e => {
  isDragging = false;
  gbHeader.releasePointerCapture(e.pointerId);
  guestbook.style.cursor = 'default';
});

minimizeBtn.addEventListener('click', () => {
  guestbook.classList.toggle('minimized');
});

// ─── DROPDOWN ──────────────────────────────────────────────────────────────
function toggleDropdown(el, event) {
  event.stopPropagation();
  const dropdown = el.querySelector('.dropdown-content');

  document.querySelectorAll('.dropdown-content').forEach(menu => {
    if (menu !== dropdown) menu.style.display = 'none';
  });

  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function (e) {
  if (
    e.target.closest('.dropdown') ||
    e.target.closest('.popup-box') ||
    e.target.getAttribute('onclick')?.includes('togglePopup')
  ) {
    return;
  }

  document.querySelectorAll('.dropdown-content').forEach(menu => {
    menu.style.display = 'none';
  });
});

// ─── POPUP TOGGLING ────────────────────────────────────────────────────────
function togglePopup(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function toggleGuestbook() {
  guestbook.classList.remove('minimized');
}

window.togglePopup = togglePopup;
window.toggleGuestbook = toggleGuestbook;

// ─── DRAGGABLE POPUPS ──────────────────────────────────────────────────────
document.querySelectorAll('.popup-box').forEach(popup => {
  let isDragging = false;
  let offsetX, offsetY;

  popup.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    popup.style.cursor = 'grabbing';
    popup.style.transform = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    popup.style.left = `${e.clientX - offsetX}px`;
    popup.style.top = `${e.clientY - offsetY}px`;
    popup.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    popup.style.cursor = 'move';
  });
});

// ─── RADIO PLAYER STATION CLICK HANDLERS ───────────────────────────────────
document.querySelectorAll('.station').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    const index = parseInt(el.getAttribute('data-index'), 10);
    const selectedSong = songs[index];

    audio.src = selectedSong.src;
    audio.play();
    trackName.textContent = selectedSong.name;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    gif.style.display = 'block';
    playPauseBtn.classList.add('playing');
    document.title = `▶ ${selectedSong.name}`;

    document.querySelectorAll('.station').forEach(s => s.classList.remove('current'));
    el.classList.add('current');

    const dropdown = el.closest('.dropdown-content');
    if (dropdown) dropdown.style.display = 'none';
  });
});
