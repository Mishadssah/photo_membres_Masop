// MASOP Website JavaScript

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
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
}

// Scroll animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenu.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
        this.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
    });
}

function safeTrack(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
}

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
        case 'festival4chemins':
            modalId = 'activityFestival4chemins';
            break;
        case 'activity8mars':
            modalId = 'activity8mars';
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
        case 'festival4chemins':
            modalId = 'activityFestival4chemins';
            break;
        case 'activity8mars':
            modalId = 'activity8mars';
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
    const countAll = document.getElementById('count-all');
    const currentMonthLabel = document.getElementById('currentMonthLabel');

    if (!filters.length || !items.length || !countAll || !currentMonthLabel) return;

    function updateCounts(){
        // reset counts
        counts['all'] = items.length;
        items.forEach(i => {
            const m = i.dataset.month || 'unknown';
            counts[m] = (counts[m] || 0) + 1;
        });
        // update UI
        countAll.textContent = counts['all'] || 0;
        ['2025-12','2026-01','2026-02','2026-03'].forEach(k => {
            const el = document.getElementById('count-' + k.replace(/-/g, '-'));
            if(el) el.textContent = counts[k] || 0;
        });
    }

    function showMonth(month){
        currentMonthLabel.textContent = (month === 'all') ? 'Tout' : (month === '2025-12' ? 'Décembre 2025' : month === '2026-01' ? 'Janvier 2026' : month === '2026-02' ? 'Février 2026' : month === '2026-03' ? 'Mars 2026' : month);
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

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxCounter || !lightboxClose || !lightboxPrev || !lightboxNext) return;
    
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

// Contact form submission handler (Formspree integration)
document.addEventListener('DOMContentLoaded', function(){
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');

    document.querySelectorAll('a[href="don.html"], a[href$="/don.html"], button[data-track="donate"]').forEach(element => {
        element.addEventListener('click', function() {
            safeTrack('click_donate', {
                page_path: window.location.pathname,
                link_text: (this.textContent || '').trim()
            });
        });
    });

    if (contactForm && contactStatus) {
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                safeTrack('form_contact_error', {
                    page_path: window.location.pathname,
                    reason: 'validation'
                });
                contactForm.reportValidity();
                const invalidField = contactForm.querySelector(':invalid');
                if (invalidField) invalidField.focus();
                return;
            }

            const action = contactForm.getAttribute('action');
            safeTrack('form_contact_submit', {
                page_path: window.location.pathname,
                form_id: 'contactForm'
            });
            contactForm.setAttribute('aria-busy', 'true');
            // show loading
            contactStatus.classList.remove('hidden');
            contactStatus.classList.remove('text-green-600','text-red-600');
            contactStatus.textContent = 'Envoi en cours...';

            const formData = new FormData(contactForm);

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    contactForm.removeAttribute('aria-busy');
                    contactStatus.classList.add('text-green-600');
                    contactStatus.textContent = 'Merci — votre message a été envoyé.';
                    contactForm.reset();
                } else {
                    safeTrack('form_contact_error', {
                        page_path: window.location.pathname,
                        reason: 'server_response'
                    });
                    response.json().then(data => {
                        contactForm.removeAttribute('aria-busy');
                        contactStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                        contactStatus.classList.add('text-red-600');
                        if (data && data.errors) {
                            contactStatus.textContent = data.errors.map(err => err.message).join(', ') || 'Erreur lors de l\'envoi.';
                        } else {
                            contactStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                        }
                    }).catch(() => {
                        contactForm.removeAttribute('aria-busy');
                        contactStatus.classList.add('text-red-600');
                        contactStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                    });
                }
            }).catch(() => {
                safeTrack('form_contact_error', {
                    page_path: window.location.pathname,
                    reason: 'network'
                });
                contactForm.removeAttribute('aria-busy');
                contactStatus.classList.add('text-red-600');
                contactStatus.textContent = 'Erreur réseau. Vérifiez votre connexion.';
            });
        });
    }

    // CPS enrollment form handler
    const cpsForm = document.getElementById('cpsForm');
    const cpsStatus = document.getElementById('cpsStatus');
    if (cpsForm) {
        cpsForm.addEventListener('submit', function(e){
            e.preventDefault();

            if (!cpsForm.checkValidity()) {
                safeTrack('form_cps_error', {
                    page_path: window.location.pathname,
                    reason: 'validation'
                });
                cpsForm.reportValidity();
                const invalidField = cpsForm.querySelector(':invalid');
                if (invalidField) invalidField.focus();
                return;
            }

            const action = cpsForm.getAttribute('action');
            safeTrack('form_cps_submit', {
                page_path: window.location.pathname,
                form_id: 'cpsForm'
            });
            cpsForm.setAttribute('aria-busy', 'true');
            cpsStatus.classList.remove('hidden');
            cpsStatus.classList.remove('text-green-600','text-red-600');
            cpsStatus.textContent = 'Envoi en cours...';

            const formData = new FormData(cpsForm);

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    cpsForm.removeAttribute('aria-busy');
                    cpsStatus.classList.add('text-green-600');
                    cpsStatus.textContent = 'Merci — votre demande a été envoyée. Nous vous contacterons sous peu.';
                    cpsForm.reset();
                } else {
                    safeTrack('form_cps_error', {
                        page_path: window.location.pathname,
                        reason: 'server_response'
                    });
                    response.json().then(data => {
                        cpsForm.removeAttribute('aria-busy');
                        cpsStatus.classList.add('text-red-600');
                        if (data && data.errors) {
                            cpsStatus.textContent = data.errors.map(err => err.message).join(', ') || 'Erreur lors de l\'envoi.';
                        } else {
                            cpsStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                        }
                    }).catch(() => {
                        cpsForm.removeAttribute('aria-busy');
                        cpsStatus.classList.add('text-red-600');
                        cpsStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                    });
                }
            }).catch(() => {
                safeTrack('form_cps_error', {
                    page_path: window.location.pathname,
                    reason: 'network'
                });
                cpsForm.removeAttribute('aria-busy');
                cpsStatus.classList.add('text-red-600');
                cpsStatus.textContent = 'Erreur réseau. Vérifiez votre connexion.';
            });
        });
    }
});

