  document.title = "Local 8's Radio";
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audio = document.getElementById('audio');
    const trackName = document.getElementById('track-name');
    const timeDisplay = document.getElementById('time');
    const gif = document.getElementById('gif');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

// ─── SONG LIST ──────────────────────────────────────────────────────────────
    const songs = [
    
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/051725_HOUSE_L8.mp3',
        name: 'L8s RADIO 98.1FM'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/060325_MIX_L8.mp3',
        name: 'L8s RADIO 101.5FM'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/040825_DISCO_L8.mp3',
        name: 'L8s RADIO 97.7FM'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/032825_ALT_L8.mp3',
        name: 'L8s RADIO 104.3FM'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/040125_TECH_HOUSE_L8.mp3',
        name: 'L8s RADIO 92.1FM'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/032125_HOUSE_L8.mp3',
        name: 'L8s RADIO NEW! 89.5FM'
      },
     {
        src: 'https://file.garden/aGGJpwNLWActgKKi/070725_ELECTRO_L8s.mp3',
        name: 'L8s RADIO NEW! 88.6FM'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/071725_MIX_L8.mp3',
        name: 'L8s RADIO NEW! 93.3FM'
      }
    ];


function initPlayer() {
  audio.volume = 0.7;
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  audio.src = randomSong.src;
  trackName.textContent = randomSong.name;


  setTimeout(() => {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {

          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
          gif.style.display = 'block';
          playPauseBtn.classList.add('playing');
          document.title = `▶ ${randomSong.name}`;
        })
        .catch(err => {

          console.log("Autoplay prevented, user interaction required");
          playIcon.style.display = 'block';
          pauseIcon.style.display = 'none';
        });
    }
  }, 3000); 
}


// ─── TIME ──────────────────────────────────────────────────────────────
    function formatTime(sec) {
      const minutes = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    function updateTime() {
      timeDisplay.textContent = formatTime(audio.currentTime);
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        playPauseBtn.click();
      }
    });


// ─── PLAY/PAUSE ──────────────────────────────────────────────────────────────
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        gif.style.display = 'block';
        playPauseBtn.classList.add('playing');
        document.title = `▶ ${trackName.textContent}`;
      } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        gif.style.display = 'none';
        playPauseBtn.classList.remove('playing');
        document.title = "Local 8's Radio";
      }
    });


    window.addEventListener('load', initPlayer);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);


document.querySelectorAll('.station').forEach(el => {
  el.addEventListener('click', () => {
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
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
});
