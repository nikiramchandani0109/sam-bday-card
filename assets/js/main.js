// Slideshow that loads N numbered photos (photo01.jpg ... photoNN.jpg),
// plus existing music, confetti and surprise functionality.

document.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const surpriseBtn = document.getElementById('surprise');

  // Slideshow configuration:
  const numImages = 39;                 // <- change this if you add more later
  const folder = 'assets/images/';
  const prefix = 'photo';
  const ext = '.jpg';
  const zeroPad = (n) => n.toString().padStart(2, '0');

  // Slideshow elements
  const slideImage = document.getElementById('slideImage');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.getElementById('dots');

  // Build slides array automatically
  const slides = [];
  for (let i = 1; i <= numImages; i++) {
    slides.push(`${folder}${prefix}${zeroPad(i)}${ext}`);
  }

  let current = 0;
  let slideInterval = null;

  function createDots(){
    dotsContainer.innerHTML = '';
    slides.forEach((_,i)=>{
      const d = document.createElement('button');
      d.className = 'dot';
      d.type = 'button';
      d.setAttribute('aria-label', `Show photo ${i+1}`);
      d.addEventListener('click', ()=>{ showSlide(i); resetAuto(); });
      dotsContainer.appendChild(d);
    });
    updateDots();
  }

  function updateDots(){
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx)=> dot.classList.toggle('active', idx===current));
  }

  function showSlide(n){
    if (!slideImage) return;
    current = (n + slides.length) % slides.length;
    // fade effect
    slideImage.style.opacity = 0;
    setTimeout(()=>{
      slideImage.src = slides[current];
      slideImage.style.opacity = 1;
    }, 180);
    updateDots();
  }

  function nextSlide(){ showSlide(current+1); }
  function prevSlide(){ showSlide(current-1); }

  function startAuto(){ slideInterval = setInterval(nextSlide, 5000); }
  function stopAuto(){ if(slideInterval) clearInterval(slideInterval); slideInterval = null; }
  function resetAuto(){ stopAuto(); startAuto(); }

  // Preload images (non-blocking)
  slides.forEach(src => { const img = new Image(); img.src = src; });

  // Wire slideshow controls
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ nextSlide(); resetAuto(); });
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ prevSlide(); resetAuto(); });

  createDots();
  showSlide(0);
  startAuto();

  // Audio play/pause
  let playing = false;
  if (playBtn) {
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

  if (confettiBtn) confettiBtn.addEventListener('click', () => launchConfetti());

  if (surpriseBtn) surpriseBtn.addEventListener('click', () => {
    surpriseBtn.classList.add('revealed');
    surpriseBtn.disabled = true;
    setTimeout(()=> alert('Surprise! Wishing you the happiest birthday 🎂'), 250);
  });

  // Simple confetti using DOM elements
  function launchConfetti(){
    const count = 30;
    for (let i=0;i<count;i++){ 
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = Math.random()*100 + 'vw';
      el.style.top = '-10px';
      el.style.width = el.style.height = Math.random()*10+8+'px';
      el.style.background = `hsl(${Math.random()*360} 80% 60%)`;
      el.style.opacity = '0.95';
      el.style.zIndex = 9999;
      el.style.borderRadius = '2px';
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      el.style.pointerEvents = 'none';
      el.style.transition = `transform 2s linear, top 2s ease-in, opacity 2s linear`;
      document.body.appendChild(el);
      requestAnimationFrame(()=> {
        el.style.top = (Math.random()*70 + 20) + 'vh';
        el.style.transform = `translateY(200px) rotate(${Math.random()*720}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(()=> el.remove(), 2200);
    }
  }

  // Optional: keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); resetAuto(); }
    if (e.key === 'ArrowLeft') { prevSlide(); resetAuto(); }
  });
});