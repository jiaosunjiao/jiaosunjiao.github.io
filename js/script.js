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
        
        // Hide all slides
        for (let slide of slides) {
            slide.classList.remove('active');
            slide.style.display = "none";
        }
        
        // Show current slide with animation
        slides[slideIndex].style.display = "block";
        setTimeout(() => {
            slides[slideIndex].classList.add('active');
        }, 10);
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
        autoSlideInterval = setInterval(autoSlide, 4000); // Change the image every 4 seconds
    }

    // Initialize slideshow
    showSlides(slideIndex);
    autoSlideInterval = setInterval(autoSlide, 4000);

    // Add click event listeners for navigation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('prev')) {
            plusSlides(-1);
        } else if (e.target.classList.contains('next')) {
            plusSlides(1);
        }
    });

    // Pause auto-slide on hover
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });

        slideshow.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(autoSlide, 4000);
        });
    }

    // Add active class to current nav item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
