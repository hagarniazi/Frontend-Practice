// SmartTask - Contact Page


const contactForm =
    document.querySelector("#contact-form");


const nameInput =
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const subjectInput =
    document.querySelector("#subject");

const messageInput =
    document.querySelector("#message");


const nameError =
    document.querySelector("#name-error");

const emailError =
    document.querySelector("#email-error");

const subjectError =
    document.querySelector("#subject-error");

const messageError =
    document.querySelector("#message-error");


const successMessage =
    document.querySelector("#form-success");


// Clear errors

function clearErrors() {

    nameError.textContent = "";

    emailError.textContent = "";

    subjectError.textContent = "";

    messageError.textContent = "";

    successMessage.textContent = "";


    document
        .querySelectorAll(".form-group")
        .forEach(function (group) {

            group.classList.remove(
                "has-error"
            );

        });

}


// Validate name

function validateName() {

    const name =
        nameInput.value.trim();


    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        nameInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    if (name.length < 2) {

        nameError.textContent =
            "Name must be at least 2 characters.";

        nameInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    return true;

}


// Validate email

function validateEmail() {

    const email =
        emailInput.value.trim();


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        emailInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    return true;

}


// Validate subject

function validateSubject() {

    const subject =
        subjectInput.value.trim();


    if (subject === "") {

        subjectError.textContent =
            "Please enter a subject.";

        subjectInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    return true;

}


// Validate message

function validateMessage() {

    const message =
        messageInput.value.trim();


    if (message === "") {

        messageError.textContent =
            "Please enter your message.";

        messageInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    if (message.length < 10) {

        messageError.textContent =
            "Message must be at least 10 characters.";

        messageInput
            .closest(".form-group")
            .classList.add("has-error");

        return false;

    }


    return true;

}


// Form submit

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        clearErrors();


        const isNameValid =
            validateName();

        const isEmailValid =
            validateEmail();

        const isSubjectValid =
            validateSubject();

        const isMessageValid =
            validateMessage();


        const isFormValid =
            isNameValid &&
            isEmailValid &&
            isSubjectValid &&
            isMessageValid;


        if (!isFormValid) {

            return;

        }


        successMessage.textContent =
            "Your message has been sent successfully! 🎉";


        contactForm.reset();

    }
);