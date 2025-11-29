// Simple interactivity: play/pause music, confetti, reveal message
document.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const surpriseBtn = document.getElementById('surprise');

  let playing = false;
  playBtn.addEventListener('click', async () => {
    // Browsers require user gesture to start audio — that's satisfied by this click
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

  confettiBtn.addEventListener('click', () => {
    launchConfetti();
  });

  surpriseBtn.addEventListener('click', () => {
    surpriseBtn.classList.add('revealed');
    surpriseBtn.disabled = true;
    // Example reveal: show alert or animate; replace with modal or image gallery
    setTimeout(() => alert('Surprise! Wishing you the happiest birthday 🎂'), 250);
  });

  // Simple confetti using DOM elements (tiny demo)
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
});