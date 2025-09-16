//Grab DOM elements
const form = document.getElementById("contact-form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

//Regex patterns for validation
const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/*Validate field Function
Function takes the input and the appropriate regex for validation of the input. 
Value of the input is stored and compared to the regex. If match, the valid class is added else invalid.*/
function validateField(input, regex = null) {
    const value = input.value.trim();

    if(!value || (regex && !regex.test(value))) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        input.setAttribute("aria-invalid", "true");
        return false;
    } else {
        input.classList.remove("invalid");
        input.classList.add("valid");
        input.setAttribute("aria-invalid", "false");
        return true;
    }
}

/*Validate Form
Calls the function defined above and stores the result in a variable*/
function isFormValid() {
    return (
        validateField(fname, nameRegex) &&
        validateField(lname, nameRegex) &&
        validateField(email, emailRegex) &&
        validateField(message)
    );
}

//Add an event listener for typing in the fields
[fname, lname, email, message].forEach(input => {
    input.addEventListener("input", (event) => {
        const field = event.target; // get the field currently being typed in

        // Validate only this input dynamically
        if(field === fname || field === lname) {
            validateField(field, nameRegex);
        } else if(field === email) {
            validateField(field, emailRegex);
        } else {
            validateField(field);
        }

        //Enable/disable submit button based on full form validity
        submitBtn.disabled = !isFormValid();
    });
});

//Submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(isFormValid()) {
        alert("Form Submitted Successfully!");
        
        // reset the form fields
        form.reset();
        submitBtn.disabled = true;

        // remove all validation highlights
        [fname, lname, email, message].forEach(input => input.classList.remove("valid", "invalid"));
    }
});

