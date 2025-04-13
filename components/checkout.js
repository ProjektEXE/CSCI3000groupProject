window.addEventListener("DOMContentLoaded", () => {
    // Populate trip summary from sessionStorage
    const firstName = sessionStorage.getItem("firstName") || "";
    const lastName = sessionStorage.getItem("lastName") || "";
    const email = sessionStorage.getItem("email") || "";
    const phone = sessionStorage.getItem("phone") || "";
    const passengers = sessionStorage.getItem("passengers") || "0";
    const destination = sessionStorage.getItem("destination") || "";
    const departure = sessionStorage.getItem("departure") || "";

    document.getElementById("summaryFirstName").textContent = firstName;
    document.getElementById("summaryLastName").textContent = lastName;
    document.getElementById("summaryEmail").textContent = email;
    document.getElementById("summaryPhone").textContent = phone || "Not Provided";
    document.getElementById("summaryPassengers").textContent = passengers;
    document.getElementById("summaryDestination").textContent = destination;
    document.getElementById("summaryDate").textContent = departure;

    const totalCost = parseInt(passengers) * 5000;
    document.getElementById("summaryCost").textContent = `$${totalCost.toLocaleString()}`;

    // Set up field validation
    const checkoutForm = document.getElementById("checkoutForm");

    function showError(input, message) {
        const error = input.parentElement.querySelector(".error-message");
        input.classList.add("invalid-input");
        error.textContent = message;
    }

    function clearError(input) {
        const error = input.parentElement.querySelector(".error-message");
        input.classList.remove("invalid-input");
        error.textContent = "";
    }

    function validateTextField(input, label) {
        const pattern = /^[A-Za-z\s'-]+$/;
        clearError(input);
        if (!pattern.test(input.value.trim())) {
            showError(input, `${label} must contain only letters.`);
            return false;
        }
        return true;
    }

    document.getElementById("zip").addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "").substring(0, 5);
    });

    function validateZip(input) {
        clearError(input);
        if (!/^\d{1,5}$/.test(input.value.trim())) {
            showError(input, "ZIP code must be a number up to 5 digits.");
            return false;
        }
        return true;
    }

    function validateCardNumber(input) {
        clearError(input);
        const digits = input.value.replace(/\D/g, "");
        if (!/^\d{16}$/.test(digits)) {
            showError(input, "Card number must be 16 digits.");
            return false;
        }
        return true;
    }

    function validateExpiration(input) {
        clearError(input);
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(input.value)) {
            showError(input, "Use MM/YY format.");
            return false;
        }
        return true;
    }

    document.getElementById("cvv").addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "").substring(0, 4);
    });
    
    function validateCVV(input) {
        clearError(input);
        if (!/^\d{3,4}$/.test(input.value)) {
            showError(input, "CVV must be 3 or 4 digits.");
            return false;
        }
        return true;
    }

    // Format card input
    const cardNumberInput = document.getElementById("cardNumber");
    cardNumberInput.addEventListener("input", () => {
        let digits = cardNumberInput.value.replace(/\D/g, "").substring(0, 16);
        cardNumberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
    });

    const expirationInput = document.getElementById("expiration");
    expirationInput.addEventListener("input", () => {
        let value = expirationInput.value.replace(/\D/g, "").substring(0, 4);
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }
        expirationInput.value = value;
    });

    // Form submission
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const country = document.getElementById("country");
        const street = document.getElementById("street");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const zip = document.getElementById("zip");
        const cardName = document.getElementById("cardName");
        const cardNumber = document.getElementById("cardNumber");
        const expiration = document.getElementById("expiration");
        const cvv = document.getElementById("cvv");

        let isValid = true;
        isValid &= validateTextField(country, "Country");
        isValid &= validateTextField(city, "City");
        isValid &= validateTextField(state, "State/Province");
        isValid &= validateTextField(cardName, "Cardholder name");
        isValid &= validateZip(zip);
        isValid &= validateCardNumber(cardNumber);
        isValid &= validateExpiration(expiration);
        isValid &= validateCVV(cvv);

        if (isValid) {
            const email = encodeURIComponent(sessionStorage.getItem("email"));
            window.location.href = `confirmation.html?email=${email}`;
        }
    });
});
