document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    let slideIndex = 0;
    let autoSlideInterval;

    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        if (n >= slides.length) {slideIndex = 0}
        if (n < 0) {slideIndex = slides.length - 1}
        for (let slide of slides) {
            slide.style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }

    function plusSlides(n) {
        slideIndex += n;
        showSlides(slideIndex);
        resetAutoSlide();
    }

    function autoSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 2000); // Change the image every 4 seconds
    }

    showSlides(slideIndex);
    autoSlideInterval = setInterval(autoSlide, 2000); // Change the image every 4 seconds

    document.querySelector('.prev').addEventListener('click', function() {
        plusSlides(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        plusSlides(1);
    });
});
