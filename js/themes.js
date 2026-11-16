/* ============================================
   BILBY — Управление цветовыми темами
   ============================================ */

const THEMES = {
    dark: {
        bgPrimary: '#101923',
        bgSecondary: '#1B2935',
        textPrimary: '#E8E8E4',
        textSecondary: 'rgba(232, 232, 228, 0.7)',
        accent: '#E8E8E4',
        borderColor: 'rgba(232, 232, 228, 0.15)'
    },
    desert: {
        bgPrimary: '#A94D35',
        bgSecondary: '#D77A49',
        textPrimary: '#E6B47D',
        textSecondary: 'rgba(230, 180, 125, 0.8)',
        accent: '#E6B47D',
        borderColor: 'rgba(230, 180, 125, 0.3)'
    },
    connection: {
        bgPrimary: '#174D70',
        bgSecondary: '#4787A8',
        textPrimary: '#C8DCE4',
        textSecondary: 'rgba(200, 220, 228, 0.8)',
        accent: '#C8DCE4',
        borderColor: 'rgba(200, 220, 228, 0.25)'
    },
    care: {
        bgPrimary: '#D8D4C8',
        bgSecondary: '#EDF0EA',
        textPrimary: '#1B2935',
        textSecondary: 'rgba(27, 41, 53, 0.7)',
        accent: '#91B4C2',
        borderColor: 'rgba(27, 41, 53, 0.15)'
    },
    hope: {
        bgPrimary: '#B9D8E8',
        bgSecondary: '#F4F4EF',
        textPrimary: '#1B2935',
        textSecondary: 'rgba(27, 41, 53, 0.65)',
        accent: '#F0DFBF',
        borderColor: 'rgba(27, 41, 53, 0.12)'
    }
};

/**
 * Применяет тему к документу.
 * @param {string} themeName - Название темы (dark, desert, connection, care, hope).
 */
export function applyTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--border-color', theme.borderColor);

    document.body.setAttribute('data-theme', themeName);
}

/**
 * Инициализирует наблюдение за секциями и смену тем.
 * @param {NodeListOf<Element>} sections - Коллекция секций.
 * @param {Function} onActiveSectionChange - Колбэк при смене активной секции.
 */
export function initThemeObserver(sections, onActiveSectionChange) {
    const options = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Секция считается активной, когда пересекает центр экрана
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-theme') || 'dark';
                applyTheme(theme);

                if (typeof onActiveSectionChange === 'function') {
                    onActiveSectionChange(entry.target.id);
                }
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));

    return observer;
}

export { THEMES };