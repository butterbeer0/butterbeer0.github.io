document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let autoClickers = 0;
    let superClickers = 0;
    let megaClickers = 0;
    let ultraClickers = 0;
    const encryptionKey = 'your-encryption-key'; // Replace with a strong key

    const clickButton = document.getElementById('click-button');
    const clickCountElement = document.getElementById('click-count');
    const autoClickerButton = document.getElementById('auto-clicker');
    const superClickerButton = document.getElementById('super-clicker');
    const megaClickerButton = document.getElementById('mega-clicker');
    const ultraClickerButton = document.getElementById('ultra-clicker');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    const loadInput = document.getElementById('load-input');

    const autoClickerCPS = document.getElementById('auto-clicker-cps');
    const superClickerCPS = document.getElementById('super-clicker-cps');
    const megaClickerCPS = document.getElementById('mega-clicker-cps');
    const ultraClickerCPS = document.getElementById('ultra-clicker-cps');

    const updateDisplay = () => {
        clickCountElement.textContent = clickCount;
        autoClickerButton.disabled = clickCount < 100;
        superClickerButton.disabled = clickCount < 500;
        megaClickerButton.disabled = clickCount < 2000;
        ultraClickerButton.disabled = clickCount < 5000;

        autoClickerCPS.textContent = `+${autoClickers} CPS`;
        superClickerCPS.textContent = `+${superClickers * 5} CPS`;
        megaClickerCPS.textContent = `+${megaClickers * 20} CPS`;
        ultraClickerCPS.textContent = `+${ultraClickers * 100} CPS`;
    };

    const saveGame = () => {
        const gameData = JSON.stringify({
            clickCount,
            autoClickers,
            superClickers,
            megaClickers,
            ultraClickers
        });
        const encryptedData = CryptoJS.AES.encrypt(gameData, encryptionKey).toString();
        const blob = new Blob([encryptedData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clicky_save.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadGame = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const encryptedData = reader.result;
                const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
                const gameData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                clickCount = gameData.clickCount || 0;
                autoClickers = gameData.autoClickers || 0;
                superClickers = gameData.superClickers || 0;
                megaClickers = gameData.megaClickers || 0;
                ultraClickers = gameData.ultraClickers || 0;
                updateDisplay();
            } catch (e) {
                alert('Failed to load game data.');
            }
        };
        reader.readAsText(file);
    };

    clickButton.addEventListener('click', () => {
        clickCount++;
        updateDisplay();
    });

    autoClickerButton.addEventListener('click', () => {
        if (clickCount >= 100) {
            clickCount -= 100;
            autoClickers++;
            updateDisplay();
        }
    });

    superClickerButton.addEventListener('click', () => {
        if (clickCount >= 500) {
            clickCount -= 500;
            superClickers++;
            updateDisplay();
        }
    });

    megaClickerButton.addEventListener('click', () => {
        if (clickCount >= 2000) {
            clickCount -= 2000;
            megaClickers++;
            updateDisplay();
        }
    });

    ultraClickerButton.addEventListener('click', () => {
        if (clickCount >= 5000) {
            clickCount -= 5000;
            ultraClickers++;
            updateDisplay();
        }
    });

    saveButton.addEventListener('click', () => {
        saveGame();
    });

    loadButton.addEventListener('click', () => {
        loadInput.click();
    });

    loadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            loadGame(file);
        }
    });

    const autoClick = () => {
        clickCount += autoClickers;
        clickCount += superClickers * 5;
        clickCount += megaClickers * 20;
        clickCount += ultraClickers * 100;
        updateDisplay();
    };

    setInterval(autoClick, 1000); // Automatically clicks every second
    updateDisplay();
});
