document.addEventListener('DOMContentLoaded', () => {

  // --- Elements ---
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const surpriseBtn = document.getElementById('surprise');
  const slideImage = document.getElementById('slideImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');
  const surpriseMessage = document.getElementById('surpriseMessage');

  if(!slideImage){ console.error("Missing #slideImage"); return; }

  // --- Slideshow ---
  const numImages = 39;
  const folder = 'assets/images/';
  const prefix = 'photo';
  const ext = '.jpg';
  const zeroPad = n => n.toString().padStart(2,'0');
  const slides = [];
  for(let i=1;i<=numImages;i++){
      slides.push(`${folder}${prefix}${zeroPad(i)}${ext}`);
  }

  let current = 0;
  let slideInterval = null;

  function showSlide(n){
    current = (n + slides.length) % slides.length;
    slideImage.style.opacity = 0;
    setTimeout(()=>{
      slideImage.src = slides[current];
      slideImage.style.opacity = 1;
    }, 200);
    updateDots();
  }

  function nextSlide(){ showSlide(current+1); }
  function prevSlide(){ showSlide(current-1); }
  function startAuto(){ stopAuto(); slideInterval = setInterval(nextSlide, 5000); }
  function stopAuto(){ if(slideInterval) clearInterval(slideInterval); slideInterval=null; }
  function resetAuto(){ stopAuto(); startAuto(); }

  function createDots(){
    if(!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_,i)=>{
      const d = document.createElement('button');
      d.className = 'dot';
      d.type='button';
      d.setAttribute('aria-label',`Show photo ${i+1}`);
      d.addEventListener('click',()=>{ showSlide(i); resetAuto(); });
      dotsContainer.appendChild(d);
    });
    updateDots();
  }

  function updateDots(){
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx)=> dot.classList.toggle('active', idx===current));
  }

  slides.forEach(src => { const img = new Image(); img.src = src; });

  if(nextBtn) nextBtn.addEventListener('click',()=>{ nextSlide(); resetAuto(); });
  if(prevBtn) prevBtn.addEventListener('click',()=>{ prevSlide(); resetAuto(); });

  createDots();
  showSlide(0);
  startAuto();

  // --- Music button ---
  if(playBtn && bgm){
    let playing = false;
    playBtn.addEventListener('click', async()=>{
      try{
        if(!playing){ await bgm.play(); playing=true; playBtn.textContent="Pause Music"; }
        else{ bgm.pause(); playing=false; playBtn.textContent="Play Music"; }
      } catch(err){ console.warn("Playback failed", err); }
    });
  }

  // --- Confetti ---
  if(confettiBtn){
    confettiBtn.addEventListener('click', ()=>{
      const count = 30;
      for(let i=0;i<count;i++){
        const el = document.createElement('div');
        el.style.position='fixed';
        el.style.left=Math.random()*100+'vw';
        el.style.top='-10px';
        el.style.width=el.style.height=Math.random()*10+8+'px';
        el.style.background=`hsl(${Math.random()*360} 80% 60%)`;
        el.style.opacity='0.95';
        el.style.zIndex=9999;
        el.style.borderRadius='2px';
        el.style.pointerEvents='none';
        el.style.transition='transform 2s linear, top 2s ease-in, opacity 2s linear';
        document.body.appendChild(el);
        requestAnimationFrame(()=>{
          el.style.top=Math.random()*70+20+'vh';
          el.style.transform=`translateY(200px) rotate(${Math.random()*720}deg)`;
          el.style.opacity='0';
        });
        setTimeout(()=>el.remove(),2200);
      }
    });
  }

  // --- Heart surprise ---
  if(surpriseBtn && surpriseMessage){
    surpriseBtn.addEventListener('click', ()=>{
      surpriseBtn.classList.add('revealed');
      surpriseBtn.disabled = true;
      surpriseMessage.textContent = `Surprise! I hope your eyes widened as much as they could and I hope you like this super basic website that was supposed to be easy but took me way too long to make. But I had this idea a few months ago after goin on tiktok and seeing people do this for their long distance POOKIE and I wanted to try it out, and who better deserves this investment of time (and skipping dinner) other than you! I hope you try to enjoy your birthday even though I'm not there, and make sure you eat extra cake for me! I don't know how much text I can fit here but I won't make it too emotional haha, I already sent u an emotional essay when I left Waterloo in June. Anyways, enjoy your birthday unc, I love you soooooo much, and I miss you way too much to put into words. Here's to many more years of Samko blessing this planet (and my life) with her art, her nonstop yap about 2D/3D (Korean) men, anime, and a lifetime of friendship between us. Love u pookie ❤️ (also this music compilation is very long IM SORRY BUT I HOPE YOU LET IT PLAY ALL THE WAY)`;
    });
  }

  // --- Keyboard navigation ---
  document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight'){ nextSlide(); resetAuto(); }
    if(e.key==='ArrowLeft'){ prevSlide(); resetAuto(); }
  });

});
