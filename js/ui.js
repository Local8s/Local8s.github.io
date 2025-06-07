// ─── DRAG & MINIMIZE ───────────────────────────────────────────────────────
// 0) Grab your elements
const guestbook   = document.getElementById('guestbook');
const gbHeader    = guestbook.querySelector('.gb-header');
const minimizeBtn = guestbook.querySelector('.gb-minimize');

let isDragging = false;
let startX = 0, startY = 0;

// ── POINTER‐BASED DRAGGING ────────────────────────────────────
gbHeader.addEventListener('pointerdown', e => {
  if (e.target === minimizeBtn) return;
  isDragging = true;
  // calculate offset inside the box
  startX = e.clientX - guestbook.offsetLeft;
  startY = e.clientY - guestbook.offsetTop;
  // capture the pointer so we continue getting events
  gbHeader.setPointerCapture(e.pointerId);
  guestbook.style.cursor = 'grabbing';
});

gbHeader.addEventListener('pointermove', e => {
  if (!isDragging) return;
  guestbook.style.left = `${e.clientX - startX}px`;
  guestbook.style.top  = `${e.clientY - startY}px`;
});

gbHeader.addEventListener('pointerup', e => {
  if (!isDragging) return;
  isDragging = false;
  gbHeader.releasePointerCapture(e.pointerId);
  guestbook.style.cursor = 'default';
});
minimizeBtn.addEventListener('click', () => {
  guestbook.classList.toggle('minimized');
});
