// Dynamically load CPS photos in the donation page
// Usage: Place a <div id="cps-photos"></div> where you want the gallery

const cpsPhotos = [
  {
    src: 'photo_ecolier_CPS.jpg',
    alt: 'Photo CPS 1',
    title: 'Photo CPS 1',
    date: '2026-03-01',
    mobileOrder: 2
  },
  {
    src: 'images/gallery/photo_ecolier_CPS2.jpg',
    alt: 'Photo CPS 2',
    title: 'Photo CPS 2',
    date: '2026-03-02',
    mobileOrder: 1
  }
  // Ajoutez d'autres photos ici si besoin
];

function renderCpsPhotos() {
  const container = document.getElementById('cps-photos');
  if (!container) return;
  container.innerHTML = cpsPhotos.map(photo => `
    <div class="gallery-item cps-photo-card bg-white rounded-lg p-4 shadow-lg" style="--cps-mobile-order:${photo.mobileOrder || 99}" data-title="${photo.title}" data-date="${photo.date}">
      <img src="${photo.src}" alt="${photo.alt}" class="cps-photo-image mx-auto w-full h-56 object-cover rounded shadow mb-4 hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.style.display='none';">
      <div class="cps-photo-title text-center text-gray-700 font-medium">${photo.title}</div>
      <div class="cps-photo-date text-center text-gray-500 text-xs">${photo.date}</div>
    </div>
  `).join('');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCpsPhotos);
} else {
  renderCpsPhotos();
}
