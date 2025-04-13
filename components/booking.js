window.addEventListener("DOMContentLoaded", () => {

  document.getElementById("departure").min = new Date().toISOString().split("T")[0];

  const storedFields = [
    "firstName", "lastName", "email", "phone",
    "passengers", "destination", "departure"
  ];
  
  storedFields.forEach((field) => {
    const input = document.getElementById(field);
    const value = sessionStorage.getItem(field);
    if (input && value) {
      input.value = value;
    }
  });

  const bookingForm = document.getElementById("bookingForm");

  const phoneInput = document.getElementById("phone");

  // Phone number formatting on input
  phoneInput.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, "").substring(0, 10);
    let formatted = digits;

    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }

    phoneInput.value = formatted;
  });

  function showError(input, message) {
    const errorElement = input.parentElement.querySelector(".error-message");
    input.classList.add("invalid-input");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  function clearError(input) {
    const errorElement = input.parentElement.querySelector(".error-message");
    input.classList.remove("invalid-input");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  window.validateForm = function () {
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const passengers = document.getElementById("passengers");
    const destination = document.getElementById("destination");

    const nameRegex = /^[A-Za-z\s'-]+$/;

    [firstName, lastName].forEach((input) => {
      clearError(input);
      if (!nameRegex.test(input.value.trim())) {
        showError(input, "Only letters, apostrophes, dashes, and spaces allowed.");
        isValid = false;
      }
    });

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    clearError(email);
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Enter a valid email address.");
      isValid = false;
    }

    // Phone (if provided)
    const digits = phoneInput.value.replace(/\D/g, "");
    clearError(phoneInput);
    if (digits.length > 0 && digits.length !== 10) {
      showError(phoneInput, "Phone number must be 10 digits.");
      isValid = false;
    }

    // Passengers
    clearError(passengers);
    if (passengers.value.trim() === "" || Number(passengers.value) < 1) {
      showError(passengers, "Please enter a valid number of passengers.");
      isValid = false;
    }

    // Destination
    clearError(destination);
    if (!destination.value) {
      showError(destination, "Please select a destination.");
      isValid = false;
    }

    // Departure date
    const departure = document.getElementById("departure");
    clearError(departure);
    if (!departure.value) {
      showError(departure, "Please select a departure date.");
      isValid = false;
    } else {
      const selectedDate = new Date(departure.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showError(departure, "Departure date cannot be in the past.");
        isValid = false;
      }
    }

    return isValid;
  };

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      sessionStorage.setItem("firstName", firstName.value.trim());
      sessionStorage.setItem("lastName", lastName.value.trim());
      sessionStorage.setItem("email", email.value.trim());
      sessionStorage.setItem("phone", phoneInput.value.trim());
      sessionStorage.setItem("passengers", passengers.value.trim());
      sessionStorage.setItem("destination", destination.value);
      sessionStorage.setItem("departure", departure.value);

      window.location.href = "checkout.html";                                                                                                                     
    }
  });
});
