  document.title = "Local 8's Radio";
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audio = document.getElementById('audio');
    const trackName = document.getElementById('track-name');
    const timeDisplay = document.getElementById('time');
    const gif = document.getElementById('gif');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    // Song list
    const songs = [
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/051725_HOUSE_L8.mp3',
        name: 'L8 101.5FM XPR-DRIFT01N'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/060325_MIX_L8.mp3',
        name: 'L8 105.FM XPR-GLIT02N'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/040825_DISCO_L8.mp3',
        name: 'L8 97.7FM DSC-SPIN01N'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/032825_ALT_L8.mp3',
        name: 'L8 104.3FM ALT-HAZE01M'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/040125_TECH_HOUSE_L8.mp3',
        name: 'L8 92.1FM THS-VOID01N'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/032125_HOUSE_L8.mp3',
        name: 'L8 98.1FM HSE-WAVE02C'
      },
         {
        src: 'https://file.garden/aGGJpwNLWActgKKi/070725_ELECTRO_L8s.mp3',
        name: 'L8 97.7FM DSC-HAZE01C'
      },
        {
        src: 'https://file.garden/aGGJpwNLWActgKKi/071725_MIX_L8.mp3',
        name: 'L8 101.5FM XPR-BOOM03E'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/071925_ALT_L8.mp3',
        name: 'L8 104.3FM ALT-GRIT01E'
      },
        {
        src: 'https://file.garden/aGGJpwNLWActgKKi/080625_EMO_L8.mp3',
        name: 'L8 104.3FM ALT-TEAR01M'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/091125_HOUSE_L8.mp3',
        name: 'L8s RADIO 94.5FM'
      },
       {
        src: 'https://file.garden/aGGJpwNLWActgKKi/091925_TECH_L8.mp3',
        name: 'L8s RADIO 91.7FM'
      },
      {
        src: 'https://file.garden/aGGJpwNLWActgKKi/100325_MBBM_L8s.mp3',
        name: 'L8s RADIO 90.4FM'
      },
      {
       src: 'https://file.garden/aGGJpwNLWActgKKi/111825_PARTY_L8.mp3',
        name: 'L8s RADIO NEW! 102.9FM'
      },
      {
       src: 'https://file.garden/aGGJpwNLWActgKKi/112525_GAS_L8_v2.mp3',
        name: 'L8s RADIO NEW! 89.9FM'
      },
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


document.querySelectorAll('.sub-station').forEach(el => {
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

    document.querySelectorAll('.sub-station').forEach(s => s.classList.remove('current'));
    el.classList.add('current');

    const dropdown = el.closest('.dropdown-content');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
});
