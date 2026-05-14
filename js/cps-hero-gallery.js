// Dynamic CPS hero gallery for cps-enrollment.html
(function () {
  const heroPhotos = [
    {
      src: 'photo_ecolier_CPS.jpg',
      alt: 'Photo CPS 1'
    },
    {
      src: 'images/gallery/photo_ecolier_CPS2.jpg',
      alt: 'Photo CPS 2'
    }
  ];

  function renderCpsHeroPhotos() {
    const container = document.getElementById('cps-hero-photos');
    if (!container || heroPhotos.length === 0) return;

    container.innerHTML = `
      <div class="relative overflow-hidden rounded-[2rem] shadow-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div id="cps-hero-slides" class="relative h-80 sm:h-96 md:h-[28rem] lg:h-[32rem]"></div>
      </div>
    `;

    const slidesEl = document.getElementById('cps-hero-slides');
    let currentIndex = 0;
    let timerId = null;

    heroPhotos.forEach((photo) => {
      const slide = document.createElement('figure');
      slide.className = 'absolute inset-0 transition-opacity duration-1000 ease-in-out';
      slide.style.opacity = slidesEl.children.length === 0 ? '1' : '0';
      slide.style.pointerEvents = slidesEl.children.length === 0 ? 'auto' : 'none';
      slide.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" class="object-contain w-full h-full bg-white p-2 sm:p-3" loading="lazy">
      `;

      const img = slide.querySelector('img');
      img.onerror = function () {
        slide.remove();
      };

      slidesEl.appendChild(slide);
    });

    function getSlides() {
      return Array.from(slidesEl.querySelectorAll('figure'));
    }

    function goToSlide(index) {
      const slides = getSlides();
      if (slides.length === 0) return;

      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      slides.forEach((slide, i) => {
        slide.style.opacity = i === currentIndex ? '1' : '0';
        slide.style.pointerEvents = i === currentIndex ? 'auto' : 'none';
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startAutoPlay() {
      if (timerId) return;
      timerId = setInterval(nextSlide, 5000);
    }

    goToSlide(0);
    startAutoPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCpsHeroPhotos);
  } else {
    renderCpsHeroPhotos();
  }
})();
