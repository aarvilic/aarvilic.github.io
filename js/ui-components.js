// --- PREMIUM HERO CAROUSEL ---
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

let currentSlideIndex = 0;
let slideInterval;

if (slides.length > 0) {
    // Generate dot elements
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlideIndex);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlideIndex);
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlideIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(slideInterval);
        startAutoplay();
    }

    startAutoplay();
}

// --- SCROLL COUNTERS TRIGGER ---
const counterBoxes = document.querySelectorAll('.counter-number');
let animated = false;

function animateCounters() {
    counterBoxes.forEach(box => {
        const target = +box.getAttribute('data-target');
        const speed = target > 1000 ? 150 : 30;
        let count = 0;

        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            if (count < target) {
                box.innerText = count.toLocaleString() + (target === 100 ? '%' : '+');
                setTimeout(updateCount, 15);
            } else {
                box.innerText = target.toLocaleString() + (target === 100 ? '%' : '+');
            }
        };
        updateCount();
    });
}

window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const pos = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (pos < screenHeight * 0.75 && !animated) {
        animateCounters();
        animated = true;
    }
});

// --- COMPREHENSIVE POLICY TAB FILTERING (LIC ONLY) ---
const filterBtns = document.querySelectorAll('.lic-portfolio-container .filter-btn');
const policyCards = document.querySelectorAll('#licGrid .policy-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        policyCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.4s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});