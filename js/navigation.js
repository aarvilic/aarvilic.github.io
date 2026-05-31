// --- MOBILE MENU TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('mobile-active')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// --- NAV LINK ACTIVE ON SCROLL ---
const sections = document.querySelectorAll('section, .hero-carousel');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            if (section.id) {
                current = section.id;
            } else if (section.classList.contains('hero-carousel')) {
                current = '';
            }
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === '#' && current === '') {
            item.classList.add('active');
        } else if (href === `#${current}`) {
            item.classList.add('active');
        }
    });
});