// Donation payment options handler
function openPaymentLink(method) {
    safeTrack('donate_method_click', {
        page_path: window.location.pathname,
        method: method
    });

    const messages = {
        moncash: {
            message: "Numéro MonCash à utiliser: 50938582420",
            action: () => {
                navigator.clipboard.writeText('50938582420').then(() => {
                    const notification = document.createElement('div');
                    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
                    notification.textContent = '✓ Numéro copié dans le presse-papiers';
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 3000);
                });
            }
        },
        natcash: {
            message: "Numéro NatCash à utiliser: 50941820102",
            action: () => {
                navigator.clipboard.writeText('50941820102').then(() => {
                    const notification = document.createElement('div');
                    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
                    notification.textContent = '✓ Numéro copié dans le presse-papiers';
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 3000);
                });
            }
        },
        paypal: {
            action: () => {
                window.location.href = 'mailto:contact@masop.care?subject=Don%20international%20-%20Compte%20PayPal%20en%20attente&body=Bonjour,%0A%0AJe souhaite faire un don international. J%27ai vu que le compte PayPal est en cours d%27activation.%0APouvez-vous me proposer une alternative temporaire ?%0A%0AMerci';
            }
        },
        transfer: {
            action: () => {
                window.location.href = 'mailto:contact@masop.care?subject=Information sur virement bancaire&body=Bonjour,%0A%0AJe suis intéressé(e) par faire un virement bancaire à MASOP. Pourriez-vous m\'envoyer les informations de compte?%0A%0AMerci';
            }
        }
    };

    if (messages[method]) {
        messages[method].action();
    }
}

