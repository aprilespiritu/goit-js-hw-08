import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailInput = form.querySelector('label [name="email"]');
const messageInput = form.querySelector('label [name="message"]');

const STORAGE_KEY = 'feedback-form-state';

function onPageReload() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage) {
        emailInput.value = savedMessage.email;
        messageInput.value = savedMessage.message;
    }
}

onPageReload();

function onFormInput() {
    const email = emailInput.value
    const message = messageInput.value;

    const formData = {
        email,
        message,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
    e.preventDefault(); //prevents the page reload when form is submitted
    const email = emailInput.value;
    const message = messageInput.value;

    if (email == "" || message == "") {
        alert('Enter both inputs');
        form.reset();
        return;
    }
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('submit', onFormSubmit);