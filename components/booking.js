// Wait until the DOM is fully loaded
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
  
    // Booking form validation + redirect
    const bookingForm = document.getElementById("bookingForm");
    bookingForm.addEventListener("submit", function (event) {
      let isValid = true;
      const requiredFields = ["firstName", "lastName", "email", "passengers", "destination"];
  
      requiredFields.forEach((id) => {
        const input = document.getElementById(id);
        if (
          (input.tagName === "SELECT" && input.value === "") ||
          (input.tagName !== "SELECT" && !input.value.trim())
        ) {
          input.classList.add("invalid-input");
          isValid = false;
        } else {
          input.classList.remove("invalid-input");
        }
      });
  
      // Email format check
      const email = document.getElementById("email");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add("invalid-input");
        isValid = false;
      }
  
      if (!isValid) {
        event.preventDefault(); // Don't submit
      } else {
        // Redirect to confirmation with email param
        event.preventDefault(); // Prevent form submission first
        const emailValue = encodeURIComponent(email.value.trim());
        window.location.href = `confirmation.html?email=${emailValue}`;
      }
    });
  
    // Format card number with spaces every 4 digits
    const cardNumberInput = document.getElementById("cardNumber");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", () => {
        let value = cardNumberInput.value.replace(/\D/g, "").substring(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();
        cardNumberInput.value = value;
      });
    }
  
    // Format expiration as MM/YY
    const expirationInput = document.getElementById("expiration");
    if (expirationInput) {
      expirationInput.addEventListener("input", () => {
        let value = expirationInput.value.replace(/\D/g, "").substring(0, 4);
        if (value.length > 2) {
          value = value.substring(0, 2) + "/" + value.substring(2);
        }
        expirationInput.value = value;
      });
    }
  });
  