function switchTab(tab) {
    const tabs = ['ongoing', 'past', 'future'];
    tabs.forEach(section => {
        const sectionEl = document.getElementById('section-' + section);
        const tabBtn = document.getElementById('tab-' + section);
        if (sectionEl) {
            if (section === tab) {
                sectionEl.classList.remove('hidden');
                requestAnimationFrame(() => {
                    sectionEl.classList.remove('opacity-0');
                    sectionEl.classList.add('opacity-100');
                });
            } else {
                sectionEl.classList.remove('opacity-100');
                sectionEl.classList.add('opacity-0');
                setTimeout(() => {
                    if (sectionEl.classList.contains('opacity-0')) {
                        sectionEl.classList.add('hidden');
                    }
                }, 500);
            }
        }
        if (tabBtn) {
            if (section === tab) {
                tabBtn.classList.add('active');
                tabBtn.classList.remove('bg-white', 'text-teal-600', 'border', 'border-teal-600');
                tabBtn.classList.add('bg-teal-600', 'text-white');
                tabBtn.setAttribute('aria-pressed', 'true');
            } else {
                tabBtn.classList.remove('active');
                tabBtn.classList.remove('bg-teal-600', 'text-white');
                tabBtn.classList.add('bg-white', 'text-teal-600', 'border', 'border-teal-600');
                tabBtn.setAttribute('aria-pressed', 'false');
            }
        }
    });
}

// CPS school logo upload and gallery handling
(function(){
    const logoDropZone = document.getElementById('logoDropZone');
    const logoInput = document.getElementById('logoInput');
    const logoPreview = document.getElementById('logoPreview');
    const previewImg = document.getElementById('previewImg');
    const logoFileName = document.getElementById('logoFileName');
    const schoolLogoForm = document.getElementById('schoolLogoForm');
    const cpsGalleryGrid = document.getElementById('cpsGalleryGrid');
    const emptyGalleryMessage = document.getElementById('emptyGalleryMessage');

    if (!logoDropZone || !logoInput || !logoPreview || !previewImg || !logoFileName || !schoolLogoForm || !cpsGalleryGrid || !emptyGalleryMessage) return;

    function updateGalleryVisibility() {
        const displayedItems = cpsGalleryGrid.querySelectorAll('.gallery-item');
        emptyGalleryMessage.classList.toggle('hidden', displayedItems.length > 0);
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            logoFileName.textContent = file.name;
            logoPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    logoDropZone.addEventListener('click', () => logoInput.click());

    logoDropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        logoDropZone.classList.add('border-teal-500', 'bg-teal-50');
    });

    logoDropZone.addEventListener('dragleave', () => {
        logoDropZone.classList.remove('border-teal-500', 'bg-teal-50');
    });

    logoDropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        logoDropZone.classList.remove('border-teal-500', 'bg-teal-50');
        const file = event.dataTransfer.files[0];
        if (file) {
            logoInput.files = event.dataTransfer.files;
            handleFile(file);
        }
    });

    logoInput.addEventListener('change', function() {
        const file = this.files[0];
        handleFile(file);
    });

    schoolLogoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const schoolName = document.getElementById('schoolNameLogo').value.trim();
        const schoolEmail = document.getElementById('schoolEmailLogo').value.trim();
        const file = logoInput.files[0];

        if (!schoolName || !schoolEmail || !file) {
            alert('Veuillez indiquer le nom de l\'établissement, l\'email et un logo à télécharger.');
            return;
        }

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item bg-white rounded-lg shadow-md p-4 text-center flex flex-col items-center justify-center min-h-40 hover:shadow-xl transition duration-300';

        const img = document.createElement('img');
        img.src = previewImg.src;
        img.alt = schoolName + ' logo';
        img.className = 'w-full h-24 object-contain mb-4';
        galleryItem.appendChild(img);

        const title = document.createElement('p');
        title.className = 'font-semibold text-gray-800';
        title.textContent = schoolName;
        galleryItem.appendChild(title);

        const email = document.createElement('p');
        email.className = 'text-sm text-gray-500';
        email.textContent = schoolEmail;
        galleryItem.appendChild(email);

        cpsGalleryGrid.insertBefore(galleryItem, cpsGalleryGrid.firstChild);
        updateGalleryVisibility();

        schoolLogoForm.reset();
        logoPreview.classList.add('hidden');
        previewImg.src = '';
        logoFileName.textContent = '';
    });

    updateGalleryVisibility();
})();

