/**
 * @name HideGiftButton
 * @author razoshi
 * @description Hides gift button in the gift menu
 * @version 1.0.0
 */

module.exports = class HideGiftButton {
    start() {
        this.style = document.createElement('style');
        this.style.id = 'HideGiftButtonStyles';
        this.style.innerHTML = `
            [aria-label="Отправить подарок"], 
            [aria-label="Send a Gift"] {
                display: none !important;
            }
        `;
        document.head.appendChild(this.style);
    }

    stop() {
        const styleElement = document.getElementById('HideGiftButtonStyles');
        if (styleElement) styleElement.remove();
    }
}