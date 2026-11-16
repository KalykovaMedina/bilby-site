/* ============================================
   BILBY — Анимации появления и параллакс
   ============================================ */

/**
 * Инициализирует Intersection Observer для элементов с классами .fade-in и .reveal-text.
 */
export function initRevealAnimations() {
    const elements = document.querySelectorAll('.fade-in, .reveal-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
}

/**
 * Инициализирует параллакс-эффект для элементов с классом .parallax.
 * Использует requestAnimationFrame для плавности.
 */
export function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = elementCenter - viewportCenter;
            const offset = distance * speed;

            el.style.transform = `translateY(${offset}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Первоначальный вызов
    updateParallax();
}

/**
 * Проверяет, включен ли режим reduced motion.
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}