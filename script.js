// ============================================
//   NIKA ABASHIDZE — PORTFOLIO
//   script.js
// ============================================

// ── NAV ──────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── SCROLL REVEAL ────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── PORTFOLIO FILTER ─────────────────────────
function filterCards(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
}

// ── VIDEO MODAL ──────────────────────────────
// ↓ Paste your YouTube links in the video: '' fields below ↓
const modalData = {
  animation1: { title: 'Audio Post Production #1 — Animation',        desc: 'Music · Sound Design · Audio Mixing',                                         video: 'https://www.youtube.com/watch?v=kW0Paxotqyo' , thumb: ''},
  animation2: { title: 'Audio Post Production #2 — Short Animation',   desc: 'Sound design synchronized with visuals.',                                    video: 'https://www.youtube.com/shorts/wjtb69nZfTM',   thumb: 'public/images/Bird.png' },
  animation3: { title: 'Dumbots — Jump Shoes',                         desc: 'Focused on synced movement sounds.',                                          video: 'https://www.youtube.com/watch?v=BHmFQ96LtMY', thumb: '' },
  game1:      { title: 'LIFE — GDG Kutaisi Hackathon 2025 (Winner Project)',            desc: 'Educational Game — "Learning Is For Everyone". UE5 | Audio direction | composition.', video: 'https://youtu.be/kizOK2RtQkA', thumb: 'public/images/LIFE.png' },
  game2:      { title: 'Global Game Jam 2026 ',            desc: 'Game on theme "Mask" — "The Goat Ate The vineyard". UE5 | Sound Design |Game Music |',     video: 'https://youtu.be/FeM80mWhXqs', thumb: 'public/images/GoatAteVineyard.png' },
  game3:      { title: 'TSU Game Jam 2025',            desc: 'DevTherapy Hackathon 2025 (TSU) Game Audio - "Bend It All" ',                                 video: 'https://youtu.be/oQKzQA1KKy0', thumb: 'public/images/TSU_GameJam.png' },
  guitar1:    { title: 'Tango En Skai — Roland Dyens',                 desc: 'Live performance at solo guitar concert, Komarovi Campus School.',            video: 'https://www.youtube.com/watch?v=7lk_tFkkTT8', thumb: 'public/images/Tango.jpg' },
  guitar2:    { title: 'S.L. Weiss — Fantasie',                        desc: 'From my classical guitar repertoire.',                                        video: 'https://www.youtube.com/watch?v=kU4sPPl3LBw', thumb: 'public/images/Weiss.jpg' },
  guitar3:    { title: 'Isaac Albéniz — Leyenda',                      desc: 'Solo Guitar Concert at Komarovi Campus School.',                              video: 'https://www.youtube.com/watch?v=v0rwCozHIk8', thumb: 'public/images/Leyenda.png' },
  guitar4:    { title: 'Villa-Lobos — Prelude No.5',                   desc: 'Practice Session recording.',                                                 video: 'https://www.youtube.com/shorts/Kz5SFcbbPcs', thumb: 'public/images/GuitarPoster.jpg' },
};

