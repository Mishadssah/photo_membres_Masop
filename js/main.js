// MASOP Website JavaScript

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Activity modals
function openActivity(activity) {
    let modalId;
    switch(activity) {
        case 'sante-mentale':
            modalId = 'activitySanteMentale';
            break;
        case 'harcelement':
            modalId = 'activityHarcelement';
            break;
        case 'vbg':
            modalId = 'activityVbg';
            break;
        default:
            return;
    }
    document.getElementById(modalId).classList.remove('hidden');
}

function closeActivity(activity) {
    let modalId;
    switch(activity) {
        case 'sante-mentale':
            modalId = 'activitySanteMentale';
            break;
        case 'harcelement':
            modalId = 'activityHarcelement';
            break;
        case 'vbg':
            modalId = 'activityVbg';
            break;
        default:
            return;
    }
    document.getElementById(modalId).classList.add('hidden');
}

// Bio modals
function openBio(member) {
    let modalId;
    switch(member) {
        case 'ulrick':
            modalId = 'bioUlrick';
            break;
        // Add more cases for other members if needed
        default:
            return;
    }
    document.getElementById(modalId).classList.remove('hidden');
}

function closeBio(member) {
    let modalId;
    switch(member) {
        case 'ulrick':
            modalId = 'bioUlrick';
            break;
        // Add more cases for other members if needed
        default:
            return;
    }
    document.getElementById(modalId).classList.add('hidden');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery filtering and lightbox
(function(){
    const filters = document.querySelectorAll('.filter-btn');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const counts = {};

    function updateCounts(){
        // reset counts
        counts['all'] = items.length;
        items.forEach(i => {
            const m = i.dataset.month || 'unknown';
            counts[m] = (counts[m] || 0) + 1;
        });
        // update UI
        document.getElementById('count-all').textContent = counts['all'] || 0;
        ['2025-12','2026-01','2026-02','2026-03'].forEach(k => {
            const el = document.getElementById('count-' + k.replace(/-/g, '-'));
            if(el) el.textContent = counts[k] || 0;
        });
    }

    function showMonth(month){
        document.getElementById('currentMonthLabel').textContent = (month === 'all') ? 'Tout' : (month === '2025-12' ? 'Décembre 2025' : month === '2026-01' ? 'Janvier 2026' : month === '2026-02' ? 'Février 2026' : month === '2026-03' ? 'Mars 2026' : month);
        let visible = 0;
        items.forEach(el => {
            if(month === 'all' || el.dataset.month === month){
                el.classList.remove('hide');
                el.classList.remove('hidden');
                visible++;
            } else {
                el.classList.add('hide');
                // after transition, add hidden to remove from flow
                setTimeout(() => el.classList.add('hidden'), 300);
            }
        });
        const placeholder = document.getElementById('emptyPlaceholder');
        if(placeholder) placeholder.classList.toggle('hidden', visible !== 0);
    }

    // initial counts
    updateCounts();

    // attach filter listeners
    filters.forEach(btn => {
        btn.addEventListener('click', function(){
            filters.forEach(b => b.classList.remove('bg-teal-600','text-white'));
            filters.forEach(b => b.classList.add('bg-white','text-teal-700'));
            this.classList.remove('bg-white','text-teal-700');
            this.classList.add('bg-teal-600','text-white');
            const month = this.dataset.filter;
            showMonth(month);
        });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src, title, alt){
        lightboxImage.src = src;
        lightboxImage.alt = alt || title || '';
        lightboxCaption.textContent = title || '';
        lightbox.classList.add('show');
    }
    function closeLightbox(){
        lightbox.classList.remove('show');
        lightboxImage.src = '';
        lightboxCaption.textContent = '';
    }

    items.forEach(i => i.addEventListener('click', function(){
        const img = this.querySelector('img');
        const title = this.dataset.title + ' — ' + this.dataset.date;
        openLightbox(img.src, title, img.alt);
    }));

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
        if(e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape') closeLightbox();
    });

})();