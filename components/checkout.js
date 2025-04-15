window.addEventListener("DOMContentLoaded", () => {
  // Trip summary population
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

  const checkoutForm = document.getElementById("checkoutForm");

  // Error helpers
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

  // Custom field validators
  function validateText(input, label) {
    const pattern = /^[A-Za-z\s'-]+$/;
    clearError(input);
    if (!input.value.trim()) {
      showError(input, `${label} is required.`);
      return false;
    }
    if (!pattern.test(input.value.trim())) {
      showError(input, `${label} must contain only letters.`);
      return false;
    }
    return true;
  }

  function validateStreet(input) {
    clearError(input);
    const pattern = /^[\w\s.,'#-]+$/;
    if (!input.value.trim()) {
      showError(input, "Street address is required.");
      return false;
    }
    if (!pattern.test(input.value.trim())) {
      showError(input, "Street address contains invalid characters.");
      return false;
    }
    return true;
  }

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
    const value = input.value.trim();
  
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      showError(input, "Use MM/YY format.");
      return false;
    }
  
    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);
  
    const expirationDate = new Date(year, month, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (expirationDate < today) {
      showError(input, "Card is expired.");
      return false;
    }
  
    return true;
  }
  

  function validateCVV(input) {
    clearError(input);
    if (!/^\d{3,4}$/.test(input.value)) {
      showError(input, "CVV must be 3 or 4 digits.");
      return false;
    }
    return true;
  }

  // Format inputs
  document.getElementById("zip").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substring(0, 5);
  });

  document.getElementById("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substring(0, 4);
  });

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
    const waiver = document.getElementById("waiverCheckbox");
    const waiverError = document.getElementById("waiverError");

    let isValid = true;

    if (!validateText(country, "Country")) isValid = false;
    if (!validateStreet(street)) isValid = false;
    if (!validateText(city, "City")) isValid = false;
    if (!validateText(state, "State/Province")) isValid = false;
    if (!validateText(cardName, "Cardholder name")) isValid = false;
    if (!validateZip(zip)) isValid = false;
    if (!validateCardNumber(cardNumber)) isValid = false;
    if (!validateExpiration(expiration)) isValid = false;
    if (!validateCVV(cvv)) isValid = false;

    waiver.classList.remove("invalid-input");
    waiverError.textContent = "";

    if (!waiver.checked) {
      waiver.classList.add("invalid-input");
      waiverError.textContent = "You must agree to the waiver before proceeding.";
      isValid = false;
    }

    if (isValid) {
      const confirmedFirstName = document.getElementById("summaryFirstName").textContent.trim();
      const confirmedLastName = document.getElementById("summaryLastName").textContent.trim();
      const confirmedEmail = document.getElementById("summaryEmail").textContent.trim();
      const confirmedPhone = document.getElementById("summaryPhone").textContent.trim();
      const confirmedPassengers = document.getElementById("summaryPassengers").textContent.trim();
      const confirmedDestination = document.getElementById("summaryDestination").textContent.trim();
      const confirmedDeparture = document.getElementById("summaryDate").textContent.trim();

      sessionStorage.setItem("confirmedFirstName", confirmedFirstName);
      sessionStorage.setItem("confirmedLastName", confirmedLastName);
      sessionStorage.setItem("confirmedEmail", confirmedEmail);
      sessionStorage.setItem("confirmedPhone", confirmedPhone);
      sessionStorage.setItem("confirmedPassengers", confirmedPassengers);
      sessionStorage.setItem("confirmedDestination", confirmedDestination);
      sessionStorage.setItem("confirmedDeparture", confirmedDeparture);

      const encodedEmail = encodeURIComponent(confirmedEmail);
      window.location.href = `confirmation.html?email=${encodedEmail}`;
    }
  });
});