// Helper: extract YouTube video ID from any YouTube URL
function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function openModal(id) {
  const d = modalData[id];
  if (!d) return;

  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalDesc').textContent = d.desc;

  const c = document.getElementById('modalVideoContainer');
  if (d.video) {
    const ytId = getYouTubeId(d.video);
    if (ytId) {
      // Use youtube-nocookie.com to bypass most embed restrictions
      c.innerHTML = `<iframe
        src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1"
        allowfullscreen
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>`;
    } else {
      // Local video file
      c.innerHTML = `<video src="${d.video}" controls autoplay></video>`;
    }
  } else {
    c.innerHTML = `<div class="modal-placeholder">No video added yet — paste your YouTube link in modalData inside script.js</div>`;
  }

  document.getElementById('videoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Auto-load YouTube thumbnails for cards that have video links, and use custom thumb if provided
function loadThumbnails() {
  document.querySelectorAll('.card').forEach(card => {
    const id = card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (!id) return;
    const d = modalData[id];
    if (!d) return;

    const placeholder = card.querySelector('.card-placeholder');
    if (!placeholder) return;

    const img = document.createElement('img');
    img.className = 'card-thumb';
    img.alt = d.title;

    if (d.thumb) {
      img.src = d.thumb;
      placeholder.replaceWith(img);
    } else if (d.video) {
      const ytId = getYouTubeId(d.video);
      if (ytId) {
        img.src = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        img.onerror = () => { img.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`; };
        placeholder.replaceWith(img);
      }
    }
  });
}

// Run thumbnail loading after page loads
document.addEventListener('DOMContentLoaded', loadThumbnails);

function closeModal() {
  document.getElementById('videoModal').classList.remove('open');
  setTimeout(() => {
    document.getElementById('modalVideoContainer').innerHTML = '';
  }, 350);
  document.body.style.overflow = '';
}

function handleModalBg(e) {
  if (e.target.id === 'videoModal') closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── AUDIO PLAYER ─────────────────────────────
// ↓ Add your MP3 file paths in the src: '' fields below ↓
const tracks = [
  { name: 'Electronic | Orchestral | Tron Feel',               meta: '',              src: 'public/audio/Tron Alike Portfolio.mp3' },
  { name: 'Adventure | Georgian Folk | Jazzy | Game Music',    meta: 'Original Music for Game "Goat Ate The Vineyard"',                  src: 'public/audio/GoatAteVineyard.mp3' },
  { name: 'Electronic | Action | Motivational',                meta: 'Electro sliding Bass',              src: 'public/audio/ElectroBass.mp3' },
  { name: 'Orchestral | Cinematic | Combat',                      meta: '',              src: 'public/audio/OrchestralTest.mp3' },
  { name: 'Drums | Synth | Cellos ',                 meta: '',              src: 'public/audio/Drums(Electro).mp3' },
  { name: 'Your Track Title Here',                             meta: '',              src: '' },
];

let currentTrack = -1;
let isPlaying = false;
const audio = new Audio();

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    document.getElementById('progressFill').style.width =
      (audio.currentTime / audio.duration * 100) + '%';
  }
});

audio.addEventListener('ended', nextTrack);

function playTrack(idx) {
  if (!tracks[idx].src) return;
  currentTrack = idx;
  audio.src = tracks[idx].src;
  audio.play();
  isPlaying = true;
  updatePlayerUI();
}

function togglePlay() {
  if (currentTrack === -1) { playTrack(0); return; }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updatePlayerUI();
}

function prevTrack() {
  if (currentTrack > 0) playTrack(currentTrack - 1);
}

function nextTrack() {
  if (currentTrack < tracks.length - 1) playTrack(currentTrack + 1);
}

function seekAudio(e) {
  if (!audio.duration) return;
  const r = e.currentTarget.getBoundingClientRect();
  audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
}

function updatePlayerUI() {
  document.getElementById('miniName').textContent = tracks[currentTrack].name;
  document.getElementById('miniMeta').textContent = tracks[currentTrack].meta;
  document.getElementById('miniPlayer').classList.add('visible');
  document.getElementById('playPauseIcon').innerHTML = isPlaying
    ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
    : '<polygon points="5,3 19,12 5,21"/>';
  document.querySelectorAll('.track').forEach((el, i) => {
    el.classList.toggle('playing', i === currentTrack);
  });
}
function closePlayer() {
  audio.pause();
  isPlaying = false;
  currentTrack = -1;
  document.getElementById('miniPlayer').classList.remove('visible');
  document.getElementById('progressFill').style.width = '0%';
  document.querySelectorAll('.track').forEach(el => el.classList.remove('playing'));
}
// I use this function to render the track list dynamically from the tracks array, so you can easily add/remove tracks without changing HTML
// Just make sure to add your track info and file path in the tracks array above, and it will show up in the list automatically
function renderTrackList() {
  const list = document.getElementById('trackList');
  list.innerHTML = '';
  tracks.forEach((t, i) => {
    if (!t.name || t.name === 'Your Track Title Here') return;
    list.innerHTML += `
      <div class="track" id="track-${i}" onclick="playTrack(${i})">
        <span class="track-num">0${i + 1}</span>
        <div class="track-info">
          <div class="track-name">${t.name}</div>
          <div class="track-meta">${t.meta}</div>
        </div>
        <div class="track-play"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg></div>
      </div>`;
  });
}

// ── CONTACT FORM ─────────────────────────────
function submitForm() {
  alert('To activate this form, sign up free at formspree.io\nOr email directly: n.abashidze25@gmail.com');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrackList();
  loadThumbnails();
});
