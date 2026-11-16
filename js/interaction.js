/* ============================================
   BILBY — Интерактивность (THINK, видео, навигация)
   ============================================ */

const RESPONSES = {
    'yes': 'Этот опыт оставляет след. Когда мы помогаем другому, мы часто открываем что-то новое и в себе.',
    'sometimes': 'Маленькие поступки иногда значат больше, чем громкие слова. Билби мог просто уйти — но остался.',
    'not-yet': 'Возможно, этот фильм — повод задуматься. Иногда героем становится тот, кто просто не проходит мимо.'
};

/**
 * Инициализирует интерактивную секцию THINK.
 */
export function initThinkSection() {
    const optionsContainer = document.getElementById('thinkOptions');
    const responseContainer = document.getElementById('thinkResponse');

    if (!optionsContainer || !responseContainer) return;

    optionsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.think-option');
        if (!button) return;

        // Убираем выделение со всех кнопок
        optionsContainer.querySelectorAll('.think-option').forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');

        const answer = button.getAttribute('data-answer');
        const message = RESPONSES[answer] || '';

        responseContainer.textContent = message;
        responseContainer.classList.remove('visible');

        // Небольшая задержка для перезапуска анимации
        requestAnimationFrame(() => {
            responseContainer.classList.add('visible');
        });
    });
}

/**
 * Инициализирует плавную прокрутку для якорных ссылок.
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Инициализирует кнопку запуска видео (заполнитель).
 * В реальном проекте здесь можно подставить iframe с официальным источником.
 */
export function initVideoPlayer() {
    const playBtn = document.getElementById('playBtn');
    const placeholder = document.getElementById('videoPlaceholder');

    if (!playBtn || !placeholder) return;

    playBtn.addEventListener('click', () => {
        // ВАЖНО: Замените этот alert и логику на вставку легального iframe.
        // Пример:
        // placeholder.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>`;
        alert('Добавьте ссылку на официальный источник видео в файле index.html (секция WATCH THE FILM).');
    });
}

/**
 * Инициализирует индикатор прогресса прокрутки.
 */
export function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

/**
 * Обновляет активную точку в боковой навигации.
 * @param {string} sectionId - ID активной секции.
 */
export function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-section') === sectionId);
    });
}