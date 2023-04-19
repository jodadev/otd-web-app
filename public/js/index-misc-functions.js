const try_me = () => {
    document.querySelector('#app').removeAttribute('hidden');
    document.querySelector('#app').scrollIntoView();
}

const copy_to_clipboard = (elementId) => {
    // Get the text field
    var copyText = document.querySelector("#"+elementId);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
}