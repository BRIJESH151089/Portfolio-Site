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

