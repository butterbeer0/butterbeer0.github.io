document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let autoClickers = 0;
    let superClickers = 0;
    let megaClickers = 0;
    let ultraClickers = 0;
    const encryptionKey = 'your-encryption-key'; // Replace with a strong key

    // Initial costs
    let autoClickerCost = 100;
    let superClickerCost = 500;
    let megaClickerCost = 2000;
    let ultraClickerCost = 5000;
    const priceIncreasePercentage = 0.05; // 5% increase

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
        clickCountElement.textContent = `${clickCount} Cookies`;
        autoClickerButton.disabled = clickCount < autoClickerCost;
        superClickerButton.disabled = clickCount < superClickerCost;
        megaClickerButton.disabled = clickCount < megaClickerCost;
        ultraClickerButton.disabled = clickCount < ultraClickerCost;

        autoClickerCPS.textContent = `+${autoClickers} CPS`;
        superClickerCPS.textContent = `+${superClickers * 5} CPS`;
        megaClickerCPS.textContent = `+${megaClickers * 20} CPS`;
        ultraClickerCPS.textContent = `+${ultraClickers * 100} CPS`;

        // Update button text with current cost
        autoClickerButton.textContent = `Auto-Clicker (Cost: ${autoClickerCost} cookies) \n${autoClickerCPS.textContent}`;
        superClickerButton.textContent = `Super-Clicker (Cost: ${superClickerCost} cookies) \n${superClickerCPS.textContent}`;
        megaClickerButton.textContent = `Mega-Clicker (Cost: ${megaClickerCost} cookies) \n${megaClickerCPS.textContent}`;
        ultraClickerButton.textContent = `Ultra-Clicker (Cost: ${ultraClickerCost} cookies) \n${ultraClickerCPS.textContent}`;
    };

    const saveGame = () => {
        const gameData = JSON.stringify({
            clickCount,
            autoClickers,
            superClickers,
            megaClickers,
            ultraClickers,
            autoClickerCost,
            superClickerCost,
            megaClickerCost,
            ultraClickerCost
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
                autoClickerCost = gameData.autoClickerCost || 100;
                superClickerCost = gameData.superClickerCost || 500;
                megaClickerCost = gameData.megaClickerCost || 2000;
                ultraClickerCost = gameData.ultraClickerCost || 5000;
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
        if (clickCount >= autoClickerCost) {
            clickCount -= autoClickerCost;
            autoClickers++;
            autoClickerCost = Math.ceil(autoClickerCost * (1 + priceIncreasePercentage)); // Increase price
            updateDisplay();
        }
    });

    superClickerButton.addEventListener('click', () => {
        if (clickCount >= superClickerCost) {
            clickCount -= superClickerCost;
            superClickers++;
            superClickerCost = Math.ceil(superClickerCost * (1 + priceIncreasePercentage)); // Increase price
            updateDisplay();
        }
    });

    megaClickerButton.addEventListener('click', () => {
        if (clickCount >= megaClickerCost) {
            clickCount -= megaClickerCost;
            megaClickers++;
            megaClickerCost = Math.ceil(megaClickerCost * (1 + priceIncreasePercentage)); // Increase price
            updateDisplay();
        }
    });

    ultraClickerButton.addEventListener('click', () => {
        if (clickCount >= ultraClickerCost) {
            clickCount -= ultraClickerCost;
            ultraClickers++;
            ultraClickerCost = Math.ceil(ultraClickerCost * (1 + priceIncreasePercentage)); // Increase price
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
