AOS.init()

/* Navegación entre pantallas */
const screens = document.querySelectorAll('.screen')
let current = 0

function show(index) {
  if (index < 0 || index >= screens.length) return
  screens[current].classList.remove('active')
  current = index
  screens[current].classList.add('active')
}

document.querySelectorAll('.next').forEach(btn =>
  btn.addEventListener('click', () => show(current + 1))
)

document.querySelector('.open').onclick = () => show(current + 2)
document.querySelector('.nope').onclick = () => show(current + 1)
document.querySelector('.back').onclick = () => show(current - 1)
document.getElementById('restart').onclick = () => show(0)

/* Galería */
const gallery = document.querySelector('.gallery')
const photos = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg']

photos.forEach(photo => {
  const img = document.createElement('img')
  img.src = `assets/photos/${photo}`
  gallery.appendChild(img)
})

/* Música */
const playlist = [
  'assets/music/What Makes You Beautiful.mp3',
  'assets/music/I Want to Write a Song.mp3',
  'assets/music/Golden Hour.mp3'
]
let currentTrack = 0
const audio = document.getElementById('audio')
const playPause = document.getElementById('playPause')
const songTitle = document.getElementById('songTitle')
const progress = document.getElementById('progress')
const progressContainer = document.querySelector('.progress-container')
const currentTimeEl = document.getElementById('currentTime')
const durationEl = document.getElementById('duration')

songTitle.textContent = decodeURIComponent(
  audio.src.split('/').pop().replace(/\.[^/.]+$/, '')
)

playPause.onclick = () => {
  if (audio.paused) {
    audio.play()
    playPause.textContent = '⏸'
    playPause.classList.add('playing')
  } else {
    audio.pause()
    playPause.textContent = '▶'
    playPause.classList.remove('playing')
  }
}

audio.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % playlist.length
  loadTrack(currentTrack)
})


audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration)
})

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100
  progress.style.width = `${percent}%`
  currentTimeEl.textContent = formatTime(audio.currentTime)
})

progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth
  const clickX = e.offsetX
  audio.currentTime = (clickX / width) * audio.duration
})

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' + s : s}`
}

function loadTrack(index, autoplay = true) {
  audio.src = playlist[index]
  audio.load()

  songTitle.textContent = decodeURIComponent(
    playlist[index]
      .split('/')
      .pop()
      .replace(/\.[^/.]+$/, '')
  )

  if (autoplay) {
    audio.play()
    playPause.textContent = '⏸'
    playPause.classList.add('playing')
  }
}
loadTrack(currentTrack, false)

/* Background */
const canvas = document.getElementById('emoji-bg')
const ctx = canvas.getContext('2d')

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', resize)

const EMOJIS = ['💙','✨','💕','🌸','💖']
const items = Array.from({ length: 20 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: 0.4 + Math.random(),
  vy: 0.4 + Math.random(),
  emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}))

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  items.forEach(e => {
    e.x += e.vx
    e.y += e.vy

    if (e.x <= 0 || e.x >= canvas.width - 24) e.vx *= -1
    if (e.y <= 0 || e.y >= canvas.height - 24) e.vy *= -1

    ctx.font = '24px serif'
    ctx.fillText(e.emoji, e.x, e.y)
  })
  requestAnimationFrame(animate)
}
animate()
