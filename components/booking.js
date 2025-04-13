window.addEventListener("DOMContentLoaded", () => {
  // Set destination if found in URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const destinationParam = getQueryParam("destination");
  const selectElement = document.getElementById("destination");
  if (destinationParam && selectElement) {
    for (let option of selectElement.options) {
      if (option.value.toLowerCase() === destinationParam.toLowerCase()) {
        option.selected = true;
        break;
      }
    }
  }

  // Show error message under a field
  function showError(input, message) {
    input.classList.add("invalid-input");
    const errorEl = input.closest(".form-group")?.querySelector(".error-message");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
  }

  // Clear error message
  function clearError(input) {
    input.classList.remove("invalid-input");
    const errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
  }

  // Add formatting to card number and expiration
  const cardNumberInput = document.getElementById("cardNumber");
  cardNumberInput.addEventListener("input", () => {
    let value = cardNumberInput.value.replace(/\D/g, "").substring(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    cardNumberInput.value = value;
  });

  const expirationInput = document.getElementById("expiration");
  expirationInput.addEventListener("input", () => {
    let value = expirationInput.value.replace(/\D/g, "").substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    expirationInput.value = value;
  });

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", () => {
    let value = phoneInput.value.replace(/\D/g, "").substring(0, 10);
    if (value.length > 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    phoneInput.value = value;
  });

  const zipInput = document.getElementById("zip");
  zipInput.addEventListener("input", () => {
    zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5); // digits only, max 5
  });

  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    function validateText(id, name) {
      const input = document.getElementById(id);
      const pattern = /^[A-Za-z\s'-]+$/; // now allows spaces
      clearError(input);
      if (!pattern.test(input.value.trim())) {
        showError(input, `${name} can only contain letters, spaces, apostrophes, and dashes.`);
        isValid = false;
      }
    }

    function validateEmail(id) {
      const input = document.getElementById(id);
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      clearError(input);
      if (!pattern.test(input.value.trim())) {
        showError(input, `Enter a valid email address.`);
        isValid = false;
      }
    }

    function validatePhone(id) {
      const input = document.getElementById(id);
      clearError(input);
      const digits = input.value.replace(/\D/g, "");
      if (digits.length > 0 && digits.length !== 10) {
        showError(input, "Phone number must be 10 digits.");
        isValid = false;
      }
    }

    function validateLettersOnly(id, label) {
      const input = document.getElementById(id);
      const pattern = /^[A-Za-z\s]+$/;
      clearError(input);
      if (!pattern.test(input.value.trim())) {
        showError(input, `${label} must contain only letters.`);
        isValid = false;
      }
    }

    function validateZip(id) {
      const input = document.getElementById(id);
      const pattern = /^\d{1,5}$/;
      clearError(input);
      if (!pattern.test(input.value.trim())) {
        showError(input, "ZIP code must be a number up to 5 digits.");
        isValid = false;
      }
    }

    function validateCardNumber(id) {
      const input = document.getElementById(id);
      clearError(input);
      const digits = input.value.replace(/\D/g, "");
      if (!/^\d{16}$/.test(digits)) {
        showError(input, "Card number must be 16 digits.");
        isValid = false;
      }
    }

    function validateExpiration(id) {
      const input = document.getElementById(id);
      clearError(input);
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(input.value)) {
        showError(input, "Use MM/YY format.");
        isValid = false;
      }
    }

    function validateCVV(id) {
      const input = document.getElementById(id);
      clearError(input);
      if (!/^\d{3,4}$/.test(input.value)) {
        showError(input, "CVV must be 3 or 4 digits.");
        isValid = false;
      }
    }

    validateText("firstName", "First name");
    validateText("lastName", "Last name");
    validateEmail("email");
    validatePhone("phone");
    validateLettersOnly("country", "Country");
    validateLettersOnly("city", "City");
    validateLettersOnly("state", "State/Province");
    validateZip("zip");
    validateText("cardName", "Cardholder name");
    validateCardNumber("cardNumber");
    validateExpiration("expiration");
    validateCVV("cvv");

    const destination = document.getElementById("destination");
    clearError(destination);
    if (!destination.value) {
      showError(destination, "Please select a destination.");
      isValid = false;
    }

    if (isValid) {
      const emailValue = encodeURIComponent(document.getElementById("email").value.trim());
      window.location.href = `confirmation.html?email=${emailValue}`;
    }
  });
});
