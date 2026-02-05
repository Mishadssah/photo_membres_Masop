// MASOP Website JavaScript

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let visibleItems = [];

    function updateVisibleItems() {
        // Get all gallery items that are currently visible (not hidden by filters)
        visibleItems = items.filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(src, title, alt, index){
        updateVisibleItems();
        currentImageIndex = visibleItems.findIndex(item => {
            const img = item.querySelector('img');
            return img.src === src;
        });
        
        lightboxImage.src = src;
        lightboxImage.alt = alt || title || '';
        lightboxCaption.textContent = title || '';
        updateCounter();
        lightbox.classList.add('show');
    }
    
    function updateCounter() {
        if (visibleItems.length > 0) {
            lightboxCounter.textContent = `Photo ${currentImageIndex + 1} sur ${visibleItems.length}`;
        }
    }

    function closeLightbox(){
        lightbox.classList.remove('show');
        lightboxImage.src = '';
        lightboxCaption.textContent = '';
        lightboxCounter.textContent = '';
    }

    function showImage(index) {
        if (visibleItems.length === 0) return;
        
        // Wrap around
        if (index < 0) index = visibleItems.length - 1;
        if (index >= visibleItems.length) index = 0;
        
        currentImageIndex = index;
        const item = visibleItems[index];
        const img = item.querySelector('img');
        const title = item.dataset.title + ' — ' + item.dataset.date;
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = title;
        updateCounter();
    }

    items.forEach(i => i.addEventListener('click', function(){
        const img = this.querySelector('img');
        const title = this.dataset.title + ' — ' + this.dataset.date;
        openLightbox(img.src, title, img.alt, items.indexOf(this));
    }));

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    lightbox.addEventListener('click', function(e){
        if(e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', function(e){
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
    });

})();