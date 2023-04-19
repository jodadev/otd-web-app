const mobileScreen = 767;

const errorContainer = document.querySelector('#errorContainer');
const errorText = document.querySelector('#errorText');

/**
 * Process bout Cipher and Decipher from requests.
 * @param {Event}e Event.
 * @param {string}url End point for form request.
 * @param {Object}contents Object containing user input from form.
 * @param {Element}responseContainer Container element for response.
 */
const request_otp = (e, url, contents, responseContainer ) => {
    // clear any previous errors
    ClearErrorMessage();
    e.preventDefault();

    for(let obj in contents){
        if (!IsValidInput(contents[obj], "Please fill out all input fields.")) {
            errorContainer.scrollIntoView();
            return;
        } 
    }

    (async () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contents)
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                DisplayError(data.error);
                errorContainer.scrollIntoView();
                return;
            }

            responseContainer.removeAttribute('hidden');
            responseContainer.querySelector('.response-text').innerHTML = data.text;

            // Assign key string to key element if data exists
            if (data.key !== undefined) responseContainer.querySelector('.response-key').innerHTML = data.key;

            responseContainer.scrollIntoView();
            // Update fill button animation depending on url
            update_auto_fill_animation_state(url === '/cipher');

        })
        .catch(err => console.log(err));
      })();  
}


// EVENT LISTENERS
document.querySelector('#cipher-submission').addEventListener('click', (e) => {

    const contents = {
        text: e.target.parentNode.querySelector('[name="text"]').value
    }
    
    let responseContainer = window.innerWidth <= mobileScreen ? document.querySelector('#cipher-response-container-mobile') : document.querySelector('#cipher-response-container');

    request_otp(e,'/cipher', contents, responseContainer)
}); 
document.querySelector('#decipher-submission').addEventListener('click', (e) => {
    
    const contents = {
        text: e.target.parentNode.querySelector('[name="text"]').value,
        key: e.target.parentNode.querySelector('[name="key"]').value
    }

    let responseContainer = window.innerWidth <= mobileScreen ? document.querySelector('#decipher-response-container-mobile') : document.querySelector('#decipher-response-container');

    request_otp(e, '/decipher', contents, responseContainer);
}); 
document.querySelector('#auto-fill-btn').addEventListener('click', (e) => fill_decipher_field());



// Helper Functions +
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
const IsValidInput = (input, errorMessage) => {
    if(input.length === 0 ){
        DisplayError(errorMessage);
        return false;
    }
    return true;
}
/**
 * Adds/Removes animated-btn class based on argument.
 * @param {boolean}isActive Whether animation should be active or not.
 */
const update_auto_fill_animation_state = (isActive) =>{
    let fillBtn = document.querySelector('#auto-fill-btn');
    isActive ? fillBtn.classList.add('animated-btn') : fillBtn.classList.remove('animated-btn');
}
/**
 * Populates the Decipher Input Text Fields with the values of the Cipher Text and Key.
 * Only works if Cipher information is available.
 */
const fill_decipher_field = () => {
    // Get the correct cipher response container element by checking screen size
    let cipherContainer =  window.innerWidth <= mobileScreen ? document.querySelector('#cipher-response-container-mobile') : document.querySelector('#cipher-response-container');

    if(!cipherContainer.getAttribute('hidden')) {
        // Update value and html for text field elements
        document.querySelector('#decipher-text-input').value = cipherContainer.querySelector('#cipheredText').innerHTML;
        document.querySelector('#decipher-text-input').innerHTML = cipherContainer.querySelector('#cipheredText').innerHTML;
        document.querySelector('#decipher-key-input').value = cipherContainer.querySelector('#cipheredKey').innerHTML;
        document.querySelector('#decipher-key-input').innerHTML = cipherContainer.querySelector('#cipheredKey').innerHTML;
        // Stop auto fill button animation
        update_auto_fill_animation_state(isActive=false);
    }
}