(function(){
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatPanel = document.getElementById('chat-panel');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatToggleBtn || !chatPanel || !chatCloseBtn || !chatForm || !chatInput || !chatMessages) return;

    const botResponses = [
        { keywords: ['bonjour', 'salut', 'hello'], answer: 'Bonjour ! Je suis l’assistant MASOP. Comment puis-je vous aider aujourd’hui ?' },
        { keywords: ['cps', 'enrôlement', 'inscription', 'école', 'établissement'], answer: 'Le programme CPS aide les écoles à protéger les élèves. Je peux vous orienter vers le formulaire d’enrôlement.' },
        { keywords: ['formation', 'formations', 'cadre', 'technique'], answer: 'MASOP propose des formations pour renforcer les cadres sur la santé mentale, la protection de l’enfance et la prévention des VBG.' },
        { keywords: ['festival', 'chemins', 'pawòl tifi', '22ème'], answer: 'Au Festival 4 Chemins, Ulrick EDOUARD a parlé du thème « Ki rèv pou tout fi - Pawòl Tifi ». Il a mis l’accent sur la protection des rêves des jeunes filles et la lutte contre les VBG.' },
        { keywords: ['8 mars', 'femmes', 'allaitantes', 'camp'], answer: 'Le 8 mars 2026, MASOP a soutenu plus de 50 femmes allaitantes au Camp Jean Marie Vincent à Pétion-Ville.' },
        { keywords: ['contact', 'email', 'téléphone', 'appeler'], answer: 'Vous pouvez nous contacter au +509 3796-2464 ou via contact@masop.care.' },
        { keywords: ['don', 'donner', 'faire un don'], answer: 'Merci de votre intérêt pour soutenir MASOP. Le bouton Faire un don est disponible dans le pied de page et sur la page d’accueil.' }
    ];

    function addMessage(text, fromBot) {
        const messageEl = document.createElement('div');
        messageEl.className = fromBot ? 'rounded-2xl bg-teal-100 p-3 text-gray-800 self-start max-w-full break-words' : 'rounded-2xl bg-gray-100 p-3 text-gray-800 self-end max-w-full break-words';
        messageEl.textContent = text;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function findResponse(query) {
        const normalized = query.toLowerCase();
        for (const item of botResponses) {
            if (item.keywords.some(keyword => normalized.includes(keyword))) {
                return item.answer;
            }
        }
        return 'Je suis là pour vous aider. Pouvez-vous préciser votre question sur MASOP, le CPS ou nos actions ?';
    }

    chatToggleBtn.addEventListener('click', () => {
        const isHidden = chatPanel.classList.toggle('hidden');
        chatToggleBtn.setAttribute('aria-expanded', !isHidden);
        if (!isHidden) {
            chatInput.focus();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        chatPanel.classList.add('hidden');
        chatToggleBtn.setAttribute('aria-expanded', 'false');
    });

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        addMessage(message, false);
        chatInput.value = '';
        const response = findResponse(message);
        setTimeout(() => addMessage(response, true), 500);
    });
})();

// Actions page: year filters + dedicated lightbox
(function(){
    const actionCards = document.querySelectorAll('.action-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const actionsContainer = document.getElementById('actions-container');
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!actionCards.length || !filterButtons.length || !actionsContainer || !lightbox || !lightboxImage || !lightboxClose) {
        return;
    }

    let lastFocusedElement = null;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-teal-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });

            this.classList.add('active', 'bg-teal-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-800');

            const yearFilter = this.dataset.filter;
            actionCards.forEach(card => {
                if (yearFilter === 'all' || card.dataset.year === yearFilter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    actionsContainer.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function() {
            lastFocusedElement = document.activeElement;
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt || 'Photo d\'action MASOP';
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            lightboxClose.focus();
        });
    });

    function closeActionsLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        document.body.style.overflow = '';
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    lightboxClose.addEventListener('click', closeActionsLightbox);
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeActionsLightbox();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.classList.contains('open')) {
            closeActionsLightbox();
        }
    });
})();