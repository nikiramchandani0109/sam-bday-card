// Slideshow that loads N numbered photos (photo01.jpg ... photoNN.jpg),
// plus existing music, confetti and surprise functionality.

document.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const surpriseBtn = document.getElementById('surprise');

  // ------------------------------
  // Slideshow configuration
  // ------------------------------
  const numImages = 39;      // Number of photos you have
  const folder = 'assets/images/';
  const prefix = 'photo';
  const ext = '.jpg';
  const zeroPad = (n) => n.toString().padStart(2, '0');

  // Slideshow elements
  const slideImage = document.getElementById('slideImage');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.getElementById('dots');

  // Safety check – run slideshow only if HTML elements exist
  const slideshowEnabled = slideImage && dotsContainer;

  // ------------------------------
  // Build slides
  // ------------------------------
  const slides = [];
  for (let i = 1; i <= numImages; i++) {
    slides.push(`${folder}${prefix}${zeroPad(i)}${ext}`);
  }

  let current = 0;
  let slideInterval = null;

  // ------------------------------
  // Slideshow UI functions
  // ------------------------------
  function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot';
      d.type = 'button';
      d.setAttribute('aria-label', `Show photo ${i + 1}`);
      d.addEventListener('click', () => {
        showSlide(i);
        resetAuto();
      });
      dotsContainer.appendChild(d);
    });
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === current));
  }

  function showSlide(n) {
    if (!slideImage) return;
    current = (n + slides.length) % slides.length;

    // fade effect
    slideImage.style.opacity = 0;
    setTimeout(() => {
      slideImage.src = slides[current];
      slideImage.style.opacity = 1;
    }, 180);

    updateDots();
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  function startAuto() {
    stopAuto();
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = null;
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  // Preload images
  slides.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // ------------------------------
  // Initialize slideshow (if exists)
  // ------------------------------
  if (slideshowEnabled) {
    createDots();
    showSlide(0);
    startAuto();

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
  }

  // ------------------------------
  // Audio play/pause
  // ------------------------------
  let playing = false;

  if (playBtn && bgm) {
    playBtn.addEventListener('click', async () => {
      try {
        if (!playing) {
          await bgm.play();
          playing = true;
          playBtn.textContent = 'Pause Music';
        } else {
          bgm.pause();
          playing = false;
          playBtn.textContent = 'Play Music';
        }
      } catch (err) {
        console.warn('Playback failed:', err);
      }
    });
  }

  // ------------------------------
  // Confetti
  // ------------------------------
  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => launchConfetti());
  }

  // ------------------------------
  // Surprise button
  // ------------------------------
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      surpriseBtn.classList.add('revealed');
      surpriseBtn.disabled = true;
      setTimeout(() => alert('Surprise! Wishing you the happiest birthday 🎂'), 250);
