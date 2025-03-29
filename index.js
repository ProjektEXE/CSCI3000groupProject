document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.image-slider');

    const firstSlideClone = slides[0].cloneNode(true);
    slider.appendChild(firstSlideClone);

    let currentIndex = 0;
    function showNextSlide() {
        currentIndex++;
        const offset = -currentIndex * 100; 
        slider.style.transform = `translateX(${offset}vw)`;
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0vw)';
                currentIndex = 0;
            }, 1500); 
        } else {
            slider.style.transition = 'transform 1.5s ease-in-out';
        }
    }

    setInterval(showNextSlide, 3000);
});

const destinations = [
    "cybertron.html",
    "pandora.html",
    "arrakis.html",
    "arda.html",
    "gallifrey.html",
    "coruscant.html",
    "haloRing.html"
];

function goToRandomDestination() {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    window.location.href = destinations[randomIndex];
}

document.addEventListener("DOMContentLoaded", function() {
    var randomButton = document.querySelector(".randomButton");

    if (randomButton) {
        randomButton.addEventListener("click", goToRandomDestination);
    }
});
