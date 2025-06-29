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

// new 6/27

function toggleDropdown(el) {
  const dropdown = el.querySelector('.dropdown-content');
  
  // Close other open dropdowns first
  document.querySelectorAll('.dropdown-content').forEach(menu => {
    if (menu !== dropdown) menu.style.display = 'none';
  });

  // Toggle this one
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Optional: close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-content').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});


function togglePopup(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }

  function toggleGuestbook() {
    const guestbook = document.getElementById('guestbook');
    guestbook.classList.remove('minimized');
  }

  // Make popup draggable
  document.querySelectorAll('.popup-box').forEach(popup => {
    let isDragging = false;
    let offsetX, offsetY;

popup.addEventListener('mousedown', e => {
  isDragging = true;
  offsetX = e.clientX - popup.offsetLeft;
  offsetY = e.clientY - popup.offsetTop;
  popup.style.cursor = 'grabbing';
  popup.style.transform = 'none'; // Clear transform when dragging starts
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




window.togglePopup = togglePopup;
window.toggleGuestbook = toggleGuestbook;


