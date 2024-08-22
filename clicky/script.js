document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let autoClickers = 0;
    let superClickers = 0;
    let megaClickers = 0;

    const clickButton = document.getElementById('click-button');
    const clickCountElement = document.getElementById('click-count');
    const autoClickerButton = document.getElementById('auto-clicker');
    const superClickerButton = document.getElementById('super-clicker');
    const megaClickerButton = document.getElementById('mega-clicker');

    const autoClickerCPS = document.getElementById('auto-clicker-cps');
    const superClickerCPS = document.getElementById('super-clicker-cps');
    const megaClickerCPS = document.getElementById('mega-clicker-cps');

    const updateDisplay = () => {
        clickCountElement.textContent = clickCount;
        autoClickerButton.disabled = clickCount < 100;
        superClickerButton.disabled = clickCount < 500;
        megaClickerButton.disabled = clickCount < 2000;

        autoClickerCPS.textContent = `+${autoClickers} CPS`;
        superClickerCPS.textContent = `+${superClickers * 5} CPS`;
        megaClickerCPS.textContent = `+${megaClickers * 20} CPS`;
    };

    const saveGame = () => {
        localStorage.setItem('autoClickers', autoClickers);
        localStorage.setItem('superClickers', superClickers);
        localStorage.setItem('megaClickers', megaClickers);
    };

    const autoClick = () => {
        clickCount += autoClickers;
        clickCount += superClickers * 5;
        clickCount += megaClickers * 20;
        updateDisplay();
        saveGame();
    };

    clickButton.addEventListener('click', () => {
        clickCount++;
        updateDisplay();
        saveGame();
    });

    autoClickerButton.addEventListener('click', () => {
        if (clickCount >= 100) {
            clickCount -= 100;
            autoClickers++;
            updateDisplay();
            saveGame();
        }
    });

    superClickerButton.addEventListener('click', () => {
        if (clickCount >= 500) {
            clickCount -= 500;
            superClickers++;
            updateDisplay();
            saveGame();
        }
    });

    megaClickerButton.addEventListener('click', () => {
        if (clickCount >= 2000) {
            clickCount -= 2000;
            megaClickers++;
            updateDisplay();
            saveGame();
        }
    });

    setInterval(autoClick, 1000); // Automatically clicks every second
    updateDisplay();
});
