import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Load form state from local storage
const savedState = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Fill form fields with saved state
emailInput.value = savedState.email || '';
messageInput.value = savedState.message || '';

// Track input event on the form and save field values to local storage
const saveFormState = throttle(() => {
    const state = {
        email: emailInput.value,
        message: messageInput.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500);

form.addEventListener('input', saveFormState);

// Submit event handler
form.addEventListener('submit', event => {
    event.preventDefault();

    // Clear local storage and form fields
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';

    // Display form state in console
    console.log('Form state:', {
        email: savedState.email || '',
        message: savedState.message || ''
    });
});

