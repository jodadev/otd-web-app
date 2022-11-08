// Required HTML elements
const decipherContainer = document.getElementById('decipher_Response_Container');
const decipheredText = document.getElementById('decipheredText');
const cipherContainer = document.getElementById('cipher_Response_Container');
const cipheredText = document.getElementById('cipheredText');
const cipheredKey = document.getElementById('cipheredKey');  
const errorContainer = document.getElementById('errorContainer');
const errorText = document.getElementById('errorText');


// Event Handlers
document.getElementById('cipher').addEventListener('click', (e) => {
    ClearErrorMessage();
    e.preventDefault();

    // Get copy and paste text input
    var text = e.target.parentNode.querySelector('[name="text"]').value;

    (async () => {
        fetch('/cipher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                DisplayError(data.error);
                return;
            }
            cipherContainer.hidden = false;
            cipheredText.innerHTML = data.text;
            cipheredKey.innerHTML = data.key;
        })
        .catch(err => console.log(err));
      })();    
}); 
document.getElementById('decipher').addEventListener('click', (e) => {
    ClearErrorMessage();
    
    e.preventDefault();

    var text = e.target.parentNode.querySelector('[name="text"]').value;
    var key = e.target.parentNode.querySelector('[name="key"]').value;
    
    if(!IsValidInput(text, key,"Please fill out all fields to decipher."))
        return;
       
    fetch('/decipher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            key: key
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
            DisplayError(data.error);
            return;
        }
        decipherContainer.hidden = false;
        decipheredText.innerHTML = data.text;
    })
    .catch(err => console.log(err));
}); 


// Helper Functions
/**
    * Clears the error text container when a form is submitted. 
*/
const ClearErrorMessage = () => {
    if(errorContainer.hidden === false)
        errorContainer.hidden = true;
}
/**
 * Displays any errors caught to the user.
 */
const DisplayError = (errorMessage) => {
    errorContainer.hidden = false;
    errorText.innerHTML = errorMessage;
}
/**
    * Returns True or False whether there is input or not. 
    * @param {string} input User generated input field value.
    * @param {string} input2 User generated input field value.
    * @param {string} errorMessage If error, display this message.
*/
const IsValidInput = (input, input2, errorMessage) => {
    if(input.length === 0 || input2.length === 0 ){
        DisplayError(errorMessage);
        return false;
    }
    return true;
}