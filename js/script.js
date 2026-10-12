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