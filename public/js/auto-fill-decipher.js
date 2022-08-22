// Required HTML elements
const decipheredTextInput = document.querySelector('.decipherTextInput');
const decipherKeyInput = document.querySelector('.decipherKeyInput');

document.getElementById('autofill').addEventListener('click', (e) => {
    if(cipherContainer.hidden === false) {
        // Update value and html for text field elements
        decipheredTextInput.value = cipheredText.innerHTML;
        decipheredTextInput.innerHTML = cipheredText.innerHTML;
        decipherKeyInput.value = cipheredKey.innerHTML;
        decipherKeyInput.innerHTML = cipheredKey.innerHTML;
    }
})