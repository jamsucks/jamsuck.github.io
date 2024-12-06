function checkAdBlocker() {
    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '<a class="telegram" href="https://t.me/share/url?url=https://t.me&text=telegram">Рассказать</a>';
    adBlockTest.style.position = 'absolute';
    adBlockTest.style.visibility = 'hidden';
    document.body.appendChild(adBlockTest);
    
    if (!adBlockTest.offsetHeight) {
        const warningBlock = document.querySelector('.warning');
        if (warningBlock) warningBlock.style.display = 'block';
    }
    
    document.body.removeChild(adBlockTest);
}

function hideWarning() {
    const warningBlock = document.querySelector('.warning');
    if (warningBlock) warningBlock.style.display = 'none';
}

window.onload = checkAdBlocker;

document.addEventListener('DOMContentLoaded', () => {
    const warningBlock = document.querySelector('.warning');
    if (warningBlock) {
        warningBlock.addEventListener('click', hideWarning);
    }
});
