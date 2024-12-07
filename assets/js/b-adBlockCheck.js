function checkAdBlocker() {
    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '<a class="telegram" href="https://t.me/share/url?url=https://t.me&text=telegram">Рассказать</a>';
    adBlockTest.style.position = 'absolute';
    adBlockTest.style.visibility = 'hidden';
    document.body.appendChild(adBlockTest);
    
        const warningBlock = document.querySelector('.warning');
    if (!adBlockTest.offsetHeight && warningBlock) {
        warningBlock.classList.remove('hide');
    }
    
    document.body.removeChild(adBlockTest);
}

document.addEventListener('DOMContentLoaded', () => {
    const warningBlock = document.querySelector('.warning');
    if (warningBlock) {
        window.onload = checkAdBlocker;
        warningBlock.addEventListener('click', () => warningBlock.classList.add('hide'));
    }
});
