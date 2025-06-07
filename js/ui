// ─── DRAG & MINIMIZE ───────────────────────────────────────────────────────
const guestbook   = document.getElementById('guestbook');
const gbHeader    = guestbook.querySelector('.gb-header');
const minimizeBtn = guestbook.querySelector('.gb-minimize');

let isDragging = false, offsetX = 0, offsetY = 0;
gbHeader.addEventListener('mousedown', e => {
  if (e.target === minimizeBtn) return;
  isDragging = true;
  const rect = guestbook.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  guestbook.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  guestbook.style.left   = `${e.clientX - offsetX}px`;
  guestbook.style.top    = `${e.clientY - offsetY}px`;
  guestbook.style.right  = 'auto';
  guestbook.style.bottom = 'auto';
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  guestbook.style.cursor = 'default';
});
minimizeBtn.addEventListener('click', () => {
  guestbook.classList.toggle('minimized');
});
