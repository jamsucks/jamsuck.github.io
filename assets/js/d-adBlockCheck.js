function checkAdBlocker() {
    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '<a class="telegram" href="https://t.me/share/url?url=https://duck.ai&text=">Рассказать</a>';
    adBlockTest.style.position = 'absolute';
    adBlockTest.style.visibility = 'hidden';
    document.body.appendChild(adBlockTest);
    
    if (!adBlockTest.offsetHeight && !localStorage.getItem('adBlockerShown')) {
        document.querySelector('.warning').style.display = 'block';
        localStorage.setItem('adBlockerShown', 'true');
    }
    
    document.body.removeChild(adBlockTest);
}

function hideWarning() {
    document.querySelector('.warning').style.display = 'none';
}

window.onload = checkAdBlocker;

document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.warning .close-button');
    if (closeButton) closeButton.addEventListener('click', hideWarning);
});
