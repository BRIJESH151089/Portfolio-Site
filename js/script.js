/* ========================================= */
/* Nav - Active Link on Scroll                */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const navLinks = Array.from(document.querySelectorAll('.portfolio-navbar .nav-link'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!navLinks.length || !sections.length) return;

    const setActive = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));

});

/* ========================================= */
/* Copy Email                                 */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('.copy-email-btn');
    if (!btn) return;

    const label = btn.querySelector('span');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(btn.dataset.email);
        } catch {
            return;
        }

        btn.classList.add('is-copied');
        icon.className = 'bi bi-check2';
        label.textContent = 'Copied!';

        setTimeout(() => {
            btn.classList.remove('is-copied');
            icon.className = 'bi bi-clipboard';
            label.textContent = 'Copy Email';
        }, 2000);
    });

});

/* ========================================= */
/* Experience - Earlier Roles Toggle          */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const earlierRoles = document.getElementById('earlierRoles');
    const toggleBtn = document.querySelector('.experience-toggle-btn');
    const toggleLabel = toggleBtn ? toggleBtn.querySelector('span') : null;

    if (!earlierRoles || !toggleBtn || !toggleLabel) return;

    earlierRoles.addEventListener('shown.bs.collapse', () => {
        toggleLabel.textContent = 'Show fewer roles';
    });

    earlierRoles.addEventListener('hidden.bs.collapse', () => {
        toggleLabel.textContent = 'Show earlier roles';
    });

});

/* ========================================= */
/* Project Filter Chips                       */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const filterBar = document.getElementById('projectFilters');
    const grid = document.getElementById('projectsGrid');

    if (!filterBar || !grid) return;

    const cards = Array.from(grid.querySelectorAll('.project-card'));
    const categoryLabels = { vr: 'VR', ar: 'AR', mr: 'MR', xr: 'XR', games: 'Games' };

    const categories = [...new Set(cards.map((card) => card.dataset.category).filter(Boolean))];

    const chips = [{ key: 'all', label: 'All' }, ...categories.map((key) => ({
        key,
        label: categoryLabels[key] || key,
    }))];

    chips.forEach(({ key, label }) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'project-filter-chip';
        chip.dataset.filter = key;
        chip.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
        chip.textContent = label;
        if (key === 'xr') chip.title = 'VR, AR and MR projects';
        filterBar.appendChild(chip);
    });

    filterBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.project-filter-chip');
        if (!chip) return;

        filterBar.querySelectorAll('.project-filter-chip').forEach((btn) => {
            btn.setAttribute('aria-pressed', String(btn === chip));
        });

        const filter = chip.dataset.filter;

        cards.forEach((card) => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !matches);
            if (matches) {
                card.classList.remove('is-filtering');
                requestAnimationFrame(() => card.classList.add('is-filtering'));
            }
        });
    });

});

/* ========================================= */
/* Bingo - Click to Play GIF                 */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const demo = document.getElementById('bingoDemo');
    const img = document.getElementById('bingoImg');
    const icon = document.querySelector('#bingoPlayBtn i');

    // Stop if the Bingo card is not on the page
    if (!demo || !img || !icon) return;

    let playing = false;

    // Preload the GIF after the page has finished loading
    window.addEventListener('load', () => {
        new Image().src = img.dataset.gif;
    });

    function toggleDemo() {
        playing = !playing;

        img.src = playing ? img.dataset.gif : img.dataset.still;
        icon.className = playing ? 'bi bi-stop-fill' : 'bi bi-play-fill';

        demo.classList.toggle('is-playing', playing);
    }

    demo.addEventListener('click', toggleDemo);

    // Keyboard support (Enter / Space)
    demo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDemo();
        }
    });

});