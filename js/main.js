/* ============================================
   BILBY — Точка входа
   ============================================ */

import { initThemeObserver } from './themes.js';
import { initRevealAnimations, initParallax, prefersReducedMotion } from './animations.js';
import { initThinkSection, initSmoothScroll, initVideoPlayer, initProgressBar, updateActiveNav } from './interaction.js';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    // 1. Инициализация наблюдения за темами
    initThemeObserver(sections, (activeSectionId) => {
        updateActiveNav(activeSectionId);
    });

    // 2. Анимации появления
    initRevealAnimations();

    // 3. Параллакс (если не включён reduced motion)
    if (!prefersReducedMotion()) {
        initParallax();
    }

    // 4. Интерактивность
    initThinkSection();
    initSmoothScroll();
    initVideoPlayer();
    initProgressBar();

    // 5. Установка начальной активной точки (hero)
    updateActiveNav('hero');
});