document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       0. SMOOTH SCROLLING (LENIS)
       ========================================= */
    // Initialize Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Request Animation Frame loop for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Anchor Link Interception for Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    lenis.scrollTo(targetElem);
                    // Also close mobile menu if open
                    if (window.innerWidth <= 1024) {
                        const sidebar = document.querySelector('.sidebar');
                        if (sidebar && sidebar.classList.contains('active')) {
                            sidebar.classList.remove('active');
                        }
                    }
                }
            }
        });
    });

    /* =========================================
       1. NAVIGATION SIDEBAR (Mobile Toggle)
       ========================================= */
    const mobileHeader = document.querySelector('.mobile-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Open Sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    // Close Sidebar
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    /* =========================================
       2. SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    /* =========================================
       3. FEEDBACK SLIDER
       ========================================= */
    const slider = document.querySelector('.feedback-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 350, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -350, behavior: 'smooth' });
        });
    }

    /* =========================================
       4. CONTACT FORM VALIDATION
       ========================================= */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Simple validation helper
            const validateField = (field, condition) => {
                const formGroup = field.parentElement;
                if (condition) {
                    formGroup.classList.remove('error');
                    formGroup.classList.add('success');
                } else {
                    formGroup.classList.add('error');
                    formGroup.classList.remove('success');
                    isValid = false;
                }
            };

            // Name: Not empty
            validateField(name, name.value.trim() !== '');

            // Email: Simple regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(email, emailRegex.test(email.value.trim()));

            // Message: Length > 10 chars
            validateField(message, message.value.trim().length > 10);

            if (isValid) {
                // Determine button
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerHTML;

                btn.innerHTML = '<span>ОТПРАВЛЕНО!</span> <i class="fa-solid fa-check"></i>';
                btn.style.backgroundColor = '#2ecc71';

                // Simulate sending
                setTimeout(() => {
                    contactForm.reset();
                    document.querySelectorAll('.form-group').forEach(g => {
                        g.classList.remove('success');
                        g.classList.remove('error');
                    });
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                }, 2000);
            }
        });
    }

    /* =========================================
       5. ACTIVE LINK ON SCROLL
       ========================================= */
    // Highlight sidebar link based on scroll position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
